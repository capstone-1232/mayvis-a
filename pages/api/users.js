// import connectMongoDB from "@/lib/mongodb";
// import User from "@/models/user";
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//     await connectMongoDB();

//     switch (req.method) {
//         case 'POST':
//             // Register a new user
//             try {
//                 const { email_address, firstname, lastname, password } = req.body;
                
//                 // Check if user already exists
//                 const existingUser = await User.findOne({ email_address });
//                 if (existingUser) {
//                     return res.status(400).json({ message: "User already exists." });
//                 }

//                 // Hash password
//                 const hashedPassword = await bcrypt.hash(password, 10);

//                 const user = await User.create({
//                   email_address,
//                   firstname,
//                   lastname,
//                   password: hashedPassword
//                 });

//                 // Ideally, you'd want to omit the password when returning the user object
//                 user.password = undefined;

//                 return res.status(201).json({ message: "User registered successfully.", user });
//             } catch (error) {
//                 return res.status(500).json({ message: "Error registering user", error: error.message });
//             }

//         case 'GET':
//             // Fetch all users
//             try {
//                 const users = await User.find({}, '-password');
//                 return res.status(200).json(users);
//             } catch (error) {
//                 return res.status(500).json({ message: "Error fetching users", error: error.message });
//             }

//         default:
//             res.setHeader('Allow', ['POST', 'GET']);
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
