/**
 * @packageDocumentation
 * @module API/Handlers/Sequelize
 * Contains the API handler for sequelize.
 */
import { Request, Response, NextFunction } from 'express';
import { noop } from 'lodash';

import apiUtils from '~/api/apiUtils';
import schemas from '~/api/schemas';
import sequelizeSample from '~/controller/sequelize';

/**
 * Sequelize handler for API.
 */
class SequelizeAPI {
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
      result = await sequelizeSample.add(sample, sample.otherInfo);
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
      result = await sequelizeSample.getAll();
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
      result = await sequelizeSample.count();
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
      result = await sequelizeSample.countOtherInfo();
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
      result = await sequelizeSample.delete(sampleName);
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
      result = await sequelizeSample.empty();
    } catch (error) {
      next(error);
      return false;
    }
    return apiUtils.sendResponse(res, result);
  }
}

export default new SequelizeAPI();
