import connectMongoDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';
import BlacklistedToken from "@/models/blacklisted-token";

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'POST') {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided." });
        }

        // Optionally verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Add the token to the blacklist
            await BlacklistedToken.create({ token, expiresAt: decoded.exp });

            res.status(200).json({ message: "Logged out successfully." });
        } catch (error) {
            return res.status(500).json({ message: "Error logging out", error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
