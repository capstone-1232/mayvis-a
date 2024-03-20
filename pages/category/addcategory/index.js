import React from "react"
import CategoryAddEditFormComponent from "@/components/CategoryAddEditFormComponent";

const NewCategory = () => {
    const addCategory = async (dataFromChild) => {
        try {
            // const res = await fetch(process.env.VERCEL_URL + '/api/category',
            const res = await fetch('http://localhost:3000/api/category',
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