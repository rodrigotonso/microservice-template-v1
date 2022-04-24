/**
 * @packageDocumentation
 * @module Controller/Mongo
 * Controls the mongo sample.
 */
import mongoActions from '~/model/actions/mongo';
import { SampleType } from '~/types/Sample';

/**
 * Controller for manage mongo database.
 */
class Mongo {
  /**
   * Adds a Sample to the database.
   * @param sample Sample to be added.
   * @returns Returns the sample object.
   */
  async add(
    sample: SampleType,
    otherInfo: Record<string, string>,
  ): Promise<Record<string, unknown>> {
    return mongoActions.add(sample, otherInfo);
  }

  /**
   * Returns all samples in database.
   */
  async getAll(): Promise<Record<string, unknown>[]> {
    return mongoActions.getAll();
  }

  /**
   * Counts how many samples are in the database.
   */
  async count(): Promise<number> {
    return mongoActions.count();
  }

  /**
   * Count how many other info entrances are there.
   */
  async countOtherInfo(): Promise<number> {
    return mongoActions.countOtherInfo();
  }

  /**
   * Deletes the specified document.
   * @param name Name of the sample to delete.
   */
  async delete(name: string): Promise<boolean> {
    return mongoActions.delete(name);
  }

  /**
   * Empties the specified collection.
   */
  async empty(): Promise<boolean> {
    return mongoActions.empty();
  }

  /**
   * Drops this collection.
   */
  async drop(): Promise<boolean> {
    return mongoActions.drop();
  }
}

export default new Mongo();
