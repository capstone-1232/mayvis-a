// import connectMongoDB from "@/lib/mongodb";
// import User from "@/models/user";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export default async function handler(req, res) {
//     await connectMongoDB();

//     if (req.method === 'POST') {
//         try {
//             const { email_address, password } = req.body;

//             // Find the user by email
//             const user = await User.findOne({ email_address });
//             if (!user) {
//                 return res.status(404).json({ message: "User not found." });
//             }

//             // Compare the submitted password with the user's hashed password
//             const isMatch = await bcrypt.compare(password, user.password);
//             if (!isMatch) {
//                 return res.status(400).json({ message: "Invalid credentials." });
//             }

//             // Create a token (for example, using JWT)
//             const token = jwt.sign(
//                 { userId: user._id },
//                 process.env.JWT_SECRET, // Make sure to have a JWT_SECRET in your .env
//                 { expiresIn: '1h' }
//             );

//             // Optionally, you might want to omit the password when returning the user object
//             user.password = undefined;

//             // Respond with user data and token
//             return res.status(200).json({
//                 message: "Logged in successfully.",
//                 user,
//                 token
//             });
//         } catch (error) {
//             return res.status(500).json({ message: "Error logging in", error: error.message });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
