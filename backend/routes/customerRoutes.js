import express from "express";
import {
  loginCustomer,
  registerCustomer,
} from "../controllers/customerControllers.js";
const router = express.Router();

router.route("/registerCustomer").post(registerCustomer);
router.route("/loginCustomer").post(loginCustomer);
export default router;
