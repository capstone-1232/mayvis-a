import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";

export default async function productHandler(req, res) {
    await connectMongoDB(); // Ensure you're connected to the database

    switch (req.method) {
        case 'POST':
            // Create a new product
            try {
                // const { product_name, description, price, is_recurring, is_archived, notes, quantity, created_by, updated_by } = req.body;
                const { product_name, description, price, is_archived, category_id } = req.body;
                const newProduct = await Product.create({
                  product_name,
                  description,
                  price,
                  is_archived,
                  category_id
                });
                return res.status(201).json({ message: "Product created successfully.", newProduct });
            } catch (error) {
                return res.status(500).json({ message: "Error creating product", error: error.message });
            }

        case 'GET':
            // Retrieve all products or a specific product by ID
            try {
                const products = await Product//.find({});
                    .aggregate([
                        {
                            $lookup: {
                                localField: "created_by",
                                from: "users",
                                foreignField: "_id",
                                as: "created_user"
                            }
                        }]);
                    return res.status(200).json(products);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching products", error: error.message });
            }
        case 'DELETE':
            // Delete a product
            try {
                const { id } = req.query;
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(200).json({ message: "Product deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting product", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
