import db from "../config/db.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
async function MatchPassword(enteredPassword, dbPassword) {
  const isValid = await bcrypt.compare(enteredPassword, dbPassword);
  if (isValid) {
    return true;
  } else {
    return false;
  }
}
//@desc register customer
//@route GET /api/customer/registercustomer
//@access PUBLIC
const registerCustomer = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  let sql =
    "select * from customer where email=?; SELECT @customerCount:=count(*)+1 as customerId from customer; INSERT INTO CUSTOMER VALUES (@customerCount,?,?,?,?,?,current_date()); select * from customer where email=?";

  const hashedPassword = await bcrypt.hash(password, 8);
  db.query(
    sql,
    [email, first_name, last_name, email, phone, hashedPassword, email],
    (err, result) => {
      if (err) throw err;
      if (result[0][0] != null) {
        res.status(401).send({ message: "Customer already exist" });
      } else {
        res.json(result[3][0]);
      }
    }
  );
});

//@desc login customer
//@route GET /api/customer/login
//@access PUBLIC
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let sql = "select * from customer where email=?; ";

  // const hashedPassword = await bcrypt.hash(password, 8);
  db.query(sql, [email], async (err, result) => {
    if (err) throw err;
    if (result[0] != null) {
      if (await MatchPassword(password, result[0]["password"])) {
        res.json(result[0]);
      } else {
        res.status(401).send({ message: "password does not match" });
      }
    } else {
      res.status(401).send({ message: "Customer does not exist" });
    }
  });
});

export { registerCustomer, loginCustomer };
