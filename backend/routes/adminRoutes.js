import express from "express";
import {
  getAdminDetails,
  getProductOrderDetails,
  getProductsDetails,
  getTailorsDetails,
  totalCustomers,
} from "../controllers/adminControllers.js";
const router = express.Router();

router.route("/dashboard").get(getAdminDetails);
router.route("/allCustomers").get(totalCustomers);
router.route("/allTailors").get(getTailorsDetails);
router.route("/allOrders").get(getProductOrderDetails);
router.route("/allProducts").get(getProductsDetails);

export default router;
