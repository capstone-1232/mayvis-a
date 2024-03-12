import connectMongoDB from "@/lib/mongodb";
import Contact from "@/models/contact";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const contact = await Contact.find({ _id: id });
                return res.status(200).json(contact);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching contacts", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const { contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id } = req.body;
                const updatedContact = await Contact.findByIdAndUpdate(id, { contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id }, { new: true });
                if (!updatedContact) {
                    return res.status(404).json({ message: "Contact not found." });
                }
                return res.status(200).json({ message: "Contact updated successfully.", contact: updatedContact });
            } catch (error) {
                return res.status(500).json({ message: "Error updating contact", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
