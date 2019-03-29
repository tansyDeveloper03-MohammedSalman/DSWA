const User = require("./routes/user");
const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const app = express();
const profile = require("./routes/profile");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

config["jwtPrivateKey"] = "mySecureKey";

if (!config.get("jwtPrivateKey")) {
  // dswa_jwtPrivateKey = "mySecureKey";
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
} else {
}

app.use(express.json());

mongoose
  .connect(
    "mongodb://usr_admin_read_write_devDSWA.clsdevdswa-shard-00-02-xn0wu.mongodb.net:27017,clsdevdswa-shard-00-01-xn0wu.mongodb.net:27017,clsdevdswa-shard-00-00-xn0wu.mongodb.net:27017/dbDevDSWA?ssl=true&replicaSet=clsDevDSWA-shard-0&authSource=admin&retryWrites=true",
    {
      auth: {
        user: "usr_admin_read_write_devDSWA",
        password: "shankerTansy01#"
      }
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err));

// mongoose
//   .connect("mongodb://localhost/ArunDB")
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err => console.error("Could not connect to MongoDB..."));
// export dswa_jwtPrivateKey=mySecureKey

app.use("/api/dswa", User);
// app.use("/feeds", feed);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
// const hostname = "127.0.0.1";
// app.listen(port, hostname, () =>
//   console.log(`Listening on port ${hostname}:${port}...`)
// );
app.listen(port, () => console.log(`Listening on port ${port}...`));
