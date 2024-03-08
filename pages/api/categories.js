import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            // Create a new category
            try {
                const { category_name, description, is_archived, notes, product_id, created_by, updated_by } = req.body;
                const category = await Category.create({
                  category_name,
                  description,
                  is_archived,
                  notes,
                  product_id, // This expects an array of product IDs
                  created_by,
                  updated_by,
                });
                return res.status(201).json({ message: "Category created successfully.", category });
            } catch (error) {
                return res.status(500).json({ message: "Error creating category", error: error.message });
            }

        case 'GET':
            // Fetch all categories or a specific category by ID
            try {
                const { id } = req.query;
                if (id) {
                    const category = await Category.findById(id).populate('product_id').populate('created_by').populate('updated_by');
                    if (!category) {
                        return res.status(404).json({ message: "Category not found." });
                    }
                    return res.status(200).json(category);
                } else {
                    const categories = await Category.find({}).populate('product_id').populate('created_by').populate('updated_by');
                    return res.status(200).json(categories);
                }
            } catch (error) {
                return res.status(500).json({ message: "Error fetching categories", error: error.message });
            }

        case 'DELETE':
            // Delete a category by ID
            try {
                const { id } = req.query;
                const deletedCategory = await Category.findByIdAndDelete(id);
                if (!deletedCategory) {
                    return res.status(404).json({ message: "Category not found." });
                }
                return res.status(204).json({ message: "Category deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting category", error: error.message });
            }

        case 'PUT':
            // Update a category by ID
            try {
                const { id } = req.query;
                const updateData = req.body;
                const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true }).populate('product_id').populate('created_by').populate('updated_by');
                if (!updatedCategory) {
                    return res.status(404).json({ message: "Category not found." });
                }
                return res.status(200).json({ message: "Category updated successfully.", category: updatedCategory });
            } catch (error) {
                return res.status(500).json({ message: "Error updating category", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
