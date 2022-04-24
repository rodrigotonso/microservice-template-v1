# Index

- [Index](#index)
- [Microservice Template](#microservice-template)
- [Tools](#tools)
  - [Typescript](#typescript)
  - [Eslint](#eslint)
  - [Prettier](#prettier)
  - [Jest](#jest)
  - [Docker](#docker)
  - [pm2](#pm2)
  - [Husky](#husky)
  - [Swagger and TypeDoc](#swagger-and-typedoc)
- [Folder structure and usage](#folder-structure-and-usage)
  - [Root Directories](#root-directories)
  - [Root Files](#root-files)
  - [Files in /src](#files-in-src)
  - [Directories in /src](#directories-in-src)
- [Guide](#guide)
  - [Starting](#starting)
  - [Application configuration and environment](#application-configuration-and-environment)
  - [Types](#types)
  - [Errors](#errors)
  - [Internationalization](#internationalization)
  - [Model](#model)
    - [Guide:](#guide-1)
    - [Error handling:](#error-handling)
  - [Controller](#controller)
  - [API](#api)
  - [Services (how to use this and others with this template)](#services-how-to-use-this-and-others-with-this-template)
  - [Testing](#testing)
    - [Unit testing](#unit-testing)
    - [Integration testing](#integration-testing)
      - [Model](#model-1)
      - [Other layers](#other-layers)
      - [Testing the API layer](#testing-the-api-layer)
      - [Testing with third party services or other microservices](#testing-with-third-party-services-or-other-microservices)
  - [Documentation](#documentation)
    - [Testing documentation](#testing-documentation)
    - [Code documentation with TypeDoc](#code-documentation-with-typedoc)
    - [Swagger](#swagger)
    - [Data models](#data-models)
    - [Sequence Models, Use Cases, Components and others](#sequence-models-use-cases-components-and-others)
  - [Developing the service](#developing-the-service)
  - [Authentication, authorization and permissions](#authentication-authorization-and-permissions)
    - [API KEY](#api-key)
    - [JWT](#jwt)
      - [JWT permissions and roles](#jwt-permissions-and-roles)
    - [Some recommendations](#some-recommendations)
  - [Security](#security)
- [Scripts](#scripts)
- [License](#license)

# Microservice Template

This is the template for an internal microservice written in typescript. It's aimed to only be used by other microservices, being always behind an API gateway, reverse proxy, etc.

In the /src-sample dir you will find a complete example on how this system could work, with methods related with sequelize and mongoose.
Even though you can use /src and /test from the scratch, it would be nice take a look frequently to src-sample and tests-sample. These dirs contains some functional samples on how to use the package.

# Tools

If you are using the Visual Studio Code as your code editor (recommended, you can get it [here](https://code.visualstudio.com/)). You should install and use the associated plugins.

## Typescript

As a Javascript superset. All the files should be written in TypeScript in order to make the code cleaner and easier to migrate to Deno in the future.
Its configuration is set in the .tsconfig file. You can read how to configure it [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Read the docs: [Typescript Docs](https://www.typescriptlang.org/).

## Eslint

For code styling. It ensures you are using the best practices and all the developers are following the same guides. The configuration is set in the .eslintrc file. You can read how to configure it [here](https://eslint.org/docs/user-guide/configuring).

We use the AirBnb style guide for coding: [Guide docs](https://github.com/airbnb/javascript).

Read the docs: [Eslint docs](https://eslint.org/).

VSCode plugin: [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Prettier

It's an opinionated code formatter used for making the code prettier. Also, this way all the developers will be following the same style guides. It's configured in the .prettierrc file. You can read how to configure it [here](https://prettier.io/docs/en/configuration.html).

It's recommended to set "formatOnSave" to True in your Code Editor to make this step easier.

Read the docs: [Prettier docs](https://prettier.io/).

VSCode plugin: [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## Jest

For unit testing it uses Jest. It will look for all the files which their names finishes with ".test.ts" in the "/tests" dir and execute them. Jest it's a very powerful tool for testing. Its configuration is set in the jestconfig.json file. You can read how to configure it [here](https://jestjs.io/docs/en/configuration).

Read the docs: [Jest docs](https://jestjs.io/).

## Docker

This template aims to be executed in a container environment like Docker. That's why you can see a dockerfile. You can see how to configure it here: [dockerfile docs](https://docs.docker.com/engine/reference/builder/).

Read the docs: [Docker docs](https://docs.docker.com/).

## pm2

If you don't run in docker, the best approach is to run the application with a process manager (it will restart your application if it fails, start at system boot, run them in background, etc.). We use pm2 for this purpose.

**Note**: If you are going to use pm2, remember to configure how many instances you will want running!

Read the docs: [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/).

## Husky

It uses husky to add a hook to git, so it runs eslint and prettier before commiting every time.

## Swagger and TypeDoc

If you use Open API 3.0, Swagger allows you to document an API in a very interesting way.
Also, we use TypeDoc for docummenting typescript code.
Read the docs: [Swagger](https://swagger.io/docs/specification/about/) and [TypeDoc](http://typedoc.org).

# Folder structure and usage

## Root Directories

- **build**: Has the compiled code and it's prepared to work. It contains the files that will be published in npmjs when you use "npm publish". This directory is removed and remade everytime you run "npm run build", so never put something that cannot be erased there.
- **docs**: Contains the different docs (for the API, the code and the testings).
- **node_modules**: It's the standard node_modules folder for node JS.
- **package_utils**: It contains some scripts we need at package config.
- **persisted**: It contains the different files that the service needs to persist. For example, this directory could be a Docker volume.
- **src**: It contains the source of the package. It's the code to be compiled when you run "npm run build".
- **tests**: Contains all the different files what will be tested when you use "npm run test". Jest will look for all the files finishing with ".test.ts".

## Root Files

- **.env** and **.env-sample**: Contains the different environment variables to be loaded with dotenv. .env-sample it's just a way to show how env should look like. **NEVER** upload the .env file to anywhere.
- **.eslintrc.json**: Contains all the configuration for [eslintrc]((https://eslint.org/docs/user-guide/configuring).
- **.gitignore**: Contains all the files and directories that won't be upstreamed to git. How to configure: [gitignore](https://git-scm.com/docs/gitignore).
- **.npmrc**: Contains how npm wil work. How to configure: [npmrc](https://docs.npmjs.com/configuring-npm/npmrc.html).
- **.pretierrc**: Contains prettier configuration. How to configure: [prettierrc](https://prettier.io/docs/en/configuration.html)
- **CHANGELOG.md, LICENSE and README.md**: Standard files that have information about how to use the package (this file), the changes in each release and the license.
- **dockerfile**: It contains how to load this app in a docker environment. How to configure: [dockerfile docs](https://docs.docker.com/engine/reference/builder/).
- **jestconfig.json**: Contains Jest configuration. How to configure: [jestconfig](https://jestjs.io/docs/en/configuration).
- **jesthtmlreporter.json**: Contains the configuration for the testings output files.
- **package.json**: Node Package configuration. How to configure: [npm](https://docs.npmjs.com/creating-a-package-json-file).
- **pm2.config.json**: It contains the instructions to start with pm2 loading the environment variables. How to configure: [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/).
- **tsconfig.json**: Contains TypeScript configuration. How to configure: [tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- **typedoc.json**: Contains the typedoc configuration.

## Files in /src

- **index.ts**: The compilation starts in this file. It imports the server and listens to a port. (It's outside the server to allow server.ts to be used in more than one port).
- **server.ts**: File where the services starts, it creates the server and exports it.
- **config.ts**: It controls and loads the different environment variables. It's a facade to have all the consts in the same place. It also erases the different contents, to prevent some dependency exporting them.

## Directories in /src

- **api**: This directory contains the routes layer. It's only the API (it doesn't have a view) and the HTTP security.
- **constants**: Contains all the application constants (configuration that doesn't depend on environment variables).
- **controller**: Contains the bussiness logic layer. It's the part that executes what the app needs and interact with model.
- **errors**: Contains all information related to error: error codes and the CodedError class.
- **internationalizacion** Contains all the things needed to use the app in different languages (and also contains app strings).
- **model**: Contains everything related to the application model layer. If it's related with data models or interaction with a database (like mongoDB or SQL), it should be here.
- **services**: It contains third party services or other microservices. This directory should contain all interactions with other services API.
- **utils**: Contains some utils, like the logger.
- **types**: Contains all complex or reused types across the application.

**Note**:
As this is a service template, it doesn't have a view layer. It will only work as an API.

# Guide

## Starting

To develop the service this template follows many code rules: eslint, prettier, the AirBnb guide, typescript, etc. But this is just for coding. The app design is harder, because we cannot have automated tools and we have to be very thoughtfull as we develop.
Here are the guides we want to follow to build:

- [The Twelve-Factor App](https://12factor.net/): This guide is very useful, as explains some things that are perfect for microservices building and it fits in a docker-compose ecosystem. If something in the app doesn't follow this guide, it's better to change the app design.
- [Microservices best practices](https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/): An nginx published article on how to do microservices based on Netflix architecture.
- [API REST Guide](https://restfulapi.net/resource-naming/): This guide contains how an API REST should work. As this service works as an API REST, it must follow this guide.
- [Security guidelines](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d): This publication has some of the main security practices in Node. There are SO MANY security practices to take into account.
- [OWASP](https://owasp.org/): This site contains a lot of information on security practices. It's updated very often, so it's good to keep an eye on it.

You will find the template has some examples on how it could be used. You can delete the files or modify them to your needs.

## Application configuration and environment

The application starts at /src/index.ts. This script should start the server and expose the app.
The app.ts file should start every service needed and end it gracefully. For example, if you need to connect to a database (vg: connect to mongoose), start some process (vg: cronjobs), set some configuration to a specific files (vg: some service configuration), it should be done here.

So, application starts at:

- **index.ts**: Starts the server and listen to a port.
- **app.ts**: Connects to database, set some main settings, notifies errors, gracefully stops services, etc.
- **config.ts**: Gets the information from the environment and deletes it.
- **constants/**: Contains all the app configuration settings and constants that do not depend on the environment (vg: paths, model names, etc.).

You will see app.ts has this format:

```javascript
start(){
  // Connects to databases, etc.
}
end(){
  // Grafecully stops services, closes databases, etc.
}
process.on('exit', end);
start();
```

So, once you have this done, your app should start and end gracefully.
Then, you must set how the databases or services will work. They should always be set from the environment (as databases or services depends on things outside the app, they should be configured in the environment.)
You will have to store or get configuration from two places: constants and config.

Constants will have configuration inside the app (mainly things that are used in many places, but they won't be modified from outside, like an specific URL for the API). In the other hand, config must get things from the environment, for example, database URLs.

**How to know if a variable should be in the environment or in constants?**: If it's something you should want to configure from OUTSIDE the app, like the database host, credentials, services URLs, etc. it should be in the environment. If it's something you just want to have in some place to prevent magic numbers or strings, or the reuse the same value in different places, it should be in constants.

**Why does it use config.ts instead of just using process.env?**: It's dangerous to have all the information inside process.env. If one of your dependencies, for example, is compromised and it sends a JSON.stringify(process.env) to some specific URL, someone could steal all your information. Also, it makes sure you have the environment variables you need. It requires all of them (or set a default) in the same place at the beggining, so you can control the app is starting with all the information it needs.

**Note**: Some dependencies added in package.json, specially database drivers, are not necessary. You can remove them if you want.

## Types

The /types dir contains all the different types that could be reused in different parts of the application. For example, you might find a type (like UserType) that will be needed in model, controller and API layers, even in the /services dir. Also, you could find different files inside the same layer that use this type. It's not a good practice to rewrite this type in every file (if you have to modify something, you will have to do it in a lot of files), so it's better to have them in a specific dir.

**Some guides**:

- If the type it's a TypeScript built-in, like "Record<string, string>", it's better NOT to include it in "types". The idea of /types it's to simplify TypeScript usage, not to have all the types in the same place.
- If the type it's too layer specific, maybe it shouldn't be here, because you could reuse that type in another layer when you shouldn't. For example, mongoose types shouldn't be here, as you don't want a mongoose document type going through all the application. This would break concerns separation: if controller uses some model specific types, then model it's not a module, and you cannot replace without changing the controller layer too.
- Layers should expose only types that DO NOT depend on specific tools. For example, model should convert all sequelize or mongoose database results to arrays and objects before exposing them.

## Errors

If you have some error in the application, it's better to use another approach rather than just "throw new Error". Errors have two main parts: error codes (every error in the application should have an error code, like "API_METHOD_NOT_FOUND") and the class CodedError (an error that is raised with a code instead of a message).

So everytime you have a new possible error, you should add it to error codes and throw it in the application with CodedError.

**Why are error codes needed?**: Errors with messages have a description, but it cannot be used in other contexts. For example, if I consume a service and it returns an error with a message, I can only rethrow that error description or give a generic one. But if the error comes with a code, I can manage errors differently accoring to it, and I can also give my own error description. We also know errors support error codes natively, but in this way, you can use typescript to force code usage.

**Why not use number codes?**: Error number codes are useful, but they do not have a meaning. It's easier to develop and manage an error called "API_METHOD_NOT_FOUND" than an error referenced with "3".

## Internationalization

If the app will be needed in more than one language, this directory comes to the rescue.
Every app description or string that will be seen by the final user should be here. This way, you will find every text in the same place.
Also, internationalization lets you use more than one language. You can specify the description in english and spanish, for example, and also can be extended in the future.

So:

- If the string can be seen by the user, like an error description, it should be added here.
- If the string will only be seen by the developer or app crew, it's ok to have hard-coded descriptions in the code (like "Database not connected!").
- Every string should be written in the default language, but you can also have more than one.
- You can add error descriptions here by its code. For example, if the error is coded "API_METHOD_NOT_FOUND", you can use "API_METHOD_NOT_FOUND":"We cannot find the method you are looing for...".

## Model

This layer works as a module to interact with data persistency. If something in the app must be persisted or includes a database, it should be here.
Anyway, this layer should never be accessed directly (vg: the API using the model directly). If any part of the app needs to use it, it should access it through the controller layer. This is in order to prevent the model being accessed without control, and having a security layer on it (for example, if you need specific conditions on the bussiness logic to edit the model, this could be bypassed using the model directly).

The /model directory contains three main parts:

- **db**: This dir contains database connections. For example, if you have to connect to mongo or sqlite, it contains mongoose or sequelize. All the model layer can have the database connection by this dir.
- **orm**: It contains the different ORM data models. For example, if your app will need books, the model Book must be stablished here (as a sequelize.model or mongoose.model).
- **actions**: Every action needed on the model (like CRUD actions, count, etc.) should be here. It works as an abstraction layer on ORM to modularize model. So, the main part to interact with the model should be in model/actions.

Also, you will se a file:

- **handleError**: Handles the model errors.

### Guide:

- If you need a database connection: SQL Server, SQLite, MariaDB, MongoDB, PostgreSQL, Redis, etc. It should be added to "db".
- You should never use a raw query to database, unless it's the only option. Using raw queries make the layer too database dependent. For example, if you use a raw query for PostgreSQL, then you cannot change to SQLite without having to change that query.
- Every interaction with the database should be done using "ORM". This abstraction layer prevents security issues and it's a lot tidier than raw queries.
- All the model names and table/collection names must be in the /constants dir. Do NOT hardcode the model names or tables/collections. This is because we want to modify their names before testings.

We should save each model table or collection name like:

```javascript
MODEL:{
  MY_MODEL:{
    NAME: 'SomeModel',
    TABLE_OR_COLLECTION_NAME: 'some_model',
  }
}
```

- The validation should be done INSIDE the ORM. Every ORM has validation methods, even including the possibility to add customs. Vg: [Mongoose](https://mongoosejs.com/docs/validation.html) and [Sequelize](https://sequelize.org/master/manual/validations-and-constraints.html) validation methods. If something will be rejected by the model, it should be rejected here, not in actions.
- Every action on the model that the app will need should be added in "actions". The app should NEVER interact with the ORM if it's not through "actions".
- The actions should not expose database specific types (like mongoose.Types.ObjectID or sequelize.Model). This layer must convert all these results to plain javascript objects before returning them. Otherwise, other parts of the app could be working with database specific types, making it impossible to change the model layer without editing other layers.
- Specific database type declarations should be declared inside the "/model" and not inside "/types", in order to prevent this types flowing outside the model layer (and breaking separation of concerns).
- The model layer should never be used directly. **Use the controller layer!!**
- All the data must be controlled by the application. The model cannot rely in nothing outside the app (not even in database structure). Databases should be pluggable, and the application controls the data models.
- Try to keep one service <-> one database. If you need to control more than one MariaDB, for example, it could mean you are not following a microservices design.

**Sometimes the controller layer just returns the model layer methods without any control. Why not using model actions directly?**: Using the model directly will let you modify the database without control. Model must be "dumb" and only know how to use database and validate models. If in the future you will need some rule like "do not modify the database in this condition", you cannot add it here, because you will be inserting bussiness logic things inside the model layer. And, if you access model directly in different parts of the app, you could forget one when you add the new rule and have some actions controlled and others not. It's better to have a "dumb" method in controller just passing the model layer method and add bussiness logic things there in the future, than having to control the model actions everywhere in the app.

**If I want the database to start with some information, can I do it outside the service?**: No. It the service need some starting information in the database, it should insert it itself at script starting. If something of the model relies in the database and not in the service, then if you want to change the database (vg: from mysql to postgresql), then you should modify the database container or database instead of the ORM dialect. It's harder. Databases should be pluggable, not having any information.

**Can the model interact with more than one database, vg 2 SQL databases?**: No. One service <-> One database.

### Error handling:

If you use sequelize or mongoose, you will se they have custom validations like:

```javascript
  minlength: [30, 'Here your custom error'],
```

But these is not the error you will handle when you use catch(error).

Both ORMS give complicated errors when they are thrown, so, in order to have a better error control (using it with a code, for example).

- Sequelize throws errors as an array of objects like [error1, error2, error3], where each error has its message.
- Mongoose throws errors as anmap of objects like {error1, error2, error3}, where each error has its message.

So, to make easier the use of models, wherever you add or update something in a model (where the validation functions are used), you should use the **handleError.ts** file. This files controls the thrown error and returns a CodedError.

So, for example:

```javascript
import handleError from '~/model/handleError';

// CODE...

let result: Record<string, unknown>;
try {
  const newSomething = new SomethingModel.Sample({ someInfo });
  await newSample.save();
  result = newSample.toObject();
} catch (error) {
  return handleError(error);
}
return result;
```

With this method:

- If the thrown error ir a coded error, it rethrows it.
- If it's a sequelize or mongoose error, it takes the first error and throws a Coded Error with the message in its code.
- If it's none of the previous cases, throws a not defined coded error.

## Controller

This layer has the app bussiness logic. Whatever the app needs to do or execute, it should be done here. For example, if the app were a book services app, and you have to add one, you should have here a books.add(book: Book) method. If your app just extract texts from files, here you must have the extractor.extract(file: File) method.

This is obvious in methods that do NOT interact with the database. But if the method interact with the database, this layer must be used to access it, even if the methods have this format:

```javascript
controller.add(book){
  return model.add(book);
}
```

This is in order to prevent the model being accessed without control. Also, if in the future you need to add some bussiness logic rule to prevent database accessing, it can be added here (which is much tidier than inserting bussiness logic things in model layer).

```javascript
controller.add(book){
  if (!canEditModel()){
    return false;
  }
  return model.add(book);
}
```

This is very important for consistency. If in the future you will have cronjobs, or you will be able to access it via CLI, a task from a quere, or an API consumption, etc., it would be dangerous to do it without business logic contol.

**Guide**:

- Every model (vg: userModel) should be accessed by one controller (userController). Avoid using more than one model by controller.
- If a controller file needs more than one model, use the other controller to access it. Vg: if userController needs to know about permissions, do not access permissionModel directly, access permissionsController instead.
- Do NOT add here API requests to other URLs or services. These should be added to /services directory, and controllers must use them.

**Why can't a controller access more than one model?**: It's for separation of concerns. Imagine you want to add one new control over permissions. You intuitivelly will add it to permissionsController. If userController also has access to permissionModel, you might forget updating it when you need to change the module.

## API

This directory handles the http requests. So this layer must:

- Receive http requests.
- Apply security control (even though the application should be behind a reverse proxy, it must have it's own security too).
- Validate client input.
- Executes whatever it's required (in the controller layer).
- Returns the response.

You will find main components inside this directory:

**Files**:

- **index.ts**: Receives the https and applies security controls: headers security (with helmet), prevent DDOS and brute force (with express-rate-limit and express-slow-down), returns documentation (with Swagger) and parses the JSON body (with body-parser).
- **apiUtils.ts**: It contains some methods that could be used in every script inside the api layer, for example: it centralizes the error handling and success responses, saves information in req for other handlers to use and returns responses as files.
- **auth.ts**: It contains JWT middleware, how to authenticate with this service and some role controls.
- **routes.ts**: Contains the different routes the API has, like: "/users/{id}" or "/users/{id}permissions". It assign a handler function to every route it can use. It also controls errors and 404. Whenever you want to add a new API route, you must add in "routes" and add the handler in the "handlers" directory.

**Directories**:

- **swagger**: It contains the API documentation using OPEN API 3.0. You should add documentation here, using this: [OPEN API Specification](https://swagger.io/specification/).
- **schemas**: It contains different JSON schemas that will be received by the client. API requests will be protected using the [ajv library](https://github.com/ajv-validator/ajv).
- **handlers**: Has the different handlers for the different API requests. Any API method should have a handler.

**Guides**:

Everytime you add a new API, you should:

1. Add a function handler for the request: it must always have (req, res, next). If one is missing, you are not handling the request correctly.
2. Add the expected json schema in /schemas (add it to schemas/validations/paths and then in schemas/validations/index.ts). You can use: [JSON to Schema](https://www.liquid-technologies.com/online-json-to-schema-converter) to do the json schema.
3. Validate user input using ajv with the expected schema.
4. Do whatever you need in the API.
5. Handle errors: errors should be handled with "next(error)", so express can control it.
6. Return the result to the user.
7. Document in /swagger the new API added.

Every handler should look like this:

```javascript
// routes.ts
api.post('/api/do-something', APIHandler);
```

```javascript
// handlers/handler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Some info about the handler.
 */
async function APIHandler(req: Resquest, res: Response, next: NextFunction): Promise<boolean> {
  let result;
  try {
    await schemas.validate(req.body, 'schemaName');
    result = await controller.doSomething();
  } catch (error) {
    next(error);
    return false;
  }
  return apiUtils.sendResponse(res, result);
}
```

The API response should be something like:

```javascript
const succesResponse = {
  success: true,
  payload: {
    whatever1: '',
    whatever2: '',
    whatever3: 1,
  },
};

const errorResponse = {
  success: false,
  error: 'Some error description',
  errorCode: 'ERROR_CODE',
};
```

**Why all the routes in the same file?**: It's more tidy. You can see all the routes in the same place. Also, if you want to add some control in the middle, you can do it in this file. For example, if you need in the future to add some control, the routes should be like:

```javascript
api.get(ROUTES.SOME_METHOD, apiHandler.someMethod);

api.all('*', controller.controlSomeThing);

api.get(ROUTES.SOME_METHOD2, apiHandler.someMethod2);
```

**Security issues**: You can control the application security using tools like the [Mozilla Observatory](https://observatory.mozilla.org/). Also you can check security like SSL with (ssllab)[https://www.ssllabs.com/].

## Services (how to use this and others with this template)

This directory contains all the services consumed that do not depend on this service.
By default, any request to other server or another service should be here.

In general, the credentials to use these services should come from environment variables (for example, an API KEY or credential to use a third party service). This have to be this way because you want to plug and unplug services from outside this service itself.

This template have a sample on how to use other services and also how to use this one, with this template response format. It works using the [axios](https://www.npmjs.com/package/axios) package.

```javascript
const APIClient = axios.create({
  baseURL: 'HERE THE URL' // Should come from an environment variable.
  timeout: 10000,
  headers: {
    'X-API-KEY': 'SOME API KEY', // Algo from env, like CONFIG.SERVICES.SOME_SERVICE.API_KEY
  },
});
```

Also, there's a file called "axiosHelper" which will help you handling axios responses.
Axios is an awesome library but:

- Take any status code different than 2xx as an error (not what we wanted in REST).
- This errors have the response as an object and it's verbose to take that on every method.
- It's very verbose to use with typescript (and you have to use "any").

The file "axiosHelper" will help you get the response with the different information you need in this format, regardless of the status code:

```javascript
type ServiceResponseType = {
  statusCode: number,
  success: boolean,
  errorCode?: string | undefined,
  error?: string | undefined,
  payload?: any,
};
```

From now on, you can get the format you want like this:

```javascript
  /**
   * Gets something.
   */
  async getSomething(): Promise<string> {
    const url = '/something';
    let result;
    try {
      const response = await APIClient.get(url);
      result = axiosHelper.handleResponse(url, response);
    } catch (error) {
      result = axiosHelper.handleError(url, error);
    }
    if (!result.success) {
      throw new CodedError('OTHER_SERVICE_ERROR', [], { response: result });
    }
    return result.payload;
  }
};
```

In both cases, if the response is valid (a JSON), it will return the object with that information.

## Testing

It's very important to add tests in order to know the service is working correctly.
We will use Jest for that. It contains an extensive documentation on how to do it: [docs](https://jestjs.io/docs/en/getting-started).

If we have time, it's always a good practice to have unit testing for everything and integration testing in your app/service.
But, as we never have enough time, at least (worst scenario) there must be an API integration testing.

All the tests are in the /tests directory with the suffix "test.ts". If they don't say ".test", they are not tested by Jest.
Before any test, Jest will use the "prepareTests.js" script which should change all the models tables/collections for another name for testing.

**Why changing model names?**: We don't want to mock, because if we want to test integration with databases, we want to use databases... Also, we don't want to destroy all the information in the testing databases. So, in order to test and keep the information stored outside tests at the same time, we create different collections and tables for testing and then we drop them, without using the collections with the original names. As the databases content and models should rely on application logic, it would be the same... If it's not, there's a problem with separation of concerns.

### Unit testing

Unit testing is very simple when you have modules you want to test and they always return the same output.
We should do unit testing for every module or script that do not use third party dependencies or other services (like a DB).
The process is very simple and you can follow Jest documentation.

```javascript
test('Fs returns text OK.', () => {
  const text = fs.readFileSync(FILE_PATH, { encoding: 'utf8' });
  expect(text).toBe('Content of the file');
});
```

Always remember:

- Unit testing should test only ONE thing.
- They should be stateless (always make sure the unit testing does not expect a previous state, or, if they do, they should initialize it inside the function).

This documentation has nice good practices (for C#, bue they also apply for javascript): [docs](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices),

### Integration testing

#### Model

When the modules includes a data layer, you need an external service, mainly a database.
We prefer testing with real databases, and not with mocks.
Always remember the database should be stable and predictable for every test, so, it very important to:

- Be sure you are in a testing database.
- Create a new collection/table for every test (changing the model names achieves that, it's done in prepareTests.js).
- Empty the database or initialize with the required data for every test.
- Drop the collection/table after having finished.
- Close the database.

With Jest you can do it like:

```javascript
beforeAll(async () => {
  await database.connect(URL);
  await initializeData();
});

beforeEach(async () => dataBase.empty());
// Or
beforeEach(dataBase.empty);

afterAll(async () => {
  await dataBase.drop();
  await dataBase.close();
});
```

**Note**: As we change model names, it's very important to never hardcode or keep tables/collection names in a different part of the code.

#### Other layers

Other layers usually uses model layer, which means they interact with the database. So, when testing these modules, it's better to use a bottom -> up approach. It means, when you have tested the model layer, you can test upper layers, like controller, API, CLI, etc.

As with the model, it's very important to remember connecting, starting, emptying and closing the database. Otherwise, you will finish your tests with connections opened.

**Note**: Remember to run this tests "in band". Database must be predictable, so, if many tests runs at the same time, they can collide each other. It's better to run them one by one.

#### Testing the API layer

The API layer is the upper layer in this microservice. Testing them could include from the top layer to the bottom layer (maybe the model).
We can use [supertest](https://www.npmjs.com/package/supertest) for this.

It's very important to have some considerations using supertest:

- Remember to import the application and not the server (we need the request handler, like "app = express()" and not the "server.listen()").
- Be sure the application is working before sending them some requests to test (otherwise you will receive an internal server error). There are two scenarios you can find. First, the service can interact with a database or some external service that needs time, and you might send a request before it started. You can prevent that using the "started" event, so you can wait for that before starting tests

```javascript
decribe('Testing the api...' , () =>
  beforeAll(async (done) => {
    return new Promise(() => app.on('started', done));
  });
```

In the other hand, you could have a service that starts pretty fast, because it doesn't have to wait for anything. In that case, waiting for the "started" event will block everything, because it will be already send when your tests start. If you are in the second case, do not wait for anything, just use the tester.

- You must also remember closing the database connection when the tests are finished.
- You must increase the Jest Timeout (because integration tests are slow, you can have a timeout before receiving the first response):

```javascript
jest.setTimeout(30000);
```

Remember that while unit testing should be small and concerned with business logic, integration testing can do more checking related to the database and other APIs working correctly.

#### Testing with third party services or other microservices

As we cannot test with production environments, we need to mock.
There are many options to mock APIs, like: [proxyquire](https://www.npmjs.com/package/proxyquire).

This way we can mock the API result and know our code works well.

## Documentation

We use some tools to document the microservice "automatically": Jest HTML reporter, Swagger with OpenAPI 3.0 for APIs and Typedoc for code documentation.

This template will generate three different folders for documentation in different times inside /docs.

- **code**: It will be added running npm run generate-docs with typedoc.
- **tests**: It will be added by Jest when the testings are finished and it gets the report.
- **api**: It contains some files from the swagger UI. Its content is generated running "npm run generate-docs".

API docs requiere to use the YAML by hand, but the docs will be made automatically from that.

### Testing documentation

We use [Jest HTML Reporter](https://www.npmjs.com/package/jest-html-reporter) for document unit testing.
Just do unit and integration testings and it will save the results in the specified file.

### Code documentation with TypeDoc

We use [TypeDoc](https://typedoc.org/). This documentation is done by using "npm run generate-docs". It reads file by file and generates a new documentation in "/docs". But in order to be tidy there must be some considerations:

- Always put module location in the top of the script. Like this:

```javascript
/**
 * @packageDocumentation
 * @module Path/To/Module
 * Here some module description that will be seen in the docs.
 */
```

- If the entire file shouldn't be in the documentation, use hidden:

```javascript
/**
 * @packageDocumentation
 * @hidden
 * Here some module description.
 */
```

- Add a little documentation to every method and arguments.

```typescript
  /**
   * Adds the sample to the database.
   * @param sample Sample to save.
   */
  async addSample(sample: sampleType): Promise<boolean> {
    return samples.add(sample);
  }
```

- Remember to add "private" to everything that is private.
- Add a little description to any public thing that will be seen in docs.

```typescript
class ExampleClass {
  /**
   * Some property of the class.
   */
  _property: string = '';
}
```

- If the file is an index and it's just an access to other objects, it's better to put "@hidden" on it, because it could appear empty on the docs.
- You can follow [TSDocs](https://github.com/microsoft/tsdoc) for notation.

**Note**: It's a good practice to watch documentation often, so you will see what the output is.

### Swagger

Considering this is a microservice, it's very important to have the API docs. Swagger is a very nice tool that lets you use a very intuitive doc online based on a YAML/JSON. It also provides a very nice platform that shows you the results in real time.

To use it for this microservice:

1. Add an API request.
2. Open the file src/api/swagger/swagger.yml
3. Read the docs on how to edit this: [docs](https://swagger.io/docs/specification/about/).
4. Copy the content in the swagger editor: [editor](https://editor.swagger.io). It's very nice, it shows you the result in real time and also shows where the errors are.
5. If you want to use some code variable (like, ERROR_CODES.NOT_FOUND, ROUTES... etc.), use it like "\${ERROR_CODES.NOT_FOUND}". The system will replace them in runtime.

```yaml
openapi: 3.0.0
info: ...
paths:
  '${ROUTES.MONGO.SAMPLE}': ...
```

6. When you finish, copy and paste it again in src/api/swagger/swagger.yml.
7. Check it's OK in "your-site.com/docs".

You will see paths in Express are like "/path/:param1/:param2/something" and in Swagger they are like "/path/{param1}/{param2}/something". Don't worry, the method "npm run generate-docs" will change them for you before making the final swagger docs.

**Note**: Maybe in the online editor you will find some errors about the structure. If you use "\${ROUTES.SOME.PATH}" it will say it's an invalid format. It's normal, it will be replaced at running npm run generate-docs.

**IMPORTANT:** There's a limitation between Swagger <-> Express that doesn't allow you to go t

### Data models

If you are using a relational database, the best way to make the documentation is using a tool like [MySQL WorkBench](https://www.mysql.com/products/workbench/).

Using sequelize you can choose the dialect, and it's perfectly possible to use different dialects just by changing them. You can use mysql as the dialect in your local computer, and follow [this steps](https://medium.com/@tushar0618/how-to-create-er-diagram-of-a-database-in-mysql-workbench-209fbf63fd03).

### Sequence Models, Use Cases, Components and others

These documentations should be done by hand, because there aren't tools to do them automatically.
The tool chosen for this point is [draw.io](https://draw.io) because it's free, easy to use, can exports to PDF or image, it lets you import or export your diagrams, has templates, lets you sync with Google Drive, etc.

The best option is to make the documentation by hand, but there are some assets in the "/docs" folder you can use to make it easier.

**How to use the assets:**

If you want to use the assets you should enter to [draw.io](draw.io), go to File > Import from > Device and choose the corresponding XML file.
From there, you can change anything you want. Then, you can export it as PDF.

There are some videos in youtube very nice to work with draw.io like [this](https://www.youtube.com/watch?v=h27L_BznekM&ab_channel=ImposterSyndrome).

## Developing the service

This template is written in typescript, which means it has to be compiled before running.
There's a tool that hot reloads the new code and compiles the modified files in real time, so you don't have to wait for an entire compilation before developing new things. This template uses a package calles "tsc-watch", which uses tsc with "watch" mode.

When running "npm run dev", the package does this 3 things:

- Cleans the /build dir.
- Copies the files that aren't copied by the typescript compiler.
- Compiles the code and keeps watching for changes to recompile those files.

This way, it's possible to change code in the typescript files and see the changes in real time.

But, this system is not perfect, and it can fail in some scenarios, in which you should run "npm run dev" again:

- If you add files that are not ".ts": the "watch" mode only looks for javascript/typescript files, so it will ignore other files.
- If you change files names: it compiles files with the new name, but it won't delete the compiled file with the previous name, so both will exist.
- If you change a file for a folder. For example, "script.ts" now will be "script/index.ts". The copiler will create "script/index.js" without deleting "script.js" so they both will exist. It will fail in runtime because it will load the old "script.js" instead of the new "script" dir.

## Authentication, authorization and permissions

The system MUST have an authentication/authorization system, for security reasons. Otherwise, it could be used by anyone.
It has two options: JWT or API KEY, and it can be configured in the environment variables.

### API KEY

This system is the best option if the service:

- Doesn't need specific controls for methods. Every method can be used by any client.
- Won't be reached by users. If an user will use this service, it's better to authenticate with a JWT, not with API key. These are better for service-to-service communications.
- Will only be consumed by other services.

If you choose API KEY, you must set the API_KEY in the environment variable. Then, every request should send the API key in the header like:

```
X-API-KEY: here-the-very-long-api-key-for-security-reasons.
```

This way, the system rejects not authenticated consumers.

### JWT

Docs abouts JWT: [JWT](https://jwt.io).
This system is the best option if the service:

- Has specific permissions for specific users.
- There must be a specific control on every or some methods.
- Can be reached by users (otherwise, if you have an attack or you need control, you can't know who it is!).

If you choose JWT, you must also set the JWT_SECRET and the JWT_ALGORITHM (HS256, HS512, etc.).

If you use JWT, the most probable scenario is that you are behind an API Gateway that uses another service or signs itself the user identity.
In this case, this service will receive a header like:

```
Authorization: Bearer here.the.JWT
```

The service can open the JWT if it has the same algorithm and secret that the signer. This means that if you have another service that signs the JWT (probably a users/permissions microservice), you will need those environment variables for this microservice too.

#### JWT permissions and roles

There are many ways to control permissions. Maybe you want to control all the access in the Gateway. Maybe you want to control the roles in the service.

In case you want the service itself to control permissions and roles (and not another service like the API Gateway), you can do it with this guide:

If you choose JWT, it's a standard to set the user roles in an array in the JWT payload, like:

```javascript
{
  "user":"some-user-id",
  "mail":"mail@mail.com",
  "role":["SOME_ROLE","OTHER_ROLE","ANOTHER_ROLE"]
}
```

This allows you to control every user and its permissions by just looking at "role".
If you have a more complicated permissions system, maybe you will need to consume another service that returns true or false.

There are two methods in auth that will help you:

**auth.hasAnyRole** will let you control everywhere if the user has one of the specific roles:

```javascript
someMethod(req: Request, res: Response, next: NextFunction){
  const allowedRoles = ['USER', 'ADMIN', 'GOD'];
  if (!auth.hasAnyRole(req, allowedRoles){
    // Throw error with next(error) because he/she can't do this.
  }
}
```

**auth.stopRequestsWithoutAnyRole** will let you control from a specific point in the router to prevent not allowed users. It uses the hasAnyRole method but for every request, and returns NOT AUTHORIZED error if it's not allowed:

```javascript
router.get('/something', something);
router.get('/other-something', something2);

const allowedRoles = ['USER', 'ADMIN', 'GOD'];
router.use(auth.stopRequestsWithoutAnyRole(allowedRoles))

router.get('/protected-method', something3);
router.post('/another-protected-method', something4);
}
```

### Some recommendations

In order to have a secure authentication/authorization:

- JWT secrets and API keys should be long. You can use tools like: [Password Generator](https://passwordsgenerator.net/). Otherwise they could be broken by a brute force attack.
- Secrets and API Keys should be changed "frequently". Every some weeks (not everyday).
- If you have an user system, you should have a Gateway that prevents the usage of revoked tokens (to allow logout, ban users, etc.). All that stuff should be done in the gateway with an users service.

## Security

Even though this system should work behind an API Gateway, reverse proxy, etc., everything inside the app (all the services) should be protected.
Some things to take into account:

- The system can be used without SSL, but it's not recommended (if someone enters to the network, will see the messages sent between services).
- The service MUST use an authentication system (otherwise, if it's exposed, anyone could use it!). That's why it uses JWT or API KEY.
- The system should ALWAYS use a rate limiter and a slowdown limiter. It can be very high, but it must exist (to prevent a DOS attack).

By default, this system has a very high rate limit and slow down limit. You should change them in /constants/security according to this system chracteristics.

# Scripts

You can use the following commands:
| Command | Description |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| npm run \_clean | Deletes the /build dir. |
| npm run \_copy-files | Copy all the files that will not be copied by tsc from /src to /build. |
| npm run \_control | Runs lint, format and test. |
| npm run install-globals | Installs globally dependencies like eslint and prettier. I know globals are bad, but this way you can use the scripts in any OS (if you use windows, these scripts will work with this). |
| rpm run lint | Runs eslint in the /src directory. |
| npm run format | Runs prettier in the /src directory. |
| npm run dev | Compiles the TypeScript project and watches for TypeScript differences (only wacthes TypeScript files since the first compile!). |
| npm run test:unit | Runs Jest for all the test in the /tests/unit directory. |
| npm run test:integration | Runs Jest for all the test in the /tests/integration directory. |
| npm run compile | Compiles all the files in the /src directory to the /build directory. Also it copies all the files. |
| npm run build | Runs npm run lint, format, test, compile and generate docs. |
| npm run start | Starts the script with node loading the environment variables from the .env file. |
| npm run pm2 | Starts the script with pm2, loading the variables from the .env file. |
| npm run start-from-docker | Starts the script considering it comes from docker. |
| npm run generate-docs | Generate the docs once the code is running. |

# License

MIT © [Matías Puig](https://www.github.com/matipuig)
