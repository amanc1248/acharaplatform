import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const insertOrder = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    city,
    tole,
    shippingPrice,
    length,
    quantity,
    totalPrice,
    productId,
  } = req.body;

  console.log("====================================");
  console.log(
    name,
    phone,
    city,
    tole,
    shippingPrice,
    length,
    quantity,
    totalPrice,
    productId
  );
  console.log("====================================");
  let customerInsert =
    "  SELECT @customerCount:=count(*)+1 as customerId from customer;INSERT INTO CUSTOMER VALUES (@customerCount, ?,?,current_date());";
  let shippingAddressInsert =
    "SELECT @shippingAddressCount:=count(*)+1 as shippingId from shipping_address;INSERT INTO SHIPPING_ADDRESS VALUES(@shippingAddressCount,?,?);";
  let orderInsert =
    "SELECT @orderIdCount:=count(*)+1 as orderId from theorder; set @theOrderId= concat(@orderIdCount,?,@customerCount);INSERT INTO THEORDER VALUES(@theOrderId,current_date(),?,?,?,'0','0','0',?,@shippingAddressCount);";
  let orderThroughInsert =
    "INSERT INTO ORDER_THROUGH VALUES(@theOrderId,@customerCount,?);";
  let selectOrder = "SELECT * FROM THEORDER where idorder=@theOrderId;";

  let sql =
    customerInsert +
    shippingAddressInsert +
    orderInsert +
    orderThroughInsert +
    selectOrder;
  db.query(
    sql,
    [
      name,
      phone,
      city,
      tole,
      `${"p" + productId + "l" + length + totalPrice + "c"}`,
      shippingPrice,
      length,
      quantity,
      totalPrice,
      productId,
    ],
    async (err, result) => {
      if (err) throw err;
      if (result) {
        res.json(result[8][0]);
      }
    }
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  let sql =
    " select * from theorder  join order_through on theorder.idorder=order_through.order_id join customer on customer.customer_id=order_through.customer_id join shipping_address on shipping_address.idshipping_address=theorder.shipping_address_id where idorder=?;";
  db.query(sql, [orderId], async (err, result) => {
    if (err) throw err;

    if (result[0] == null) {
      res.status(401).send({ message: "Order Id did not match" });
    } else {
      res.json(result[0]);
    }
  });
});
export { insertOrder, getOrderById };
