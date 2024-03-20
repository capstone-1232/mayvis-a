import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";

export default async function productHandler(req, res) {
    await connectMongoDB(); // Ensure you're connected to the database

    switch (req.method) {
        case 'GET':
            // Retrieve all products or a specific product by ID
            try {
                const { id } = req.query;
                const product = await Product.findById(id);
                    if (!product) {
                        return res.status(404).json({ message: "Product not found" });
                    }
                    return res.status(200).json(product);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching products", error: error.message });
            }

        case 'PUT':
            // Update a product
            try {
                const { id } = req.query;
                const updateData = req.body;
                console.log(updateData);
                const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
                if (!updatedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(200).json({ message: "Product updated successfully.", updatedProduct });
            } catch (error) {
                return res.status(500).json({ message: "Error updating product", error: error.message });
            }
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
