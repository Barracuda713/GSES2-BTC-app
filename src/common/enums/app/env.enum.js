import dotenv from 'dotenv';

dotenv.config();

const {
  APP_PORT,
  CMC_API_KEY
} = process.env;

const ENV = {
  APP: {
    API_PATH: '/api',
    PORT: APP_PORT
  },
  API: {
    CMC_KEY: CMC_API_KEY
  }
};

export { ENV };
