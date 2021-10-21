const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Username
	User.findOne({
		username: req.params.username,
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			console.log("Hello " + req.params.username);
			return;
		}

		if (user) {
			res.status(400).send({ message: "Failed! Username is already in use!" });
			return;
		}

		// Email
		User.findOne({
			email: req.params.email,
		}).exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (user) {
				res.status(400).send({ message: "Failed! Email is already in use!" });
				return;
			}

			next();
		});
	});
};

checkRolesExisted = (req, res, next) => {
	if (req.params.roles) {
		for (let i = 0; i < req.params.roles.length; i++) {
			if (!ROLES.includes(req.params.roles[i])) {
				res.status(400).send({
					message: `Failed! Role ${req.params.roles[i]} does not exist!`,
				});
				return;
			}
		}
	}

	next();
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail,
	checkRolesExisted,
};

module.exports = verifySignUp;
