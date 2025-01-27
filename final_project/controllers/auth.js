import user from "../models/user.js";
import { compare_hashed_passwords, hashPassword } from "../utils/hashing.js";
import { createToken } from "../utils/tokens.js";

export async function register(req, res) {
  try {
    console.log("ey");
    const { username, password } = req.body;

    console.log(username);
    // check if the user name found
    const foundUser = await user.findOne({ where: { username } });
    if (foundUser) {
      return res.json({ message: "This user is already registered!" });
    }

    // hashing the password
    const hashedPassword = await hashPassword(password);

    // execute the registration
    const newUser = await user.create({
      username: username,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // check if user registered or not
    const registeredUser = await user.findOne({ where: { username } });
    if (!registeredUser) {
      return res.json({ message: "Invalid Credentials!" });
    }

    // check password matching
    const is_matched = await compare_hashed_passwords(
      password,
      registeredUser.password
    );
    if (!is_matched) {
      return res.json({ message: "Invalid Credentials!" });
    }

    // create token
    const token = createToken(registeredUser.id, username);

    return res.json({ message: "User logged in successfully!", token });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
