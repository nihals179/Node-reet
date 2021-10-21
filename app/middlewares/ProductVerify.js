const db = require("../models");
const fs = require("fs");
const Product = db.product;

checkDuplicateProduct = (req, res, next) => {
	Product.findOne({
		productcode: req.body.productcode,
	}).exec((err, product) => {
		if (err) {
			res.status(500).send({ message: err });
			for (var i = 0; i < req.files.length; i++) {
				fs.unlink(req.files[i].path, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}

			return;
		}
		if (product) {
			res.status(500).send({ message: "Product Already Exists" });
			for (var i = 0; i < req.files.length; i++) {
				fs.unlink(req.files[i].path, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			return;
		}

		next();
	});
};

const ProductVerification = {
	checkDuplicateProduct,
};

module.exports = ProductVerification;
