import express from "express";
import upload from "../utils/multer.js";
import {
  getAllProducts,
  getProductById,
  addproduct,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/getAllProducts").get(getAllProducts);
router.route("/:id").get(getProductById);
router.route("/").post(upload.array("image"), addproduct);
export default router;
