import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.slice(7);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          message: "Invalid token",
        });
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.json({
      message: "Not Authorized",
    });
  }
};

export { protect };
