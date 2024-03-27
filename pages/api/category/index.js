import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const { category_name, is_archived, description } = req.body;
                const category = await Category.create({ category_name, is_archived, description });
                return res.status(201).json({ message: "Category created successfully.", category });
            } catch (error) {
                return res.status(500).json({ message: "Error creating category", error: error.message });
            }

        case 'GET':
            try {
                const categories = await Category//.find({is_archived: false});
                .aggregate([
                    {
                        $lookup: {
                            localField: "_id",
                            from: "categories",
                            foreignField: "category_id",
                            as: "category_info"
                        }
                    }
                    ,
                    {
                        $match: {
                            is_archived: false
                        }
                    }
                ]);
                return res.status(200).json(categories);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching categories", error: error.message });
            }

        case 'DELETE':
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
            try {
                const { id } = req.query;
                const updatedFields = req.body;
                const updatedCategory = await Category.findByIdAndUpdate(id, updatedFields, { new: true });
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
