import bcrypt from "bcrypt";

export const hashUserPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const compareHashedPassword = async (password, userHashedPassword) => {
  const status = await bcrypt.compare(password, userHashedPassword);
  return status;
};
