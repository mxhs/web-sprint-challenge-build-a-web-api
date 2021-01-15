const express = require("express");
const helmet = require("helmet");
const server = express();

const ActionsRouter = require("./actions/actions-router");
const ProjectsRouter = require("./projects/projects-router");
const { logger } = require("./middleware/middleware");

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/actions", ActionsRouter);
server.use("/api/projects", ProjectsRouter);

server.get("/", (req, res) => {
	res.status(200).json({
		api: "up",
		environment: process.env.NODE_ENV,
	});
});

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
