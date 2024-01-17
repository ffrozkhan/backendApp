import { mydb } from "../config/db.js";

export const getUserTasksController = (req, res) => {
  try {
    mydb.query(
      `SELECT * from tasks WHERE taskuser_id = ?`,
      req.user_id,
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send("Something Went Wrong");
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  } catch (error) {
    console.log(req.query.user_id);
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong`,
      error,
    });
  }
};
