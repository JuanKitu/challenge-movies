/* eslint-disable max-classes-per-file */
import { BaseError } from '../baseError.core';

export class NoPathExistError extends BaseError {
  constructor(public originalName: string = '', public stackTrace: string = '') {
    super(100, 'NoPathExistError', 'path Not Found', 'The requested resource was not found or does not exist.', originalName, stackTrace);
  }
}

export class NoFileExistError extends BaseError {
  constructor(public originalName: string = '', public stackTrace: string = '') {
    super(100, 'NoFileExistError', 'File Not Found', 'The requested resource was not found or does not exist.', originalName, stackTrace);
  }
}
