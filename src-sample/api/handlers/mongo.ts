/**
 * @packageDocumentation
 * @module API/Handlers/Mongo
 * AIP Handler for mongo.
 */
import { Request, Response, NextFunction } from 'express';
import { noop } from 'lodash';

import apiUtils from '~/api/apiUtils';
import schemas from '~/api/schemas';
import mongoSample from '~/controller/mongo';

/**
 * API handler for mongo requests.
 */
class MongoAPI {
  /**
   * Adds a Sample to the database.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   */
  async add(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    let result;
    try {
      const sample = req.body;
      await schemas.validate(sample, 'SAMPLE');
      result = await mongoSample.add(sample, sample.otherInfo);
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }

  /**
   * Returns all samples in database.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    noop(req);
    let result;
    try {
      result = await mongoSample.getAll();
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }

  /**
   * Counts how many samples are in the database.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   */
  async count(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    noop(req);
    let result;
    try {
      result = await mongoSample.count();
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }

  /**
   * Count how many other info entrances are there.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   */
  async countOtherInfo(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    noop(req);
    let result;
    try {
      result = await mongoSample.countOtherInfo();
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }

  /**
   * Deletes the specified document.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   * @param name Name of the sample to delete.
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    let result;
    try {
      const sampleName = req.params.name;
      result = await mongoSample.delete(sampleName);
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }

  /**
   * Empties the specified collection.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next next Express NextFunction object.
   */
  async empty(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    noop(req);
    let result;
    try {
      result = await mongoSample.empty();
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }
}

export default new MongoAPI();
