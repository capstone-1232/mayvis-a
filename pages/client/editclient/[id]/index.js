import React from "react"
import ClientAddEditFormComponent from "@/components/ClientAddEditFormComponent";

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/client`;

export async function getServerSideProps({ params }) {
    let clientData = [{}];
    try {
      const id = params.id;
      const res = await fetch(`${apiRoute}/${id}`, { cache: "no-store" });
      // res.setHeader(
      //   'Cache-Control',
      //   'public, s-maxage=10, stale-while-revalidate=59'
      // )
  
      if (!res.ok) {
        throw new Error('Failed to fetch client');
      }
      clientData = await res.json();
    }
    catch (error) {
      console.log('Error loading clients', error);
    }
    return { props: { clientData } };
  }

const EditClient = ({clientData}) => {
    const data = clientData[0];
    const updateClient = async (dataFromChild) => {
        try {
            const res = await fetch(`${apiRoute}/${data._id}`,
                {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'client_name': dataFromChild.clientName,
                        'is_active': dataFromChild.active,
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
        <ClientAddEditFormComponent
            client={{
                processClient: updateClient,
                clientName: data.client_name,
                active: data.is_active,
                description: data.description,
                isLoading: false,
                showMsg: false,
                msg: '',
            }}
        />
    );
}

export default EditClient;