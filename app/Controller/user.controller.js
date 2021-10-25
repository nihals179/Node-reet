const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Coupon = db.coupon;

exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};

exports.refer = (req, res) => {
	// let token = req.headers["x-access-token"];
	// if (!token) {
	// 	return res.status(403).send({ message: "No token provided!" });
	// }
	// let id = jwt.verify(token, config.secret).id;

	User.find({
		_id: "6140b19283b1a148f85ced33",
		referredcode: req.query.refercode,
	}).exec((err, user) => {
		console.log(user);
		if (err) {
			res.status(404).send(err);
			return;
		}

		if (user.length == 0) {
			User.findOneAndUpdate(
				{ refferingcode: req.query.refercode },
				{
					$inc: {
						referpoints: 100,
					},
				},
				{ new: false },
				(err, refer) => {
					if (err) {
						console.log(err);
						return;
					}
				}
			);
			User.findOneAndUpdate(
				{ _id: "6140b19283b1a148f85ced33" },
				{
					$set: {
						referredcode: req.query.refercode,
					},
				},
				{ new: false },
				(err, refer) => {
					if (err) {
						console.log(err);

						res.status(500).send({ message: err });
						return;
					}
					res.status(200).send(refer);
				}
			);
		} else {
			res.status(200).send("User Already Has Reffered Code");
		}
	});
};

exports.redeem = (req, res) => {
	Coupon.find({ couponcode: req.query.coupon }).exec((err, coupon) => {
		if (err) {
			res.status(200).send(err);
		}

		User.find({
			_id: "6140b19283b1a148f85ced33",
			couponapplied: req.query.coupon,
		}).exec((err, user) => {
			if (err) {
				res.status(200).send(err);
			}

			if (user.length == 0) {
				User.findOneAndUpdate(
					{ _id: "6140b19283b1a148f85ced33" },
					{
						$inc: {
							referpoints: coupon[0].couponamount,
						},
						$push: {
							couponapplied: req.query.coupon,
						},
					},
					{ new: false },
					(err, user) => {
						if (err) {
							console.log(err);
							res.status(500).send({ message: err });
							return;
						}
						res.status(200).send(user);
					}
				);
			} else {
				res.status(200).send("Coupon already applied");
			}
		});
	});
};
