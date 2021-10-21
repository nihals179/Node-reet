const { authJwt } = require("../middlewares");
const controller = require("../Controller/cart.controller");
const multer = require("multer");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/test/cart/user", controller.getUserItems);

	app.put("/api/test/cart");

	app.post("/api/test/cart", controller.addItem);

	app.delete("/api/test/cart", controller.deleteItem);
};
