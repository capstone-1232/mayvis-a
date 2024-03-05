import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const { Product_Name } = req.body;
                const product = await Product.create({ Product_Name });
                return res.status(201).json({ message: "Product created successfully.", product });
            } catch (error) {go
                return res.status(500).json({ message: "Error creating product", error: error.message });
            }

        case 'GET':
            try {
                const products = await Product.find({});
                return res.status(200).json(products);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching products", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(204).json({ message: "Product deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting product", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const { Product_Name } = req.body;
                const updatedProduct = await Product.findByIdAndUpdate(id, { Product_Name }, { new: true });
                if (!updatedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(200).json({ message: "Product updated successfully.", product: updatedProduct });
            } catch (error) {
                return res.status(500).json({ message: "Error updating product", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
