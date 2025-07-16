import * as bcrypt from 'bcrypt';

const matchPassword = async (plainPass: string, hashPass: string): Promise<boolean> => {
  return await bcrypt.compare(plainPass, hashPass);
};

export default matchPassword;
