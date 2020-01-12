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

router.get("/comments", commentController.index.bind(commentController));
router.delete("/comments/organization/:organizationId", commentController.deleteCommentsByOrganizationId.bind(commentController));
router.post("/comments", commentController.store.bind(commentController));

router.get("/organizations", organizationController.index.bind(organizationController));
router.post("/organizations", organizationController.store.bind(organizationController));
router.post("/organization/join/:id", organizationController.join.bind(organizationController));
router.get("/organization/:organizationId/comments", organizationController.getCommentsByOrganizationId.bind(organizationController));
router.get("/organization/:organizationId/users", organizationController.getUserByOrganizationId.bind(organizationController));

export default router;