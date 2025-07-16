import dotenv from 'dotenv';
import IConfig from '../interfaces/Config.interface';

dotenv.config();

const config : IConfig = {
  port: Number(process.env.PORT) || 4000,
  mongoDbUrl: process.env.MONGO_DB_URL || '',
   jwtSecret: process.env.JWT_SECRET || '',
 accountSid : process.env.TWILIO_ACCOUNT_SID!,
  authToken : process.env.TWILIO_AUTH_TOKEN!,
 phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
 
};

export default config;
