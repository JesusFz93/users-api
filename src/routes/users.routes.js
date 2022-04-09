const { Router } = require("express");

const {
  getUsers_CT,
  getUser_CT,
  postUser_CT,
  putUser_CT,
  deleteUser_CT,
} = require("../controllers/users.ctrl");

const router = Router();

router.get("/", getUsers_CT);
router.get("/:id", getUser_CT);
router.post("/", postUser_CT);
router.put("/:id", putUser_CT);
router.delete("/:id", deleteUser_CT);

module.exports = router;
