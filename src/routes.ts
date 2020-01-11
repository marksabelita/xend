import * as Express from "express";
import { UserController } from "./controllers/UserController";
import { OrganizationController } from "./controllers/OrganizationController";
import { CommentController } from "./controllers/CommentController";

const router = Express.Router();
const userController = new UserController();
const organizationController = new OrganizationController();
const commentController = new CommentController();


router.get("/users", userController.index.bind(userController));
router.post("/users", userController.store.bind(userController));

router.get("/organizations", organizationController.index.bind(organizationController));
router.post("/organizations", organizationController.store.bind(organizationController));

router.get("/comments", commentController.index.bind(commentController));
router.post("/comments", commentController.store.bind(commentController));


export default router;