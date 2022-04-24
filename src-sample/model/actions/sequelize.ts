/**
 * @packageDocumentation
 * @module Model/Actions/Sequelize
 * Interacts with sample sequelize model.
 */

import { Op } from 'sequelize';

import CONSTS from '~/constants';
import handleError from '~/model/handleError';
import SequelizeModel from '~/model/orm/SequelizeSample';
import { SampleType, PropertyType } from '~/types/Sample';

type SequelizeResult = Record<string, unknown>;

type DBProperty = PropertyType & {
  sampleId: number;
};

/**
 * Actions on the sequelize database sample.
 */
class Sequelize {
  /**
   * Adds a Sample to the database.
   * @param sample Sample to be added.
   * @returns Returns the sample object ID.
   */
  async add(sample: SampleType, otherInfo: Record<string, string>): Promise<SequelizeResult> {
    let result: Record<string, unknown>;
    try {
      const newSample: SampleType = { ...sample };
      const insertedSample = await SequelizeModel.Sample.create(newSample);
      result = insertedSample.get({ plain: true });
      const newOtherInfo = this._convertOtherInfo(otherInfo, <number>result.id);
      await SequelizeModel.OtherInfo.bulkCreate(newOtherInfo);
      result.otherInfo = newOtherInfo;
    } catch (error) {
      return handleError(error);
    }
    return result;
  }

  /**
   * Returns all samples in database.
   */
  async getAll(): Promise<SequelizeResult[]> {
    let DBResults;
    try {
      DBResults = await SequelizeModel.Sample.findAll({
        include: {
          model: SequelizeModel.OtherInfo,
          as: CONSTS.MODEL.OTHER_INFO.NAME,
        },
      });
    } catch (error) {
      throw error;
    }
    return DBResults.map((e) => e.get({ plain: true }));
  }

  /**
   * Counts how many samples are in the database.
   */
  async count(): Promise<number> {
    return SequelizeModel.Sample.count();
  }

  /**
   * Count how many other info entrances are there.
   */
  async countOtherInfo(): Promise<number> {
    return SequelizeModel.OtherInfo.count();
  }

  /**
   * Deletes the specified entry.
   * @param name Name of the sample to delete.
   */
  async delete(name: string): Promise<boolean> {
    try {
      await SequelizeModel.Sample.destroy({ where: { name } });
    } catch (error) {
      throw error;
    }
    return true;
  }

  /**
   * Empties the specified collection.
   */
  async empty(): Promise<boolean> {
    try {
      await SequelizeModel.OtherInfo.truncate();
      await SequelizeModel.Sample.destroy({
        where: {
          id: { [Op.gte]: 1 },
        },
      });
    } catch (error) {
      throw error;
    }
    return true;
  }

  /**
   * Drops the model.
   */
  async drop(): Promise<boolean> {
    try {
      await SequelizeModel.OtherInfo.drop();
      await SequelizeModel.Sample.drop();
    } catch (error) {
      throw error;
    }
    return true;
  }

  /**
   *
   * PRIVATE METHODS.
   *
   */

  /**
   * Converts other info to the specified format.
   */
  private _convertOtherInfo(otherInfo: Record<string, string>, sampleId: number): DBProperty[] {
    const properties: DBProperty[] = [];
    Object.keys(otherInfo).forEach((key) => {
      properties.push({
        sampleId,
        key,
        value: otherInfo[key],
      });
    });
    return properties;
  }
}
export default new Sequelize();
