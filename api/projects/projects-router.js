// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
module.exports = router;

const {
	validateProjectId,
	validateNewProject,
} = require("../middleware/middleware");

router.get("/", async (req, res, next) => {
	try {
		const data = await Projects.get();
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", validateProjectId, async (req, res) => {
	res.status(200).json(req.project);
});

router.post("/", validateNewProject, async (req, res, next) => {
	try {
		const data = await Projects.insert(req.body);
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

// ! Try this one with try catch too
router.put("/:id", validateProjectId, (req, res) => {
	Projects.update(req.params.id, req.body)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "Could not update the project" });
		});
});

router.delete("/:id", validateProjectId, (req, res) => {
	Projects.remove(req.params.id).then(() => {
		res
			.status(200)
			.json({ message: `Project with id ${req.params.id} has been removed` });
	});
});

router.get("/:id/actions", validateProjectId, (req, res) => {
	res.status(200).json(req.project.actions);
});
