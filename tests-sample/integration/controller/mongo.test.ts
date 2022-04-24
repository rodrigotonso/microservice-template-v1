/* eslint-disable no-await-in-loop */
/**
 * Testing mongo controller.
 */
import CONFIG from '../../../src/config';
import mongoose from '../../../src/model/db/mongoose';
import mongoSample from '../../../src/controller/mongo';
import data from '../data';

jest.setTimeout(30000);

/**
 * Adds the data to the database.
 */
const addData = async function addData(): Promise<boolean> {
  try {
    for (let i = 0; i < data.length; i += 1) {
      await mongoSample.add(data[i].sample, data[i].otherInfo);
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
    await mongoSample.empty();
    await addData();
  } catch (error) {
    throw error;
  }
  return true;
};

describe('Testing mongo controller', () => {
  beforeAll(async () =>
    mongoose.connect(CONFIG.DB.MONGO.URL, CONFIG.DB.MONGO.USER, CONFIG.DB.MONGO.PASSWORD),
  );
  beforeEach(async () => mongoSample.empty());
  afterAll(async () => {
    await mongoSample.drop();
    await mongoose.close();
  });

  test('Adding, counting and emptying with mongoose (mongoSample.add, .empty and .count and .countOtherInfo)', async () => {
    let countEntries = await mongoSample.count();
    expect(countEntries).toBe(0);
    await addData();
    countEntries = await mongoSample.count();
    expect(countEntries).toBe(data.length);
    countEntries = await mongoSample.count();
    expect(countEntries).toBe(data.length);
    await mongoSample.empty();
    countEntries = await mongoSample.count();
    expect(countEntries).toBe(0);
  });

  test('Getting values from mongoose (mongoSample.getAll)', async () => {
    await initializeData();
    const DBSamples = await mongoSample.getAll();
    const samplesNames = data.map((e) => e.sample.name);
    const dbNames = DBSamples.map((e) => e.name);
    expect(dbNames.sort()).toEqual(samplesNames.sort());
  });

  test('Deleting values from mongoose (mongoSample.delete)', async () => {
    await initializeData();
    const initialCount = data.length;
    let tmpCount: number;
    let tmpSampleCount: number;
    for (let i = 0; i < data.length; i += 1) {
      await mongoSample.delete(data[i].sample.name);
      tmpCount = initialCount - i - 1;
      tmpSampleCount = await mongoSample.count();
      expect(tmpSampleCount).toBe(tmpCount);
    }
    const tmpOtherInfoCount = await mongoSample.countOtherInfo();
    tmpSampleCount = await mongoSample.count();
    expect(tmpSampleCount).toBe(0);
    expect(tmpOtherInfoCount).toBe(0);
  });
});
