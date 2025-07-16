import mongoose from 'mongoose';
import config from './config';


export const connectDb = async (): Promise<void> => {
  await mongoose
    .connect(config.mongoDbUrl)
    .then(() => {
      console.log('DB connected successfully');
    })
    .catch(error => console.log(error));
    
};
