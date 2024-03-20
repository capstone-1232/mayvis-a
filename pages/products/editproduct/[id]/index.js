import React from "react"
import ProductAddEditFormComponent from "@/components/ProductAddEditFormComponent";

export async function getServerSideProps({ params }) {
    let productData = [{}];
    let categories = [];
    try {
        const id = params.id;
        const req = params.req;
        const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
        // const host = req ? req.headers.host : window.location.hostname;
        const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
        const prodApiRoute = `${baseURL}/api/products`;
        //get product by id
        const prodRes = await fetch(`${prodApiRoute}/${id}`, { cache: "no-store" });
        // res.setHeader(
        //   'Cache-Control',
        //   'public, s-maxage=10, stale-while-revalidate=59'
        // )

        if (!prodRes.ok) {
            const errorText = await prodRes.text(); // or use `res.json()` if your API returns a JSON response
            throw new Error(`Failed to fetch products: ${errorText}`);
        }
        productData = await prodRes.json();

        //get categories
        const catApiRoute = `${baseURL}/api/category`;
        const catRes = await fetch(catApiRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Basic ${Buffer.from('techcoders.nait@gmail.com:techCoders1234').toString('base64')}`,
                // Include Authorization header if needed
            },
            // Additional options if needed
        });

        if (!catRes.ok) {
            const errorText = await catRes.text(); // or use `res.json()` if your API returns a JSON response
            throw new Error(`Failed to fetch category: ${errorText}`);
        }

        categories = await catRes.json();

    }
    catch (error) {
        console.log('Error loading category', error);
    }
    return { props: { productData, categories } };
}

const EditProduct = ({ productData, categories }) => {
    const updateProduct = async (dataFromChild) => {
        try {
            const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
            // const host = req ? req.headers.host : window.location.hostname;
            const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
            const apiRoute = `${baseURL}/api/products/${productData._id}`;
            const res = await fetch(apiRoute,
                {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'product_name': dataFromChild.product_name,
                        'description': dataFromChild.description,
                        'price': dataFromChild.price,
                        'is_archived': dataFromChild.is_archived,
                        'category_id': dataFromChild.category_id
                    })
                });
            return await res.json();
        }
        catch (e) {
            throw e;
        }

    }

    return (
        <ProductAddEditFormComponent
            product={{
                processClient: updateProduct,
                productName: productData.product_name,
                archived: productData.is_archived,
                description: productData.description,
                price: productData.price.$numberDecimal,
                category: categories.find(category => category._id == productData.category_id)?.category_name,
                categoryId: productData.category_id,
                categories: categories,
                isLoading: false,
                showMsg: false,
                msg: '',
            }}
        />
    );
}

export default EditProduct;