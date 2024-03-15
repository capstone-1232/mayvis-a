import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const { client_name, is_active, description } = req.body;
                const client = await Client.create({ client_name, is_active, description });
                return res.status(201).json({ message: "Client created successfully.", client });
            } catch (error) {
                return res.status(500).json({ message: "Error creating client", error: error.message });
            }

        case 'GET':
            try {
                const clients = await Client.find({});
                return res.status(200).json(clients);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching clients", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedClient = await Client.findByIdAndDelete(id);
                if (!deletedClient) {
                    return res.status(404).json({ message: "Client not found." });
                }
                return res.status(204).json({ message: "Client deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting client", error: error.message });
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
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
