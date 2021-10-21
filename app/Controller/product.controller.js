const config = require("../config/auth.config");
const db = require("../models");
const Product = db.product;

exports.addItem = (req, res) => {
	console.log(req.body);
	const newproduct = new Product({
		productname: req.body.productname,
		description: req.body.description,
		productcode: req.body.productcode,
		productprice: req.body.productprice,
		productcolor: req.body.productcolor,
		featuredproduct: req.body.featured,
		bestseller: req.body.bestseller,
		onoffer: req.body.onoffer,
		ondemand: req.body.ondemand,
		category: req.body.productcategory,
		productstock: req.body.productstock,

		// productimage: ,
	});

	newproduct.save((err, product) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (req.files.length) {
			newproduct.productimage = req.files.map(
				(ProductImages) => ProductImages.path
			);
		}
		newproduct.save((err, product) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
		});

		res.status(200).send(product);
	});
};

exports.deleteItem = (req, res) => {
	Product.deleteOne({
		productcode: req.body.productcode,
	}).exec((err, product) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		res.status(200).send("Done");
	});
};

exports.getallItems = (req, res) => {
	Product.find({}).exec((err, product) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		res.status(200).send({ product });
	});
};

exports.getItem = (req, res) => {
	Product.findOne({ productcode: req.query.productcode }).exec(
		(err, product) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			res.status(200).send({ product });
		}
	);
};

exports.updateItem = (req, res) => {
	Product.findOneAndUpdate(
		{ _id: req.body.productId },
		{
			$set: {
				quantity: req.body.quantity,
				productsize: req.body.productsize,
			},
		},
		{ new: true },
		(err, cart) => {
			if (err) {
				console.log(err);

				res.status(500).send({ message: err });
				return;
			}
			res.status(200).send(cart);
		}
	);
};
