const PORT = require("../../index");
const Actions = require("../actions/actions-model");

module.exports = { logger, validateActionId, validateNewAction };

function logger(req, res, next) {
	// do your magic!
	const { method, baseUrl, url } = req;
	console.log("\n  **Logger**    \n");
	console.log("REQ METHOD: ", method);
	console.log("REQ URL: ", `http://localhost:${PORT}`, baseUrl, url);
	console.log("REQ TIME: ", new Date());
	console.log("\n    ****    \n");
	next();
}

async function validateActionId(req, res, next) {
	try {
		const action = await Actions.get(req.params.id);
		if (action) {
			req.action = action;
			next();
		} else {
			res.status(404).json(`post with id ${req.params.id} is not found`);
		}
	} catch (error) {
		res.status(500).json("Whats a better message to put here?");
	}
}

function validateNewAction(req, res, next) {}
