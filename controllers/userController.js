const User = require("../models/User");
const Image = require("../models/Image");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const user = await User.findOne({ username }).select("-password").lean();

  if (!user) return res.status(400).json({ message: "No user found." });

  res.json(user);
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const isDuplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (isDuplicate) return res.status(409).json({ message: "Duplicate user." });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPassword });
  if (user)
    return res.status(201).json({ message: `User ${username} created.` });
  else return res.status(400).json({ message: "Invalid user data received." });
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "User ID Required." });

  const user = await User.findOne(id).exec();

  if (!user) return res.status(400).json({ message: "User not found." });

  const result = await user.deleteOne();

  res.json(`User ${result.username} with ID ${result._id} deleted.`);
};

const updateUser = async (req, res) => {
    const {id, username, password} = req.body;
    if(!username || !id)
    return res.status(400).json({message:'All fields except password are required.'})

const user = await User.findOne(id).exec()
if(!user)
return res.status(400).json({message:'User not found.'})


};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
