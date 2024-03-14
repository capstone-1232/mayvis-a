import connectMongoDB from "@/lib/mongodb";
import Status from "@/models/status";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            // Create a new status
            try {
                const { status_name } = req.body;
                const status = await Status.create({ status_name });
                return res.status(201).json({ message: "Status created successfully.", status });
            } catch (error) {
                return res.status(500).json({ message: "Error creating status", error: error.message });
            }

        case 'GET':
            // Fetch all statuses or a specific status by ID
            try {
                const { status_id } = req.query;
                if (status_id) {
                    const status = await Status.findOne({ status_id });
                    if (!status) {
                        return res.status(404).json({ message: "Status not found." });
                    }
                    return res.status(200).json(status);
                } else {
                    const statuses = await Status.find({});
                    return res.status(200).json(statuses);
                }
            } catch (error) {
                return res.status(500).json({ message: "Error fetching statuses", error: error.message });
            }

        case 'PUT':
            // Update a status by status_id
            try {
                const { status_id } = req.query;
                const { status_name } = req.body;
                const status = await Status.findOneAndUpdate({ status_id }, { status_name }, { new: true });
                if (!status) {
                    return res.status(404).json({ message: "Status not found." });
                }
                return res.status(200).json({ message: "Status updated successfully.", status });
            } catch (error) {
                return res.status(500).json({ message: "Error updating status", error: error.message });
            }

        case 'DELETE':
            // Delete a status by status_id
            try {
                const { status_id } = req.query;
                const status = await Status.findOneAndDelete({ status_id });
                if (!status) {
                    return res.status(404).json({ message: "Status not found." });
                }
                return res.status(204).json({ message: "Status deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting status", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
