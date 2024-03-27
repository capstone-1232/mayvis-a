import { useRouter } from "next/router";
import React from "react"
import ContactAddEditFormComponent from "@/components/ContactAddEditFormComponent";

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/contact`;

export async function getServerSideProps({ params }) {
    let contactData = [{}];
    try {
        const id = params.id;
        const res = await fetch(`${apiRoute}/clientcontact/${id}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error('Failed to fetch contact');
        }
        contactData = await res.json();
    }
    catch (error) {
        console.log('Error loading contact', error);
    }
    return { props: { contactData } };
}

const AddContact = ({ contactData }) => {
    const router = useRouter();
    const addNewContact = async (newdata) => {
        try {
            const res = await fetch(apiRoute,
                {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'contact_firstname': newdata.FName,
                        'contact_lastname': newdata.LName,
                        'email' : newdata.email,
                        'contact_no' : newdata.contactNo,
                        'is_active': newdata.active,
                        'is_primary': newdata.primary, 
                        'contact_department': newdata.department, 
                        'contact_role': newdata.role, 
                        'client_id': newdata.clientId
                    })
                });

            return await res.json();
        }
        catch (e) {
            throw e;
        }
    }

    return (
        <ContactAddEditFormComponent
            contactData={{
                processContact: addNewContact,
                id: contactData._id,
                FName: '',
                LName: '',
                email: '',
                contactNo: '',
                active: true,
                primary: false,
                department: '',
                role: '',
                clientId: contactData.client_id || router.query.id,
                contacts: contactData
            }}
        />
    );
}

export default AddContact;