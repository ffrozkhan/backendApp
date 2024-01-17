import mysql from "mysql";

export const mydb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "todolist",
});
