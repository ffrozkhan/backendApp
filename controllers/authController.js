import { mydb } from "../config/db.js";
import { compareHashedPassword } from "../utils/authHelpers.js";
import JWT from "jsonwebtoken";

export const loginController = (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    if (!user_email) {
      res.status(401).send({
        success: false,
        message: `Email is Required`,
      });
    }
    if (!user_password) {
      res.status(401).send({
        success: false,
        message: `Password is Required`,
      });
    }
    mydb.query(
      "SELECT * FROM users WHERE user_email = ?",
      user_email,
      async (error, result) => {
        if (error) {
          res.status(401).send({
            success: false,
            message: `Something Went Wrong`,
          });
        } else {
          if (result.length != 0) {
            const matchPassword = await compareHashedPassword(
              user_password,
              result[0].user_password
            );
            if (matchPassword) {
              const token = JWT.sign(
                { user_id: result[0].user_id },
                process.env.JWT_SECRETKEY,
                {
                  expiresIn: "1d",
                }
              );
              console.log(token);
              res.status(200).send({ ...result[0], token });
            } else {
              res.status(401).send("Invalid Credentials");
            }
          } else {
            res.status(401).send("Email is not registered");
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error While Login`,
      error,
    });
  }
};
