import asyncHandler from "express-async-handler";
import db from "../config/db.js";

//@desc get store details
//@route GET api/admin/
//@access PRIVATE
const getAdminDetails = asyncHandler(async (req, res) => {
  let totalOrdersRevenue =
    " select count(idorder) as totalOrders, sum(total_price) as totalRevenue from theorder;";
  let totalCustomers =
    " select count(distinct phone) as totalCustomers from customer;";
  let totalTailors = "select count(tailor_id) as totalTailors from tailor;";
  let totalProducts = " select count(idproduct) as totalProducts from product;";

  let sql = totalOrdersRevenue + totalCustomers + totalTailors + totalProducts;

  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({
        totalRevenue: result[0][0]["totalRevenue"],
        totalOrders: result[0][0]["totalOrders"],
        totalCustomers: result[1][0]["totalCustomers"],
        totalTailors: result[2][0]["totalTailors"],
        totalProducts: result[3][0]["totalProducts"],
      });
    }
  });
});

//@desc totalcustomers
//@route GET /api/admin/totalcustomers
//@access PUBLIC
const totalCustomers = asyncHandler(async (req, res) => {
  let sql = " select * from customer;";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      res.json(result);
    }
  });
});

//@desc all tailor details
//@route GET api/admin/
//@access PRIVATE
const getTailorsDetails = asyncHandler(async (req, res) => {
  let finalSql = "select * from tailor;";

  db.query(finalSql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

//@desc all product orders details
//@route GET api/admin/
//@access PRIVATE
const getProductOrderDetails = asyncHandler(async (req, res) => {
  let sql =
    " select * from theorder join order_through on theorder.idorder=order_through.order_id;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

//@desc all product orders details
//@route GET api/admin/
//@access PRIVATE
const getProductsDetails = asyncHandler(async (req, res) => {
  let sql = "select * from product";

  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    }
  });
});

export {
  getAdminDetails,
  totalCustomers,
  getTailorsDetails,
  getProductOrderDetails,
  getProductsDetails,
};
