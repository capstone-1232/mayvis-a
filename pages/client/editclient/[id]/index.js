import React from "react"
import ClientAddEditFormComponent from "@/components/ClientAddEditFormComponent";

export async function getServerSideProps({ params }) {
    let clientData = [{}];
    try {
      const id = params.id;
      const res = await fetch(`http://localhost:3000/api/client/${id}`, { cache: "no-store" });
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
            const res = await fetch(`http://localhost:3000/api/client/${data._id}`,
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