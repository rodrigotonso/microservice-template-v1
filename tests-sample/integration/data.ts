/**
 * TEST DATA.
 * Data that will be used to test sample apps.
 * It's generated automatically.
 */

// eslint-disable-next-line no-console
console.log = jest.fn;

export type SampleType = {
  name: string;
  age: number;
  someText: string;
};

export type OtherInfo = Record<string, string>;

export type Data = {
  sample: SampleType;
  otherInfo: OtherInfo;
};

/**
 * Gets a random number.
 * @param min Min number.
 * @param max Max number.
 */
const getRandomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

/**
 * Gets a random text.
 * @param charsCount How many characters will the text have.
 */
const getRandomText = function getRandomText(charsCount: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQTUVWXYZ0123456789 ';
  const charsLength = chars.length;
  let finalText = '';
  let nextLetter = '';
  for (let i = 0; i < charsCount; i += 1) {
    nextLetter = chars.charAt(getRandomNumber(0, charsLength));
    finalText += nextLetter;
  }
  return finalText;
};

/**
 * Generates a sample.
 * @param number Number of sample to be generated.
 */
const generateNewSample = function generateNewSample(number: number): SampleType {
  return {
    name: `Sample ${number}`,
    age: number * 2,
    someText: getRandomText(250),
  };
};

/**
 * Generates other info.
 */
const generateOtherInfo = function generateOtherInfo(): OtherInfo {
  const otherInfoCount = getRandomNumber(1, 5);
  const result: OtherInfo = {};
  let tmpKey: string;
  for (let i = 0; i < otherInfoCount; i += 1) {
    tmpKey = getRandomText(50);
    result[tmpKey] = getRandomText(getRandomNumber(50, 200));
  }
  return result;
};

/**
 * Generates data.
 * @param count How many data samples you will need.
 */
const generateData = function generateData(count: number): Data[] {
  const data: Data[] = [];
  let tmpData: Data;
  for (let i = 0; i < count; i += 1) {
    tmpData = {
      sample: generateNewSample(i),
      otherInfo: generateOtherInfo(),
    };
    data.push(tmpData);
  }
  return data;
};

const data: Data[] = generateData(30);

export { data };

export default data;
