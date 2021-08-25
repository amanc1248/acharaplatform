import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import { uploads } from "../utils/cloudinary.js";
import fs from "fs";
//@desc fetch all products
//@route GET /api/products
//@access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
  console.log("i Ran");
  let sql = "SELECT * FROM PRODUCT;";

  db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.json(result);
  });
});

//@desc fetch single products
//@route GET /api/products/:id
//@access PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let sql =
    " select * from product join product_images on product.idproduct=product_images.product_id where idproduct=?;";
  db.query(sql, [id, id], (err, result) => {
    if (err) throw err;
    if (result) {
      res.json(result);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  });
});

const addproduct = asyncHandler(async (req, res) => {
  let urls = [];
  var image1;
  var image2;
  var image3;
  var image4;
  var image5;
  var image6;
  var image7;
  const {
    productId,
    name,
    inStock,
    dateTime,
    price,
    desc,
    clothDesc,
    style,
    design,
  } = req.body;
  console.log("====================================");
  console.log(
    productId,
    name,
    inStock,
    dateTime,
    price,
    desc,
    clothDesc,
    style,
    design
  );
  console.log("====================================");
  let sql = "INSERT INTO PRODUCT VALUES(?)";

  const uploader = async (path) => await uploads(path, "DASA");
  if (req.method === "POST") {
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
      const path = files[i].path;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    try {
      image1 = urls[0].url;
      image2 = urls[1].url;
      image3 = urls[2].url;
      image4 = urls[3].url;
      image5 = urls[4].url;
      image6 = urls[5].url;
      image7 = urls[6].url;
    } catch (error) {
      console.log(error);
    }
    // res.status(200).json({
    //   message: "Images uploaded successfully",
    //   data: urls.url,
    // });
    insertProductDetails(
      sql,
      [
        productId,
        name,
        inStock,
        dateTime,
        price,
        desc,
        clothDesc,
        style,
        design,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
      ],
      (error, result) => {
        if (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        } else {
          res.send("Image uploaded successfully");
        }
      }
    );
  } else {
    res.status(405).json({
      message: "Could not upload the images",
    });
  }

  // db.query(
  //   sql,
  //   [
  //     [
  // productId,
  // name,
  // inStock,
  // dateTime,
  // price,
  // desc,
  // clothDesc,
  // style,
  // design,
  // image1,
  // image2,
  // image3,
  // image4,
  //     ],
  //   ],
  //   (error, results) => {
  //     if (error) {
  //       return res.json({ message: error });
  //     }
  //     res.json({ message: "Product inserted" });
  //   }
  // );
});

const insertProductDetails = (sql, values, callback) => {
  db.query(sql, [values], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};
export { getAllProducts, getProductById, addproduct };
