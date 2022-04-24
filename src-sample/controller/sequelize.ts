/**
 * @packageDocumentation
 * @module Controller/Sequelize
 * Controls the sequelize sample.
 */
import sequelizeActions from '~/model/actions/sequelize';
import { SampleType } from '~/types/Sample';

/**
 * Controller to manage sequelize database.
 */
class Sequelize {
  /**
   * Adds a Sample to the database.
   * @param sample Sample to be added.
   * @returns Returns the sample object.
   */
  async add(
    sample: SampleType,
    otherInfo: Record<string, string>,
  ): Promise<Record<string, unknown>> {
    return sequelizeActions.add(sample, otherInfo);
  }

  /**
   * Returns all samples in database.
   */
  async getAll(): Promise<Record<string, unknown>[]> {
    return sequelizeActions.getAll();
  }

  /**
   * Counts how many samples are in the database.
   */
  async count(): Promise<number> {
    return sequelizeActions.count();
  }

  /**
   * Count how many other info entrances are there.
   */
  async countOtherInfo(): Promise<number> {
    return sequelizeActions.countOtherInfo();
  }

  /**
   * Deletes the specified document.
   * @param name Name of the sample to delete.
   */
  async delete(name: string): Promise<boolean> {
    return sequelizeActions.delete(name);
  }

  /**
   * Empties the specified model.
   */
  async empty(): Promise<boolean> {
    return sequelizeActions.empty();
  }

  /**
   * Drops the model.
   */
  async drop(): Promise<boolean> {
    return sequelizeActions.drop();
  }
}

export default new Sequelize();
