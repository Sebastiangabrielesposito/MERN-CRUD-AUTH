import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../utils.js";

export async function register(req, res) {
  try {
    const { email, password, username } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The mail is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: passwordHash,
      email,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      token
    });
  } catch (error) {
    console.log(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credential" });
    
    const token = await createAccessToken({ id: userFound._id });

    // req.user = userFound
   

    res.cookie("token", token)
    , {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    }
    // console.log(res.get("Set-Cookie"));
    // res.setHeader('Authorization', `Bearer ${token}`)
    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      token
    });
  } catch (error) {
    console.log(error);
  }
}

export async function logout(req, res) {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}

export async function profile(req, res) {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });
 
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  res.send("profile");
}

export const verifyToken = async (req, res) => {
  
  // const { token } = req.headers.authorization;
  const authorizationHeader = req.headers.authorization;
  const jwtToken = authorizationHeader.replace('Bearer ', '');
  
  
  if (!jwtToken) return res.status(401).json({ message: "Unauthorized100" });
  
  
  jwt.verify(jwtToken, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized2" });
    
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized3" });
    
    return res.json({
      id: userFound.id,
      username: userFound.username,
      password: userFound.email,
    });
  });
};
