// require the Express module
const express = require("express"); // npm install express
const cors = require("cors"); // npm install cors
const studentRoutes = require("./routes");
// creates an instance of an Express server
const app = express();

// Enable CORS so that this can be used from web-apps on other domains.
app.use(cors());
// Allow JSON request bodies for PUT and POST
app.use(express.json());
// Include the routes from our routes.js file.
app.use("/", studentRoutes);

// define the port
const DEFAULT_PORT = 3000;
// Use Heroku's PORT or default to 3000.
const port = process.env.PORT || DEFAULT_PORT;
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
