const { Router } = require("express");

const {
  getRoles_CT,
  getRole_CT,
  postRole_CT,
  putRole_CT,
  deleteRole_CT,
} = require("../controllers/roles.ctrl");

const router = Router();

router.get("/", getRoles_CT);
router.get("/:id", getRole_CT);
router.post("/", postRole_CT);
router.put("/:id", putRole_CT);
router.delete("/:id", deleteRole_CT);

module.exports = router;
