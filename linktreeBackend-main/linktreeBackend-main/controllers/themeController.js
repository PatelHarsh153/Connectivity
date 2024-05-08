import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
export async function getThemes(req, res) {
  try {
    const userJwt = req.body.jwt;

    if (userJwt) {
      const userEmail = jwt.decode(userJwt).email;
      const user = await userModel.findOne({ email: userEmail });
      const userThemes = {
        currentTheme: user.currentTheme,
        themes: user.themes,
      };
      return res.json({
        message: "User Details fetched!",
        status: "success",
        userThemes,
      });
    } else {
      return res.json({
        message: "token not received!",
        status: "error",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
      status: "error",
    });
  }
}
export async function changeThemes(req, res) {
  try {
    const userJwt = req.body.jwtToken;
    const theme = req.body.theme;
    if (userJwt) {
      const userEmail = jwt.decode(userJwt).email;
      const userDetails = await userModel.findOne({ email: userEmail });
      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      }

      await userModel
        .updateOne({ _id: userDetails._id }, { $set: { currentTheme: theme } })
        .then((response) => {
          if (response.acknowledged == true) {
            return res.json({
              message: "new theme applied",
              status: "success",
            });
          }
        })
        .catch((error) => {
          return res.json({ message: error.message, status: "error" });
        });
    }
  } catch (error) {
    return res.json({
      message: error.message,
      status: "error",
    });
  }
}
export async function addTheme(req, res) {
  try {
    const userJwt = req.body.userJwtToken;
    const newPallet = req.body.newPallet;
    if (userJwt) {
      const userEmail = jwt.decode(userJwt).email;
      const userDetails = await userModel.findOne({ email: userEmail });

      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      }

      await userModel
        .findByIdAndUpdate(userDetails._id, {
          $push: { themes: newPallet },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } catch (error) {
    return res.json({
      message: error.message,
      status: "error",
    });
  }
}
export async function deleteTheme(req, res) {
  try {
    const userJwt = req.body.userJwtToken;
    const id = req.body.id;
    if (userJwt) {
      const userEmail = jwt.decode(userJwt).email;
      const userDetails = await userModel.findOne({ email: userEmail });

      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      }

      await userModel
        .updateOne({ _id: userDetails._id }, { $pull: { themes: { _id: id } } })
        .then((response) => {
          if (response.acknowledged == true) {
            return res.json({
              message: "Theme deleted",
              status: "success",
            });
          }
        });
    }
  } catch (error) {
    return res.json({
      message: error.message,
      status: "error",
    });
  }
}
