interface IConfig {
  port: number;
  mongoDbUrl: string;
  jwtSecret: string;
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

export default IConfig;
