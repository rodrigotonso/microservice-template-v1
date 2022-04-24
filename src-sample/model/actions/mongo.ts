/**
 * @packageDocumentation
 * @module Model/Actions/Mongo
 * Interacts with sample mongoose model.
 */
import mongoose from 'mongoose';
import MODELS from '~/constants/model';

import handleError from '~/model/handleError';
import MongoModel from '~/model/orm/MongoSample';
import { SampleType, PropertyType } from '~/types/Sample';

type MongoSampleType = SampleType & {
  _id?: mongoose.Types.ObjectId;
  otherInfo?: mongoose.Types.ObjectId;
};

type MongoOtherInfoType = {
  _id: mongoose.Types.ObjectId;
  sample: mongoose.Types.ObjectId;
  properties: PropertyType[];
};

type MongoResult = Record<string, unknown>;

/**
 * Actions on the mongo database model.
 */
class Mongo {
  /**
   * Adds a Sample to the database.
   * @param sample Sample to be added.
   */
  async add(sample: SampleType, otherInfo: Record<string, string>): Promise<MongoResult> {
    const sampleData: MongoSampleType = { ...sample };
    sampleData._id = new mongoose.Types.ObjectId();
    let result: Record<string, unknown>;

    try {
      const addedOtherInfo = await this._addOtherInfo(sampleData._id, otherInfo);
      sampleData.otherInfo = <mongoose.Types.ObjectId>addedOtherInfo._id;
      const newSample = new MongoModel.Sample(sampleData);
      await newSample.save();
      result = newSample.toObject();
      result.otherInfo = addedOtherInfo;
    } catch (error) {
      return handleError(error);
    }
    return result;
  }

  /**
   * Returns all samples in database.
   */
  async getAll(): Promise<MongoResult[]> {
    return MongoModel.Sample.find().populate('otherInfo').lean();
  }

  /**
   * Counts how many samples are in the database.
   */
  async count(): Promise<number> {
    return MongoModel.Sample.countDocuments({});
  }

  /**
   * Count how many other info entrances are there.
   */
  async countOtherInfo(): Promise<number> {
    return MongoModel.OtherInfo.countDocuments({});
  }

  /**
   * Deletes the specified document.
   * @param name Name of the sample to delete.
   */
  async delete(name: string): Promise<boolean> {
    let deletion;
    try {
      const deletedSample = await MongoModel.Sample.findOneAndDelete({ name });
      if (!deletedSample) {
        return false;
      }
      const sampleID = deletedSample._id;
      deletion = await MongoModel.OtherInfo.deleteMany({ sample: sampleID });
    } catch (error) {
      return handleError(error);
    }
    const deletedCount = deletion.deletedCount || 0;
    return deletedCount > 0;
  }

  /**
   * Empties the specified collection.
   */
  async empty(): Promise<boolean> {
    try {
      await MongoModel.Sample.deleteMany({});
      await MongoModel.OtherInfo.deleteMany({});
    } catch (error) {
      throw error;
    }
    return true;
  }

  /**
   * Drops the collection (use with care!!).
   */
  async drop(): Promise<boolean> {
    try {
      await mongoose.connection.dropCollection(MODELS.SAMPLE.DB_TABLE_OR_COLLECTION);
      await mongoose.connection.dropCollection(MODELS.OTHER_INFO.DB_TABLE_OR_COLLECTION);
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
   * Add properties to a sample.
   * @returns Returns the OtherInfo ID.
   */
  private async _addOtherInfo(
    sampleId: mongoose.Types.ObjectId,
    otherInfo: Record<string, string>,
  ): Promise<MongoResult> {
    const addProperties: PropertyType[] = [];
    Object.keys(otherInfo).forEach((key) => {
      addProperties.push({
        key,
        value: otherInfo[key],
      });
    });
    const otherInfoData: MongoOtherInfoType = {
      _id: new mongoose.Types.ObjectId(),
      sample: sampleId,
      properties: addProperties,
    };

    let result: MongoResult;
    try {
      const newOtherInfo = new MongoModel.OtherInfo(otherInfoData);
      await newOtherInfo.save();
      result = newOtherInfo.toObject();
    } catch (error) {
      return handleError(error);
    }
    return result;
  }
}

export default new Mongo();
