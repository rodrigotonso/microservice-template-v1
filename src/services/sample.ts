/**
 * @packageDocumentation
 * @module Services/Sample
 * Interacts with some service.
 */

import axios from 'axios';

import axiosHelper from './axiosHelper';

// TODO: You will want to personalize this with your API KEY and URL from env vars.
/**
 * API Client to interact with the service.
 */
const APIClient = axios.create({
  baseURL: 'https...URL', // CONFIG.SERVICES.SOME_SERVICE.URL
  timeout: 10000,
  headers: {
    'X-API-KEY': 'SOME API KEY', // CONFIG.SERVICES.SOME_SERVICE.API_KEY
  },
});

/**
 * Interacts with the Sample Service.
 */
class SampleService {
  /**
   * Gets something.
   */
  async getSomething(): Promise<string | false> {
    const url = '/something';
    let result;
    try {
      const response = await APIClient.get(url);
      result = axiosHelper.handleResponse(url, response);
    } catch (error) {
      result = axiosHelper.handleError(url, error);
    }
    if (!result.success) {
      return false;
    }
    return result.payload;
  }

  /**
   * Post something.
   */
  async postSomething(something: string): Promise<string | false> {
    const url = '/something';
    let result;
    try {
      const response = await APIClient.post(url, { something });
      result = axiosHelper.handleResponse(url, response);
    } catch (error) {
      result = axiosHelper.handleError(url, error);
    }
    if (!result.success) {
      return false;
    }
    return result.payload;
  }
}

export default new SampleService();
