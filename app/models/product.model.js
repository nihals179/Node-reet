const mongoose = require("mongoose");

const Product = mongoose.model(
	"Product",
	new mongoose.Schema({
		productname: String,
		description: String,
		productcode: String,
		category: String,
		productprice: Number,
		bestseller: Boolean,
		ondemand: Boolean,
		featuredproduct: Boolean,
		onoffer: Boolean,
		productcolor: String,
		productstock: Number,
		productimage: Array,
	})
);

module.exports = Product;
