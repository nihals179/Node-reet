const { authJwt } = require("../middlewares");
const controller = require("../Controller/user.controller");
const Productcontroller = require("../Controller/product.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/test/all", Productcontroller.getallItems);

	app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

	app.get(
		"/api/test/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		controller.moderatorBoard
	);

	app.get(
		"/api/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
	);
};
