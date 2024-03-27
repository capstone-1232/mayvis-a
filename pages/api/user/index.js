import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";


export default async function handler(req, res) {
    await connectMongoDB();
    // // Retrieve the API key from the request headers
    // const apiKey = req.headers['x-api-key'];

    // // Compare it to the environment variable value
    // if (apiKey !== process.env.DATA_API_KEY) {
    //     return res.status(401).json({ message: 'Invalid API key' });
    // }

    switch (req.method) {
        case 'POST':
            const { email_address, firstname, lastname, password, type } = req.body;
            // console.log(type);
            try {
                if (type == "Log In") {
                    if (!email_address || !password) {
                        return res.status(400).json({ message: 'email_address and password are required' });
                    }
                    console.log(email_address);
                    const user = await User.findOne({ email_address });
                    console.log(user);
                    if (!user) {
                        return res.status(401).json({ message: 'Authentication failed' });
                    }

                    const isMatch = password == user.password;
                    console.log(isMatch);
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Authentication failed' });
                    }

                    return res.status(200).json(user);

                } else {
                    // const { email_address, firstname, lastname, password } = req.body;
                    const user = await User.create({ email_address, firstname, lastname, password });
                    return res.status(201).json({ message: "User added successfully.", user });
                }
            } catch (error) {
                return res.status(500).json({ message: "Internal server error", error: error.message });
            }

        case 'GET':
            try {
                const { id } = req.query;
                if (id) {
                    const user = await User.findOne({_id:id});
                    return res.status(200).json(user);
                }
                const users = await User.find({});
                return res.status(200).json(users);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching users", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedUser = await User.findByIdAndDelete(id);
                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found." });
                }
                return res.status(204).json({ message: "User deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting user", error: error.message });
            }

        case 'PUT':
            try {
                // Extract fields from request body
                const { id, updateFields } = req.body;
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: id },
                    updateFields,
                    { new: true, runValidators: true });

                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found." });
                }

                return res.status(200).json({ message: "User updated successfully.", user: updatedUser });
            } catch (error) {
                return res.status(500).json({ message: "Error updating user", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break; // Good practice to have it even if it's the default case
    }
}
