import JWT from "jsonwebtoken";
export const isLoggedIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRETKEY
    );
    console.log(decode);
    req.user_id = decode.user_id;
    next();
  } catch (error) {
    res.status(401).send("Token Denied");
    console.log(error);
    res.status(401).send("Something Went Wrong");
  }
};
