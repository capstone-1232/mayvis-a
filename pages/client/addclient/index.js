import React from "react"
import ClientAddEditFormComponent from "@/components/ClientAddEditFormComponent";

const NewClient = () => {
    const addClient = async (dataFromChild) => {
        try {
            const res = await fetch(process.env.VERCEL_URL + '/ api/client',
                {
                    method: 'POST',
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
                processClient: addClient,
                clientName: '',
                active: true,
                description: '',
                isLoading: false,
                showMsg: false,
                msg: '',
            }}
        />
    );
}

export default NewClient;