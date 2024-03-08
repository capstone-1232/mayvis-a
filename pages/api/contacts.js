import connectMongoDB from "@/lib/mongodb";
import ContactPerson from "@/models/ContactPerson";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const { contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id } = req.body;
                const contactPerson = await ContactPerson.create({ contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id });
                return res.status(201).json({ message: "Contact person created successfully.", contactPerson });
            } catch (error) {
                return res.status(500).json({ message: "Error creating contact person", error: error.message });
            }

        case 'GET':
            try {
                const { id } = req.query;
                if (id) {
                    const contactPerson = await ContactPerson.findById(id).populate('client_id');
                    if (!contactPerson) {
                        return res.status(404).json({ message: "Contact person not found." });
                    }
                    return res.status(200).json(contactPerson);
                } else {
                    const contactPeople = await ContactPerson.find({}).populate('client_id');
                    return res.status(200).json(contactPeople);
                }
            } catch (error) {
                return res.status(500).json({ message: "Error fetching contact people", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedContactPerson = await ContactPerson.findByIdAndDelete(id);
                if (!deletedContactPerson) {
                    return res.status(404).json({ message: "Contact person not found." });
                }
                return res.status(204).json({ message: "Contact person deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting contact person", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const updateData = req.body;
                const updatedContactPerson = await ContactPerson.findByIdAndUpdate(id, updateData, { new: true });
                if (!updatedContactPerson) {
                    return res.status(404).json({ message: "Contact person not found." });
                }
                return res.status(200).json({ message: "Contact person updated successfully.", contactPerson: updatedContactPerson });
            } catch (error) {
                return res.status(500).json({ message: "Error updating contact person", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
