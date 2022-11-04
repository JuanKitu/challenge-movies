# Challenge Movies - Backend NodeJS + Typescript
[![Deployment Pipeline](https://github.com/JuanKitu/challenge-movies/actions/workflows/pipeline.yml/badge.svg)](https://github.com/JuanKitu/challenge-movies/actions/workflows/pipeline.yml)
_This is the small documentation to make the API-REST work_

## Starting 🚀

_These instructions will allow you to obtain a local copy of the project for development and testing._

### Pre-requirements 📋

_First we need to install nodeJS 16.15.0:_

* [nodeJS v16.15.0 x64 win (Recommend)](https://nodejs.org/download/release/v16.15.0/node-v16.15.0-x64.msi)
* [nodeJS v16.15.0 x86 win (Recommend)](https://nodejs.org/download/release/v16.15.0/node-v16.15.0-x86.msi)
_Once the program is installed, access the console to install typeScript with the following command:Once the program is installed, access the console to install typeScript with the following command:_

```
npm install -g typescript
```

### installation 🔧

_The installation of the server is very simple, you just have to install the nodeJS libraries with the following command:_

```
npm install
```

_the command below is for installing development dependencies such as nodemon and types. Not needed for testing or
distribution use_

```
npm install -D
```

_Once the libraries are installed, the
following [.env](https://drive.google.com/file/d/1UEsaQKt3v3WBWw9Xx7pJHQmI7i80T2gx/view?usp=share_link) file must be
downloaded to access the basic configuration of the server, this file must be added in the following path:_

```
/config
```

## Running the project ⚡

_To start the project, only the following command is necessary, with this we also make a typescript compilation:_

```
npm start
```

_If you want to run the program with nodemon and without having to compile, well, ts-node is used, you should use the
following command:_

```
npm run dev
```

## Running the unit tests ⚙️

_To run the tests on the project you just have to use the following command:_

```
npm run test
```

## Functionality 📦

_These are the following developed endpoints:_

* Endpoints for authentication using JWT.<br/>
  Include an endpoint for refreshing the JWT access token.
* Endpoint for retrieving movies.<br/>
  It should be allowed to filter and sort by some field.
* Endpoint for retrieving the information (director included) of a specific episode of a TV Show
* Endpoint for adding a new object (it could be for any entity you like).

_The paths for each of these endpoints can be seen in the swagger documentation once the server has been run at the
following address:_

```
http://localhost:3000/docs
```

## Authors ✒️

* **Juan Manuel Santa Cruz** - [JuanKitu](https://gitlab.com/JuanKitu)
