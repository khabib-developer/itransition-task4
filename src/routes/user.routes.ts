import { Router } from "express";
import { check } from "express-validator";
import userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("name", "Incorrect name").isString(),
    check("password", "Incorrect password").isString(),
  ],
  userController.register
);

router.post(
  "/login",
  [
    check("email", "Incorrect username").isString(),
    check("password", "Incorrect password").isString(),
  ],
  userController.login
);

router.get("/get", authMiddleware, userController.getUsers);

router.post("/update", authMiddleware, userController.updateUsers);

router.post("/delete", authMiddleware, userController.deleteUsers);

router.get("/check", authMiddleware, userController.check);

export default router;
