const mongoose = require("mongoose");

const coupon = mongoose.model(
	"coupon",
	new mongoose.Schema({
		couponcode: String,
		couponamount: Number,
		couponexpiry: Date,
	})
);

module.exports = coupon;
