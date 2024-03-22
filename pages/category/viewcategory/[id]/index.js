import React from "react"
import CategoryAddEditFormComponent from "@/components/CategoryAddEditFormComponent";


export async function getServerSideProps({ params }) {
  let categoryData = [{}];
  try {
    const id = params.id;
    console.log(id);
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


const ViewCategory = ({categoryData}) => {
  const data = categoryData[0];  
    return (
        <CategoryAddEditFormComponent
            category={{
                categoryName: data?.category_name,
                archived: data?.is_archived,
                description: data?.description,
                isLoading: false,
                showMsg: false,
                msg: '',
                disableFields: true
            }}
        />
    );
} 

export default ViewCategory;