import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
export async function editProfile(req, res) {
  try {
    const token = req.body.jwtToken;
    const name = req.body.name;
    const bio = req.body.bio;
    const avatar = req.body.avatar;
    if (!token) {
      return res.json({ message: "no token", status: "error" });
    }
    try {
      const userEmail = jwt.decode(token).email;
      const userDetails = await userModel.findOne({ email: userEmail });

      const userData = {
        name: userDetails.name,
        bio: userDetails.bio,
        avatar: userDetails.avatar,
        social: userDetails.social[0],
      };
      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      }
      if (name) {
        await userModel
          .updateOne(
            { _id: userDetails._id },
            { $set: { name: name, avatar: avatar, bio: bio } }
          )
          .then((response) => {
            console.log(response);
            return res.json({
              message: "user profile updated",
              status: "success",
            });
          })
          .catch((error) => {
            return res.json({ message: error.message, status: "error" });
          });
      } else {
        return res.json({ message: "user found", status: "success", userData });
      }
    } catch (error) {
      res.json({ message: error.message, status: "error" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
}
export async function editSocials(req, res) {
  try {
    const socials = {
      facebook: req.body.socials.facebook,
      twitter: req.body.socials.twitter,
      instagram: req.body.socials.instagram,
      youtube: req.body.socials.youtube,
      linkedin: req.body.socials.linkedin,
      github: req.body.socials.github,
    };
    const token = req.body.jwtToken;
    if (!token) {
      return res.json({ message: "no token", status: "error" });
    }
    try {
      const userEmail = jwt.decode(token).email;
      const userDetails = await userModel.findOne({ email: userEmail });
      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      }
      if (socials) {
        await userModel
          .updateOne({ _id: userDetails._id }, { $set: { social: socials } })
          .then((response) => {
            console.log(response);
            return res.json({
              message: "user profile updated",
              status: "success",
            });
          })
          .catch((error) => {
            return res.json({ message: error.message, status: "error" });
          });
      }
    } catch (error) {
      return res.json({ message: error.message, status: "error" });
    }
  } catch (error) {
    return res.json({ message: "error.message", status: "error" });
  }
}

export async function editLinks(req, res) {
  try {
    const updatedLinks = req.body.links;
    const token = req.body.userJwt;
    try {
      const userEmail = jwt.decode(token).email;
      const userDetails = await userModel.findOne({ email: userEmail });
      if (!userDetails) {
        return res.json({
          message: "invalid authentication",
          status: "error",
        });
      } else {
        await userModel
          .updateOne({ _id: userDetails._id }, { $set: { link: updatedLinks } })
          .then((response) => {
            return res.json({
              message: "user links updated",
              status: "success",
            });
          })
          .catch((error) => {
            return res.json({ message: error.message, status: "error" });
          });
      }
    } catch {
      (error) => {
        return res.json({ message: error.message, status: "error" });
      };
    }
  } catch (error) {
    return res.json({ message: error.message, status: "error" });
  }
}
