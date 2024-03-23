import React from "react"
import CategoryAddEditFormComponent from "@/components/CategoryAddEditFormComponent";


export async function getServerSideProps({ params }) {
  let categoryData = [{}];
  try {
    const id = params.id;
    const res = await fetch(`http://localhost:3000/api/category/${id}`, { cache: "no-store" });
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=10, stale-while-revalidate=59'
    // )

    if (!res.ok) {
      throw new Error('Failed to fetch category');
    }
    categoryData = await res.json();
  }
  catch (error) {
    console.log('Error loading category', error);
  }
  return { props: { categoryData } };
}


const EditCategory = ({categoryData}) => {
  const data = categoryData[0];
  console.log(categoryData);
  
    const updateCategory = async (dataFromChild) => {
        try {
            console.log(dataFromChild);
            // const res = await fetch(process.env.VERCEL_URL + '/api/category',
            const res = await fetch(`http://localhost:3000/api/category/${data._id}`,
                {
                    method: 'PUT',
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
                processCategory: updateCategory,
                categoryName: data?.category_name,
                archived: data?.is_archived,
                description: data?.description,
                productId: data?._id,
                isLoading: false,
                showMsg: false,
                msg: '',
                disableFields: false
            }}
        />
    );
} 

export default EditCategory;