import connectMongoDB from "@/lib/mongodb";
import Contact from "@/models/contact";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const { contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id } = req.body;
                const contact = await Contact.create({ contact_firstname, contact_lastname, is_active, is_primary, contact_department, contact_role, client_id });
                return res.status(201).json({ message: "Contact created successfully.", contact });
            } catch (error) {
                return res.status(500).json({ message: "Error creating contact", error: error.message });
            }

        case 'GET':
            try {
                const contacts = await Contact.find({});
                return res.status(200).json(contacts);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching contacts", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedContact = await Contact.findByIdAndDelete(id);
                if (!deletedContact) {
                    return res.status(404).json({ message: "Contact not found." });
                }
                return res.status(204).json({ message: "Contact deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting contact", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
