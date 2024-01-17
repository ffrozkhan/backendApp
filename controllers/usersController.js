import { mydb } from "../config/db.js";
import { hashUserPassword } from "../utils/authHelpers.js";
export const searchUsersController = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      res.status(401).send({
        success: false,
        message: `Provide Search Value`,
      });
    }
    mydb.query(
      `SELECT * FROM users WHERE user_name LIKE ?`,
      `%${search}%`,
      (error, result) => {
        if (error) {
          res.status(401).send({
            success: false,
            message: `No Users Found`,
            error,
          });
        } else {
          const response = Array.from(result).map((item) => {
            delete item.user_password;
            return item;
          });
          res.status(200).send({
            success: true,
            message: `Users Fetched Successfully`,
            data: response,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfoController = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).send({
        success: false,
        message: `Error Fetching User Details`,
      });
    }
    mydb.query(`SELECT * from users WHERE user_id = ?`, id, (error, result) => {
      if (error) {
        res.status(401).send({
          success: false,
          message: `Error Fetching User Details`,
        });
      } else {
        console.log("-------->", result);
        delete result[0].user_password;
        res.status(200).send({
          success: true,
          message: "User Details Fetched",
          data: result[0],
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Fetching User Details`,
    });
  }
};

export const deleteUserController = (req, res) => {
  try {
    const { id } = req.params;
    mydb.query(`DELETE FROM users WHERE user_id = ?`, id, (error, result) => {
      if (error) {
        res.status(401).send({
          success: false,
          message: `Error Deleting User`,
          error,
        });
      } else {
        res.status(200).send({
          success: true,
          message: `User Deleted Successfully`,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Deleting User`,
      error,
    });
  }
};

export const createUserController = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_password,
      user_phone,
      user_address,
      user_role,
    } = req.body;
    if (!user_name) {
      return res
        .status(401)
        .send({ success: false, message: `Name is Required` });
    }
    if (!user_email) {
      return res
        .status(401)
        .send({ success: false, message: `Email is Required` });
    }
    if (!user_password) {
      return res
        .status(401)
        .send({ success: false, message: `Password is Required` });
    }
    if (!user_phone) {
      return res
        .status(401)
        .send({ success: false, message: `Phone is Required` });
    }
    if (!user_address) {
      return res
        .status(401)
        .send({ success: false, message: `Address is Required` });
    }
    if (user_role == undefined) {
      return res
        .status(401)
        .send({ success: false, message: `Role is Required` });
    }
    mydb.query(
      "SELECT * from users WHERE user_email = ?",
      user_email,
      async (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: `Something Went Wrong`,
            error,
          });
        } else {
          const userExists = Array.from(result);
          if (userExists.length != 0) {
            res.status(401).send({
              success: false,
              message: `Email is Already Registered`,
            });
          } else {
            const hashedPassword = await hashUserPassword(user_password);
            console.log(hashedPassword);
            const insertUserQuery = `INSERT INTO users (user_name, user_email, user_password, user_phone, user_address, user_role)
             values(?, ?, ?, ?, ?, ?)`;
            mydb.query(
              insertUserQuery,
              [
                user_name,
                user_email,
                hashedPassword,
                user_phone,
                user_address,
                user_role,
              ],
              (error, result) => {
                if (error) {
                  res.status(500).send({
                    success: false,
                    message: `Something Went Wrong`,
                    error,
                  });
                } else {
                  console.log(result);
                  res.status(201).send({
                    success: true,
                    message: `User Registered Successfully`,
                    data: {
                      user_name,
                      user_email,
                      user_phone,
                      user_address,
                      user_role,
                      user_id: result.insertId,
                    },
                  });
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error Registering User`,
      error,
    });
  }
};
