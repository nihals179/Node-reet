const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);

var corsOptions = {
	origin: "http://localhost:3000",
};

const db = require("./app/models");
const Role = db.role;
const Category = db.categories;

db.mongoose
	.connect(
		`mongodb+srv://PdfDict:lnMOy7I2dXy7ekdl@cluster0.bgebs.mongodb.net/Reet?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		}
	)
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		initial();
	})
	.catch((err) => {
		console.error("Connection error", err);
		process.exit();
	});

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "user",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: "moderator",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: "admin",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/payment.routes")(app);

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to application." });
});

app.use(cors());
app.use(express.static("public"));
app.use("/public", express.static("public"));
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
