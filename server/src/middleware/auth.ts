import User from '../models/User';

export default async function auth(req, res, next) {

  // **manualId is used for route testing
  if (req.header('manualId')){
    const user = await User.findById(req.header('manualId'));
    req.user = user;
    console.log(req.user);
    next();
  } else if (req.user?.token){
    const token = req.user.token;

    console.log("Token there ", token);
    next();
  } else {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};