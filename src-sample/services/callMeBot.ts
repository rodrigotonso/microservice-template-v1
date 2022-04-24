/**
 * @packageDocumentation
 * @module Services/callMeBot
 * This service lest you interact with CallMeBot.
 * https://www.callmebot.com/
 */

import axios from 'axios';
import urlencode from 'urlencode';

const APIClient = axios.create({
  baseURL: 'https://api.callmebot.com/whatsapp.php?',
  timeout: 1000,
});

/**
 * Lest you send some message to a whatsapp number with CallMeBot.
 */
class CallMeBotApi {
  private _number = '';

  private _apiKey = '';

  private _destinationSet = false;

  /**
   * Return the destination phone number.
   * Returns false if it's not set.
   */
  getDestination(): string | boolean {
    if (!this._destinationSet) {
      return false;
    }
    return this._number;
  }

  /**
   * Lets you send messages via CallMeBot.
   * @param number Whatsapp number that will receive the message.
   * @param apiKey API key needed to perform the action.
   */
  setDestination(phoneNumber: string, apiKey: string): boolean {
    this._number = phoneNumber;
    this._apiKey = apiKey;
    this._destinationSet = true;
    return true;
  }

  /**
   * Sends a message to the number.
   * @param message Message to be sent.
   */
  async send(message: string): Promise<boolean> {
    if (!this._destinationSet) {
      throw new Error('CallMeBot destination is not set.');
    }
    const text = urlencode(message);
    const url = `phone=${this._number}&apikey=${this._apiKey}&text=${text}`;
    return APIClient.get(url);
  }
}

export default new CallMeBotApi();
