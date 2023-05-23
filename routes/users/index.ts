import { Router } from "express";
import { registerUser, subscribeUser, addUser, updateUser, deleteUser, getUsers, loginUser, getSubscribers } from "../../controllers/users";

const router = Router();

router.post("/subscribe/:email", subscribeUser);
router.get("/subscribers", getSubscribers);
router.post("/login", loginUser)
router.post("/register", registerUser);
router.post("/add-user", addUser);
router.get("/get-users", getUsers);
router.patch("/update-user", updateUser);
router.delete("/delete-user", deleteUser);

export default router;