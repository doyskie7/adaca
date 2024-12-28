import { Router } from "express";
import UserController from "../controllers/user-controller";

const router = Router();
const userHandler = new UserController();

router.post("/user", userHandler.createUser);
router.get("/users", userHandler.getUserList);
router.get("/user/:id", userHandler.getUser);
router.put("/user/:id", userHandler.updateUser);
router.delete("/user/:id", userHandler.deleteUser);
export default router;
