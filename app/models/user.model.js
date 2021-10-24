const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		username: String,
		Name: String,
		email: String,
		password: String,
		mobile: Number,
		refferingcode: String,
		referredcode: String,
		referpoints: Number,
		roles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Role",
			},
		],
	})
);

module.exports = User;
