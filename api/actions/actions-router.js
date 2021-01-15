// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();
module.exports = router;

const {
	validateActionId,
	validateNewAction,
} = require("../middleware/middleware");

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

// ? ?? How Can I check to see if an project already exists or not? ??

router.post("/", validateNewAction, async (req, res, next) => {
	try {
		const data = await Actions.insert(req.body);
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

router.put("/:id", validateActionId, (req, res) => {
	Actions.update(req.params.id, req.body)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "Could not update the action" });
		});
});

router.delete("/:id", validateActionId, (req, res) => {
	Actions.remove(req.params.id).then(() => {
		res
			.status(200)
			.json({ message: `Action with id ${req.params.id} has been removed` });
	});
});
