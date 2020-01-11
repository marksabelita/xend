// import * as Express from "express";
// const router = Express.Router();



// router.get("/users", userController.index.bind(userController));
// // router.get("/users/:id", UserController.findById);
// // router.post("/users", UserController.create);

// export default router;



import * as Express from "express";
import { UserController } from "./controllers/UserController";
const router = Express.Router();
const userController = new UserController();
// import UserController from "./controllers/users.controller";

router.get("/users", userController.index.bind(userController));

export default router;