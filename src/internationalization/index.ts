/**
 * @packageDocumentation
 * @module Internationalization
 * This script has all the possible texts for internationalization.
 */
import { Request } from 'express';
import { isString, isObject, get } from 'lodash';

import { CodedError } from '~/errors';
import resources from './resources';

/**
 * Lets you select the description for the specified language.
 */
class Internationalization {
  private _defaultLanguage = 'es';

  /**
   * Sets the default language.
   * @param language Language used.
   */
  setDefaultLanguage(language: string): boolean {
    this._defaultLanguage = language;
    return true;
  }

  /**
   * Gets the language from the request.
   * @param req Request object from Express.
   */
  getLangFromRequest(req: Request): string {
    if (!isObject(req.headers)) {
      return this._defaultLanguage;
    }
    const header: string = req.headers['accept-language'] || '';
    const arrHeader = header.split(/(-|_)/);
    const lang = arrHeader.shift() || '';
    if (lang.trim() === '') {
      return this._defaultLanguage;
    }
    return lang;
  }

  /**
   * Gets the text with the key specifeid (for example: "error.hello.").
   * It looks for it in the specified language.
   * @param routeKey Key to look for.
   * @param lang Language, the default is "es".
   */
  get(routeKey: string, lang?: string): string {
    let finalLang: string = this._defaultLanguage;
    if (isString(lang)) {
      finalLang = lang;
    }
    if (!Object.keys(resources).includes(finalLang)) {
      finalLang = this._defaultLanguage;
    }
    const search = `${finalLang}.${routeKey}`;
    const arrSearch = search.split('.');
    return get(resources, arrSearch, '');
  }

  /**
   * Gets the text with the key specifeid (for example: "error.hello.") and execute replace for each word in the array words.
   * It looks for it in the specified language.
   * The sentence "Hi ?, ? years old" with ['Matias', '22'] becomes "Hi Matias, 22 years old".
   * @param routeKey Key to look for.
   * @param replacements Replacements to do in the string.
   * @param lang Language, the default is "es".
   */
  getAndReplace(routeKey: string, replacements: string[], lang?: string): string {
    let text = this.get(routeKey, lang);
    replacements.forEach((replacement) => {
      text = text.replace('?', replacement);
    });
    return text;
  }

  /**
   * Gets the error description.
   * @param req Request object from Express.
   * @param error Error to get the description from.
   */
  getErrorDescription(req: Request, error: CodedError): string {
    const lang = this.getLangFromRequest(req);
    let replaces: string[] = [];
    if (Array.isArray(error.replaces)) {
      replaces = error.replaces;
    }
    let finalText = this.get(`Error.${error.code}`, lang);
    if (finalText === '') {
      return error.message || '';
    }
    replaces.forEach((replace) => {
      finalText = finalText.replace('?', replace);
    });
    return finalText;
  }
}

export default new Internationalization();
