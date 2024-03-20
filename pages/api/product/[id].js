import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/product';

export default async function handler(req, res) {
    const {
        query: { id },
    } = req;

    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const product = await Product.findById(id);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(200).json(product);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching product", error: error.message });
            }
        
        case 'PUT':
            try {
                const updateData = req.body;
                const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
                if (!updatedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(200).json({ message: "Product updated successfully.", updatedProduct });
            } catch (error) {
                return res.status(500).json({ message: "Error updating product", error: error.message });
            }

        case 'DELETE':
            try {
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) {
                    return res.status(404).json({ message: "Product not found." });
                }
                return res.status(200).json({ message: "Product deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting product", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
