/**
 * @packageDocumentation
 * @module Model/Database
 * 	Abstraction layer to get mongoose connection.
 */

import mongoose from 'mongoose';

/**
 * Abstraction layer on mongoose.
 */
class Mongo {
  /**
   * 	Connects to mongoose.
   * @param url URL to mongodb database.
   */
  async connect(url: string, user: string, password: string): Promise<boolean> {
    // eslint-disable-next-line no-console
    const logError = (message: string) => console.error(message);

    // eslint-disable-next-line no-console
    const log = (message: string) => console.log(message);

    const mongooseConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, // <- Even if it's not recommended for production, it's responsability of the app to index the model.
      autoCreate: true,
      useCreateIndex: true,
      poolSize: 5,
      heartbeatFrequencyMS: 10000,
      auth: {
        user,
        password,
      },
    };

    return new Promise((resolve, reject) => {
      try {
        mongoose.connection.on('connected', () => resolve(true));
        mongoose.connection.on('connecting', () => log('MongoDB connecting...'));
        mongoose.connection.on('open', () => log('MongoDB connected...'));
        mongoose.connection.on('reconnecting', () => log('MongoDB reconnecting...'));
        mongoose.connection.on('reconnected', () => log('MongoDB reconnected...'));
        mongoose.connection.on('error', (err) => logError(err.message));
        mongoose.connection.on('disconnected', () => logError('MongoDB disconnected...'));
        mongoose.connect(url, mongooseConfig, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 	Gets mongoose object.
   */
  getMongoose(): typeof mongoose {
    return mongoose;
  }

  /**
   * 	Gets Mongoose DB.
   */
  getDB(): typeof mongoose.connection.db {
    if (mongoose.STATES[mongoose.connection.readyState] !== 'connected') {
      throw new Error("MongoDB isn't connected.");
    }
    return mongoose.connection.db;
  }

  /**
   * Closes the DB.
   */
  async close(): Promise<boolean> {
    if (mongoose.STATES[mongoose.connection.readyState] === 'disconnected') {
      return true;
    }

    try {
      await mongoose.connection.close();
    } catch (error) {
      throw error;
    }
    return true;
  }
}

export default new Mongo();
