import React from "react"
import CategoryAddEditFormComponent from "@/components/CategoryAddEditFormComponent";


export async function getServerSideProps({ params }) {
  let categoryData = [{}];
  try {
    const id = params.id;
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
    const apiRoute = `${baseURL}/api/category/${id}`;
    const res = await fetch(apiRoute, { cache: "no-store" });
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


const ViewCategory = ({ categoryData }) => {
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