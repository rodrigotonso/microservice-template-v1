/**
 * @packageDocumentation
 * @module API/APIUtils
 * 	Has some useful functions for the API.
 */

import { Request, Response, NextFunction } from 'express';
import { isUndefined, cloneDeep, noop, isString, isArray } from 'lodash';
import { ReadStream } from 'fs';

import { CodedError, CODES as ERROR_CODES } from '~/errors';
import i18n from '~/internationalization';
import { logger, LABELS } from '~/utils/logger';

type APIResponse = {
  success: boolean;
  error?: string;
  errorCode?: string;
  payload?: unknown;
  reload?: boolean;
};

type ExtendedRequest = Request & {
  __SAVE?: Record<string, unknown>;
};

/**
 * 	Has some useful function for the API.
 */
class APIUtils {
  /**
   * Constructs API Utils.
   */
  constructor() {
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Logs the IP.
   * @param req Request object from express.
   */
  logIP(req: Request, res: Response, next: NextFunction): boolean {
    noop(res);
    const headerForwarded = req.headers['x-forwarded-for'];
    const isForwarded = isString(headerForwarded);
    let ip;
    if (isForwarded) {
      const arrHeader = isArray(headerForwarded) ? headerForwarded[0] : headerForwarded;
      ip = arrHeader.split(',').shift();
    }
    ip = ip || req.connection.remoteAddress || req.socket.remoteAddress || req.ip;
    const { url } = req;
    logger.info('IPS', LABELS.INFO.IP, { ip, url });
    next();
    return true;
  }

  /**
   * 	Saves the value in the request, so you can recover it in other place.
   * @param req Request object from express.
   * @param variables Variables to be saved to the Request object.
   */
  saveInReq(req: ExtendedRequest, variables: Record<string, unknown>): boolean {
    if (isUndefined(req.__SAVE)) {
      req.__SAVE = {};
    }
    const save = cloneDeep(variables);
    req.__SAVE = { ...req.__SAVE, ...save };
    return true;
  }

  /**
   * 	Load the values from the request, if you saved them before.
   * @param req Request object from express.
   * @param variables Variables to get from Request object.
   */
  loadFromReq(req: ExtendedRequest, variables: string[]): Record<string, unknown> {
    if (isUndefined(req.__SAVE)) {
      req.__SAVE = {};
    }
    const result: Record<string, unknown> = {};
    variables.forEach((variable) => {
      result[variable] = req.__SAVE[variable];
      return true;
    });
    return result;
  }

  /**
   * Sends the response with code 200.
   * @param res Response object from express.
   * @param payload Whatever you wanna send to the user.
   * @param code Status code the user will receive.
   */
  sendResponse(res: Response, payload: unknown, code = 200): boolean {
    const send: APIResponse = {
      payload,
      success: true,
    };
    res.statusCode = code;
    res.json(send);
    return true;
  }

  /**
   * 	Sends the error with the specified code.
   * @param req Request object from Express.
   * @param res Response object from Express.
   * @param error Error to be sent to the user.
   * @param code HTTP status code for the response.
   * @param askReload If it should send "reload:true" or false to the user.
   */
  sendError(req: Request, res: Response, error: CodedError, code = 500): boolean {
    const response: APIResponse = {
      success: false,
      error: i18n.getErrorDescription(req, error),
      errorCode: error.code,
    };
    res.statusCode = code;
    res.json(response);
    return false;
  }

  /**
   * 	Send a content as a file.
   * If it's a "pdf" it send it as one.
   * @param res Response object from Express.
   * @param file File to be send to the user.
   * @param fileName Name of the file the user will see.
   */
  sendAsFile(res: Response, file: ReadStream | string | Buffer, fileName: string) {
    let finalFile = file;
    let contentType = 'application/octet-stream';
    let disposition = 'attachment';

    if (typeof file === 'string') {
      finalFile = Buffer.from(file, 'binary');
    }

    if (fileName.toLowerCase().endsWith('.pdf')) {
      contentType = 'application/pdf';
      disposition = 'inline';
    }

    if (Buffer.isBuffer(finalFile)) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-disposition': `${disposition};filename=${fileName}`,
        'Content-Length': finalFile.length,
      });
      res.end(finalFile);
      return;
    }

    if (finalFile instanceof ReadStream) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': `${disposition}; filename=${fileName}`,
      });
      finalFile.pipe(res);
      return;
    }

    res.setHeader('Content-Disposition', `${disposition}; filename=${fileName}`);
    res.setHeader('Content-Type', contentType);
    res.send(finalFile);
  }

  /**
   * Send that the specified method was not found.
   * @param req Request that sent the incorrect method.
   * @param res Response that will send error to the client.
   * @param next Next function to be executed in express.
   */
  sendMethodNotFound(req: Request, res: Response, next: NextFunction): boolean {
    noop([res, req]);
    const error = new CodedError('API_METHOD_NOT_FOUND');
    next(error);
    return true;
  }

  /**
   * Handles the error ocurred in the API.
   * @param err Errorto be thrown.
   * @param req Request that received the error.
   * @param res Response that will send error to the client.
   * @param next Next function to be executed in express.
   */
  handleError(err: CodedError, req: Request, res: Response, next: NextFunction): boolean {
    noop(next);
    let error = err;

    switch (err.code) {
      case 'credentials_required':
      case 'invalid_token':
      case 'credentials_bad_format':
        error = new CodedError('NOT_AUTHORIZED');
        break;

      default:
        error = err;
    }

    if (err === error) {
      error = CodedError.fromError(error);
    }

    const errorCode = this._chooseResponseCodeByError(error);
    this.sendError(req, res, error, errorCode);

    delete req.headers['X-API-KEY'];
    delete req.headers.Authorization;
    delete req.headers['x-api-key'];
    delete req.headers.authorization;
    delete req.headers.cookie;

    const context = {
      error,
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    return logger.error(err.code, LABELS.ERROR.API_REQUEST, context);
  }

  /**
   *
   * PRIVATE.
   *
   */

  /**
   * Choose the response code by the error code.
   * @param error Error received.
   */
  private _chooseResponseCodeByError(error: CodedError): number {
    let errorCode: number;
    switch (error.code) {
      case ERROR_CODES.INVALID_PARAMS:
      case ERROR_CODES.API_INVALID_PARAMS:
        errorCode = 400;
        break;
      case ERROR_CODES.NOT_AUTHORIZED:
        errorCode = 401;
        break;
      case ERROR_CODES.API_METHOD_NOT_FOUND:
        errorCode = 404;
        break;
      case ERROR_CODES.API_REQUESTS_TOO_OFTEN:
        errorCode = 429;
        break;
      case ERROR_CODES.NOT_DEFINED:
        errorCode = 500;
        break;
      default:
        errorCode = 403;
    }
    return errorCode;
  }
}

export default new APIUtils();
