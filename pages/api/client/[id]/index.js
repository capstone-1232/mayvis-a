import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const client = await Client.find({ _id: id });
                return res.status(200).json(client);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching clients", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const { client_name } = req.body;
                const updatedClient = await Client.findByIdAndUpdate(id, { client_name }, { new: true });
                if (!updatedClient) {
                    return res.status(404).json({ message: "Client not found." });
                }
                return res.status(200).json({ message: "Client updated successfully.", client: updatedClient });
            } catch (error) {
                return res.status(500).json({ message: "Error updating client", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
