import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({success: true, data:{
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    }});
  } catch (error) {
    console.error({success: false, data: error});
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json({success: true, data: users});
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json({success: true, data: user});
};
