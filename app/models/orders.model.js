const mongoose = require("mongoose");

const Orders = mongoose.model(
	"Orders",
	new mongoose.Schema({
		productname: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		username: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		price: String,
		address1: String,
		address2: String,
		mobile: String,
		pin: String,
		landmark: String,
		city: String,
		state: String,
	})
);

module.exports = Orders;
