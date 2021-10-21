const { authJwt } = require("../middlewares");
const controller = require("../Controller/product.controller");
const { ProductVerification } = require("../middlewares");
const multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

var upload = multer({ storage: storage });

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/test/product", controller.getItem);

	app.put("/api/test/product", controller.getItem);

	app.post(
		"/api/test/product",
		upload.array("images"),
		ProductVerification.checkDuplicateProduct,
		controller.addItem
	);

	app.delete("/api/test/product", controller.deleteItem);
};
