// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();
module.exports = router;

const { validateActionId } = require("../middleware/middleware");

router.get("/", async (req, res, next) => {
	try {
		const data = await Actions.get();
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", validateActionId, (req, res) => {
	res.status(200).json(req.action);
	// Actions.get(req.params.id)
	// 	.then((data) => {
	// 		res.json(data);
	// 	})
	// 	.catch((err) => {
	// 		next(err);
	// 	});
});

router.post("/", (req, res) => {});
