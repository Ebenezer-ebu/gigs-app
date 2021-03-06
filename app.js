const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require("path");

// Database
const db = require("./config/database");

// Test DB Connection
db.authenticate()
  .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));
  
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Set Statuc folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("index", {layout: "landing"}));

// Gig routes
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
