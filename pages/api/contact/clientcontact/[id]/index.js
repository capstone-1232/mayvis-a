import connectMongoDB from "@/lib/mongodb";
import Contact from "@/models/contact";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const contact = await Contact.find({ client_id: id });
                return res.status(200).json(contact);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching contacts", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
