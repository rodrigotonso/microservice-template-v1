/* eslint-disable no-await-in-loop */
/**
 * Testing sequelize controller.
 */

import sequelize from '../../../src/model/db/sequelize';
import data from '../data';
import sequelizeSample from '../../../src/controller/sequelize';

/**
 * Adds the data to the database.
 */
const addData = async function addData(): Promise<boolean> {
  try {
    for (let i = 0; i < data.length; i += 1) {
      await sequelizeSample.add(data[i].sample, data[i].otherInfo);
    }
  } catch (error) {
    throw error;
  }
  return true;
};

/**
 * Initializes the data in the database.
 */
const initializeData = async function initializeData(): Promise<boolean> {
  try {
    await sequelizeSample.empty();
    await addData();
  } catch (error) {
    throw error;
  }
  return true;
};

/**
 * Counts the "otherInfo" entries.
 */
const countOtherInfo = function countOtherInfo(): number {
  let result = 0;
  data.forEach((entry) => {
    result += Object.keys(entry.otherInfo).length;
  });
  return result;
};

describe('Testing sequelize controller', () => {
  beforeAll(async () => sequelize.sync());
  beforeEach(async () => sequelizeSample.empty());
  afterAll(async () => sequelizeSample.drop());

  test('Adding, counting and emptying with sequelize (sequelizeSample.add, .empty and .count and .countOtherInfo)', async () => {
    let countEntries = await sequelizeSample.count();
    expect(countEntries).toBe(0);
    await addData();
    countEntries = await sequelizeSample.count();
    expect(countEntries).toBe(data.length);
    countEntries = await sequelizeSample.countOtherInfo();
    expect(countEntries).toBe(countOtherInfo());
    await sequelizeSample.empty();
    countEntries = await sequelizeSample.countOtherInfo();
    expect(countEntries).toBe(0);
  });

  test('Getting values from sequelize (sequelizeSample.getAll)', async () => {
    await initializeData();
    const DBSamples = await sequelizeSample.getAll();
    const samplesNames = data.map((e) => e.sample.name);
    const dbNames = DBSamples.map((e) => e.name);
    expect(dbNames.sort()).toEqual(samplesNames.sort());
  });

  test('Deleting values from sequelize (sequelizeSample.delete)', async () => {
    await initializeData();
    const initialCount = data.length;
    let tmpCount: number;
    let tmpSampleCount: number;
    for (let i = 0; i < data.length; i += 1) {
      await sequelizeSample.delete(data[i].sample.name);
      tmpCount = initialCount - i - 1;
      tmpSampleCount = await sequelizeSample.count();
      expect(tmpSampleCount).toBe(tmpCount);
    }
    tmpSampleCount = await sequelizeSample.count();
    expect(tmpSampleCount).toBe(0);
    const otherInfoCount = await sequelizeSample.countOtherInfo();
    expect(otherInfoCount).toBe(0);
  });
});
