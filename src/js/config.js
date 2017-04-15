import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.resolve('./');
const TOKEN_DIR = path.join(ROOT_DIR, '.credentials');
const TOKEN_PATH = path.join(TOKEN_DIR, 'token_path.json');

export default class Config {
  static read(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, content) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }

  static getApplicationConfig() {
    return this.read(path.join(ROOT_DIR, 'application_config.json'));
  }

  static getClientConfig() {
    return this.read(path.join(ROOT_DIR, 'client_config.json'));
  }

  static getToken() {
    return this.read(TOKEN_PATH);
  }

  static setToken(token) {
    return new Promise((resolve, reject) => {
      try {
        fs.mkdirSync(TOKEN_DIR);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          reject(err);
        }
      }
      const tokenObj = {
        'access_token': token
      };
      fs.writeFile(TOKEN_PATH, JSON.stringify(tokenObj), err => reject(err));
      console.log(`Token stored to ${TOKEN_PATH}`);
      resolve(token);
    });
  }
}
