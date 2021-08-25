// Create connection
import express from "express";
import mysql from "mysql";

//create connection
// const db = mysql.createConnection({
//   host: "us-cdbr-east-04.cleardb.com",
//   user: "b702487e444bfb",
//   password: "483da5ae",
//   database: "heroku_47127d54d2fe52b",
//   multipleStatements: true,
// });
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dasa",
  multipleStatements: true,
});
// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});
export default db;
