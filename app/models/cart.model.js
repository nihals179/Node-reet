const mongoose = require("mongoose");

const Cart = mongoose.model(
	"Cart",
	new mongoose.Schema({
		productId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		productname: String,
		Productprice: Number,
		productsize: String,
		productcode: String,
		productImage: Array,
		userId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		quantity: Number,
	})
);

module.exports = Cart;
