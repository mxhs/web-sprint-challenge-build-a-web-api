// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const data = await Projects.get();
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {});
