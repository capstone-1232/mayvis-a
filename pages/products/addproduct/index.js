import React from "react"
import ProductAddEditFormComponent from "@/components/ProductAddEditFormComponent";

export async function getServerSideProps(context) {
    const { req } = context;
    // Determine the base URL based on the environment (Vercel or local)
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const host = req ? req.headers.host : window.location.hostname;
    const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://${host}`;
    const apiRoute = `${baseURL}/api/category`;

    let categories = [{}];
    try {
        const res = await fetch(apiRoute, { cache: "no-store" });

        if (!res.ok) {
            const errorText = await res.text(); // or use `res.json()` if your API returns a JSON response
            throw new Error(`Failed to fetch category: ${errorText}`);
        }

        categories = await res.json();
    } catch (error) {
        console.error('Error loading categories', error);
        // Pass the error message to the page's props or handle it as needed
        return { props: { categories, error: error.message } };
    }

    return { props: { categories } };
}

const AddProduct = ({categories}) => {
    console.log(categories);
    const insertProduct = async (dataFromChild) => {
        try {
            console.log(dataFromChild);
            const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
            // const host = req ? req.headers.host : window.location.hostname;
            const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
            const apiRoute = `${baseURL}/api/products`;
            const res = await fetch(apiRoute,
                {
                    method: 'POST',
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
                processClient: insertProduct,
                productName: '',
                archived: false,
                description: '',
                price: 0,
                category: '',
                categories: categories,
                isLoading: false,
                showMsg: false,
                msg: '',
            }}
        />
    );
}

export default AddProduct;