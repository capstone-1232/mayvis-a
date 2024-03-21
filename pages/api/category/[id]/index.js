import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const category = await Category.find({ _id: id });
                return res.status(200).json(category);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching categoriess", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const { category_name, is_archived, description } = req.body;
                const updatedCategory = await Category.findByIdAndUpdate(id, { category_name, is_archived, description }, { new: true });
                if (!updatedCategory) {
                    return res.status(404).json({ message: "Category not found." });
                }
                return res.status(200).json({ message: "Category updated successfully.", category: updatedCategory });
            } catch (error) {
                return res.status(500).json({ message: "Error updating category", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
