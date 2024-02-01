import { envConfig } from 'src/configs/database';
import * as bcrypt from 'bcrypt';

export const hashString = (
  string: string,
  saltRounds = +envConfig.SALT_ROUNDS,
): string => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(string, salt);
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => {  
  return bcrypt.compareSync(password, hashedPassword);
};
