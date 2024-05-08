import userModels from "../models/userModels.js";
import jwt from "jsonwebtoken";
export async function linktreeController(req, res) {
  try {
    const userJwt = req.headers.jwttoken;
    const userEmail = jwt.decode(userJwt)?.email;
    const userHandle = req.params["linktree"];
    const user = await userModels.findOne({ handle: userHandle });
    if (user.email != userEmail) {
      await userModels.updateOne(
        { _id: user._id },
        { $inc: { linkTreeViews: 0.5 } }
      );
    }

    if (user) {
      const userData = {
        name: user.name,
        handle: user.handle,
        bio: user.bio,
        avatar: user.avatar,
        link: user.link,
        social: user.social,
        linkTreeViews: user.linkTreeViews,
        themes: user.themes,
        currentTheme: user.currentTheme,
      };
      res.json({ message: "userFound", status: "success", userData });
    } else {
      res.json({ message: "noUserFound", status: "error" });
    }
  } catch (error) {
    res.json({ message: error.message, status: "error" });
  }
}
