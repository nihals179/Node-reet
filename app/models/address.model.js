const mongoose = require("mongoose");

const Address = mongoose.model(
	"Address",
	new mongoose.Schema({
		username: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		Address1: String,
		Address2: String,
		City: String,
		State: String,
		Pincode: Number,
		Email: String,
		Mobile: String,
	})
);

module.exports = Address;
