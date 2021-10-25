const controller = require("../Controller/payment.controller");
const express = require("express");
const qs = require("querystring");
const checksum_lib = require("../config/checksum");
const config = require("../config/paytm.config");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.use(
		express.urlencoded({
			extended: false,
		})
	);

	app.post("/api/auth/hi", controller.getmoney);

	app.post("api/test/callback", (req, res) => {
		var body = "";

		req.on("data", function (data) {
			body += data;
		});

		req.on("end", function () {
			var html = "";
			var post_data = qs.parse(body);

			// received params in callback
			console.log("Callback Response: ", post_data, "\n");

			// verify the checksum
			var checksumhash = post_data.CHECKSUMHASH;
			// delete post_data.CHECKSUMHASH;
			var result = checksum_lib.verifychecksum(
				post_data,
				config.PaytmConfig.key,
				checksumhash
			);
			console.log("Checksum Result => ", result, "\n");

			// Send Server-to-Server request to verify Order Status
			var params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };

			checksum_lib.genchecksum(
				params,
				config.PaytmConfig.key,
				function (err, checksum) {
					params.CHECKSUMHASH = checksum;
					post_data = "JsonData=" + JSON.stringify(params);

					var options = {
						hostname: "securegw-stage.paytm.in", // for staging
						// hostname: 'securegw.paytm.in', // for production
						port: 443,
						path: "/merchant-status/getTxnStatus",
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							"Content-Length": post_data.length,
						},
					};

					// Set up the request
					var response = "";
					var post_req = https.request(options, function (post_res) {
						post_res.on("data", function (chunk) {
							response += chunk;
						});

						post_res.on("end", function () {
							console.log("S2S Response: ", response, "\n");

							var _result = JSON.parse(response);
							if (_result.STATUS == "TXN_SUCCESS") {
								res.send("payment sucess");
							} else {
								res.send("payment failed");
							}
						});
					});

					// post the data
					post_req.write(post_data);
					post_req.end();
				}
			);
		});
	});
};
