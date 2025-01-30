import token from "../Models/token.js";


export const createNewToken = async (request, response) => {
  const refreshToken = request.body.token.split(" ")[1];

  if (!refreshToken) {
    return response.status(401).json({ msg: "Refresh token is missing" });
  }

  const token = await token.findOne({ token: refreshToken });

  if (!token) {
    return response.status(404).json({ msg: "Refresh token is not valid" });
  }

  jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
    if (error) {
      response.status(500).json({ msg: "invalid refresh token" });
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });

    return response.status(200).json({ accessToken: accessToken });
  });
};