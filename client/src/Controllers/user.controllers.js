import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Token from "../Models/token.js"
import User from "../Models/user.js";

export const loginUser = async (request, response) => {
    let { username, password } = request.body;
  let user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({ message: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    } else {
      response.status(400).json({ message: "Password does not match" });
    }
  } catch (error) {
    response.status(500).json({ message: "error while login the user" });
  }
};
