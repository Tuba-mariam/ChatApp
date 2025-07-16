import * as bcrypt from 'bcrypt';

const createPasswordHash = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export default createPasswordHash;
