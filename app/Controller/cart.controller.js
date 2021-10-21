const config = require("../config/auth.config");
const db = require("../models");
const Cart = db.cart;
const Products = db.product;
var jwt = require("jsonwebtoken");

exports.addItem = async (req, res) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}
	let id = jwt.verify(token, config.secret).id;

	Cart.find({ userId: id, productId: req.body.productId }).exec(
		(err, product) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (product.length == 0) {
				const newCart = new Cart({
					productId: req.body.productId,
					quantity: req.body.quantity,
					productsize: req.body.productsize,
					userId: id,
				});

				newCart.save((err, cart) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					Products.findOne({ _id: req.body.productId }).exec((err, product) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						newCart.productname = product.productname;
						newCart.Productprice = product.productprice;
						newCart.productcode = product.productcode;
						newCart.productImage = product.productimage;

						newCart.save((err, cart) => {
							if (err) {
								res.status(500).send({ message: err });
								return;
							}
							res.status(200).send(cart);
						});
					});
				});
			} else {
				Cart.findOneAndUpdate(
					{ userId: id, productId: req.body.productId },
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
			}
		}
	);
};

exports.deleteItem = (req, res) => {
	Cart.findOneAndDelete({ _id: req.body.id }).exec((err, cart) => {
		if (err) return res.status(401).send({ message: error });
		// deleted at most one tank document
		return res.status(200).send(cart);
	});
};

exports.updateItem = (req, res) => {};

exports.getallItems = (req, res) => {};

exports.getUserItems = (req, res) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}

		Cart.find({ userId: decoded.id }).exec((err, cart) => {
			if (err) {
				res.status(500).send(err);
			}
			return res.status(200).send(cart);
		});
	});
};
