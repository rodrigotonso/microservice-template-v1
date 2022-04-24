/**
 * @packageDocumentation
 * @module Errors
 * Extension of the Error class with a code specification.
 */
import stacktrace from 'stack-trace';
import CODES from './codes';

type OtherInfoType = Record<string, unknown>;

const getStack = function getStack(): string {
  const err = new Error();
  const trace = stacktrace.parse(err);
  let tmpFuncion;
  let tmpName;
  let tmpCol;
  let tmpRow;
  let tmpLocation;

  const arrTrace = trace.map((e) => {
    tmpFuncion = e.getMethodName() || e.getFunctionName() || 'Anonymous Function | Promise';
    tmpName = e.getFileName() || '';
    tmpRow = e.getLineNumber() || '';
    tmpCol = e.getColumnNumber() || '';
    tmpLocation = `${tmpRow}:${tmpCol}`;
    return `${tmpFuncion} (${tmpName} ${tmpLocation})`;
  });
  return arrTrace.join('\r\n at ');
};

/**
 * Error with code. Extended from class Error.
 */
class CodedError extends Error {
  /**
   * Error code.
   */
  code = '';

  /**
   * Error message.
   */
  message = '';

  /**
   * Replaces to insert in the final message.
   */
  replaces: string[] = [];

  /**
   * Additional information for the error.
   */
  otherInformation: OtherInfoType = {};

  /**
   * Error stack trace.
   */
  trace: string | undefined = '';

  /**
   * Constructs a new error.
   * @param code Code for the error.
   * @param replaces Array containing the different replaces for the "?" symbols.
   * @param otherInfo Object containing other relevant info.
   */
  constructor(
    code: keyof typeof CODES,
    replaces: (string | number)[] = [],
    otherInfo: OtherInfoType = {},
  ) {
    super(code);
    this.code = code;
    const finalReplaces = replaces.map((e) => e.toString());
    this.replaces = finalReplaces;
    this.otherInformation = otherInfo;
    this.trace = getStack();
    this.message = '';
  }

  /**
   * Creates a coded Error from an error. Tries to figure out if it has a code in the message or something.
   * @param error Error to create the error from.
   */
  static fromError(error: Error | CodedError): CodedError {
    const codedError = error as CodedError;
    if (codedError) {
      return codedError;
    }

    const possibleCodes = Object.keys(CODES);
    if (!possibleCodes.includes(error.message)) {
      return new CodedError('NOT_DEFINED', [], { originalError: error });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new CodedError(<any>error.message, [], { originalError: error });
  }

  /**
   * Returns if the errors is a coded error or not.
   * @param error Thing to check if is a coded error or not.
   */
  static isCodedError(error: Error | CodedError): boolean {
    const codedError = error as CodedError;
    if (!codedError) {
      return false;
    }
    return false;
  }
}

export { CodedError, CODES };
