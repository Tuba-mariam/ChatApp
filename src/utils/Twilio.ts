import twilio from 'twilio';
import config from '../Config/config';

const sendOTP = async (to: string, otp: string) => {
  console.log('Sending OTP:', otp);

  const client = twilio(config.accountSid, config.authToken);

  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: config.phoneNumber,
    to,
  });
};

export default sendOTP;
