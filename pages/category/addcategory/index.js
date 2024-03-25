import React from "react"
import CategoryAddEditFormComponent from "@/components/CategoryAddEditFormComponent";

const NewCategory = () => {
    const addCategory = async (dataFromChild) => {
        try {
            const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
            const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
            const apiRoute = `${baseURL}/api/category`;
            const res = await fetch(apiRoute,
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'category_name': dataFromChild.categoryName,
                        'is_archived': dataFromChild.archived,
                        'description': dataFromChild.description
                    })
                });
            return await res.json();
        }
        catch (e) {
            throw e;
        }

    }

    return (
        <CategoryAddEditFormComponent
            category={{
                processCategory: addCategory,
                categoryName: '',
                archived: true,
                description: '',
                isLoading: false,
                showMsg: false,
                msg: '',
                disableFields: false
            }}
        />
    );
}

export default NewCategory;