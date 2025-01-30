export const loginUser = async (request, response) => {
    
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
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
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};
