import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//compass connection code
// mongoose
//   .connect("mongodb+srv://hrp_vadodara:harshpatel153@cluster0.cjmgrqu.mongodb.net/?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

process.env.URI = "mongodb+srv://hrp_vadodara:harshpatel153@cluster0.cjmgrqu.mongodb.net/?retryWrites=true&w=majority";

const url = process.env.URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
