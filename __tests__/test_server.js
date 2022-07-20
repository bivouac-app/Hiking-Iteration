const express = require("express");
const userRoute = require("../server/routes/userRoute");
const hikeRoute = require("../server/routes/hikeRoute");

function createServer() {
	const app = express()
	app.use(express.json())
	app.use("/api", routes)
	return app
}

module.exports = createServer