import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});
export async function register(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const handle = req.body.handle;
    const defaultLink = { url: "google.com", title: "google.com" };
    const defaultSocialLinks = {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      github: "",
    };
    if (await userModel.findOne({ email: email })) {
      return res.json({
        message: "email already present",
        status: "error",
      });
    } else {
      try {
        if (await userModel.findOne({ handle: handle })) {
          return res.json({
            message: "handle already present",
            status: "error",
          });
        }
      } catch (error) {
        console.log(error);
      }
      if (email && password && handle) {
        try {
          bcrypt.hash(password, 8, async function (err, hashedPassword) {
            const user = await userModel.create({
              email: email,
              password: hashedPassword,
              handle: handle,
              link: [defaultLink],
              social: [defaultSocialLinks],
              themes: [
                {
                  id: 1,
                  name: "default",
                  colors: ["#1d1d1d", "#1d1d1d", "#cccccc"],
                },
                {
                  id: 2,
                  name: "theme1",
                  colors: ["#2c3e50", "#f0f0f0", "#1abc9c"],
                },
              ],
              currentTheme: {
                id: 1,
                name: "default",
                colors: ["#1d1d1d", "#1d1d1d", "#cccccc"],
              },
            });
            const token = jwt.sign({ email: email }, "SECRET_KEY");
            return res.json({
              message: "user created",
              status: "success",
              token: token,
              id: user._id,
            });
          });
        } catch (error) {
          return res.json({
            message: error.message,
            status: "error",
          });
        }
      }
    }
  } catch (error) {
    return res.json({
      message: error.message,
      status: "error",
    });
  }
}
export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "user not found! Please register.",
        status: "error",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (user && result) {
        try {
          const token = jwt.sign({ email: email }, "SECRET_KEY");

          return res.json({
            message: "user logged-in",
            status: "success",
            token: token,
            id: user._id,
          });
        } catch (error) {
          return res.json({ message: error.message, status: "error" });
        }
      } else {
        return res.json({ message: "invalid credentials", status: "error" });
      }
    });
  } catch (error) {
    return res.json({ message: error.message, status: "error" });
  }
}
