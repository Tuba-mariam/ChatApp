// src/utils/twilioClient.ts
import twilio from 'twilio';
import config from '../config/config';

const sendOTP = async (to: string, otp: string) => {
  console.log(otp);
  const client = twilio(config.accountSid, config.authToken);
  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: config.phoneNumber,
    to,
  });
};
export default sendOTP;
