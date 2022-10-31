import fs from 'fs';
import path from 'path';
import ITreeFile from '../interfaces/ITreeFile';
import IModulePath from '../interfaces/IModulePath';
import { NoFileExistError, NoPathExistError } from './classes/error.core';

interface IPPropose {
  [key: string]: string;
}

export const pathToTreeFile = (_path: string, pathRoot: string = ''): ITreeFile => {
  const directoryPath: string = path.join(__dirname, `${pathRoot}${_path}`);
  const dir: string[] = fs.readdirSync(directoryPath).filter((e) => !/\.map$/.exec(e));

  const files: string[] = dir.filter((file) => file.includes('.') && !file.includes('.gitkeep'));
  const folders: string[] = dir.filter((folder) => !folder.includes('.'));

  const foldersObject: ITreeFile[] = folders.map((e) => pathToTreeFile(e, `${pathRoot}${_path}/`));

  // check if some dynamic files with same method
  const dynamicFiles: string[] = files.filter((e) => e.includes('[')).map((e) => e.replace(/\[.*]\./, '').replace(/\.(js|ts)/, ''));

  if (dynamicFiles.length !== new Set(dynamicFiles).size) {
    throw new Error(directoryPath);
  }

  // check if some dynamic folders
  if (foldersObject.filter((e) => e.isParam).length > 1) {
    throw new Error(directoryPath);
  }

  return {
    name: _path,
    isParam: _path.includes('['),
    files,
    folders: foldersObject,
  };
};

export const getModuleByUrl = (url: string, tree: ITreeFile): IModulePath => {
  // check if subfolder
  if (url.includes('/')) {
    // parse url
    const { pathname = '', nextPath = '' } = /^(?<pathname>(?:\w+|[-_])*)\/(?<nextPath>.*)$/.exec(url)?.groups || {};

    // check if exist static folder
    const staticFolder: ITreeFile | undefined = tree.folders.find((folder) => folder.name === pathname);
    if (staticFolder) {
      const res = getModuleByUrl(nextPath, staticFolder);
      return {
        pathname: `${staticFolder.name}/${res.pathname}`,
        params: res.params,
      };
    }

    const dynamicFolder: ITreeFile | undefined = tree.folders.find((folder) => folder.isParam);
    if (dynamicFolder) {
      const res: IModulePath = getModuleByUrl(nextPath, dynamicFolder);

      const params: IPPropose = {};
      const keyParam: string = /^\[(?<nameparam>.*)]$/.exec(dynamicFolder.name)?.groups?.nameparam ?? '';
      params[keyParam] = /^(?<nameparam>\w+)\/.*$/.exec(url)?.groups?.nameparam ?? '';

      return {
        pathname: `${dynamicFolder.name}/${res.pathname}`,
        params: { ...res.params, ...params },
      };
    }

    // no folder exist
    throw new NoPathExistError('no path exist');
  }

  // check if static file exist
  const staticFile: boolean = tree.files.map((e) => e.replace(/(js|ts)$/, '')).includes(url.replace(/(js|ts)$/, ''));
  if (staticFile) {
    return {
      pathname: url,
      params: {},
    };
  }

  // check and get dynamic file
  const paramFiles: string[] = tree.files.filter((file) => /^\[(?<nameparam>.*)\]+\.(?<method>(\w+))\.(js|ts)$/.exec(file));
  if (!paramFiles.length) {
    throw new NoFileExistError(`no file exist: ${url}`);
  }
  // get method
  const method = /^.*\.(?<method>\w+)\./.exec(url)?.groups?.method || 'get';
  // check if is same method paramFile
  const paramFile: string = paramFiles.find((file: string) => file.includes(`.${method}.`)) || '';
  if (!paramFile) {
    throw new NoFileExistError(`no file exist: ${url}`);
  }

  const params: IPPropose = {};
  const keyParam: string = /^\[(?<nameparam>.*)]\.\w+\.(js|ts)$/.exec(paramFile)?.groups?.nameparam ?? '';
  params[keyParam] = /^(?<nameparam>(?:\w+|[-_])*)\.\w+\.(js|ts)$/.exec(url)?.groups?.nameparam ?? '';

  return {
    pathname: paramFile,
    params,
  };
};
