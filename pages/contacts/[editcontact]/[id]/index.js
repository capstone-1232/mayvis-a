import { useRouter } from "next/router";
import React from "react"
import ContactAddEditFormComponent from "@/components/ContactAddEditFormComponent";

export async function getServerSideProps({ params }) {
    let contact = [{}];
    let contacts = [{}];
    try {
        const id = params.id;
        const resContact = await fetch(`http://localhost:3000/api/contact/${id}`, { cache: "no-store" });

        if (!resContact.ok) {
            throw new Error('Failed to fetch contact');
        }
        contact = await resContact.json();

        const resContacts = await fetch(`http://localhost:3000/api/contact/clientcontact/${contact[0].client_id}`, { cache: "no-store" });

        if (!resContacts.ok) {
            throw new Error('Failed to fetch contact');
        }
        contacts = await resContacts.json();
    }
    catch (error) {
        console.log('Error loading contact', error);
    }
    return { props: { contact, contacts } };
}

const EditContact = ({ contact, contacts }) => {
    const data = contact[0];
    const router = useRouter();
    const updateContact = async (newdata) => {
        try {
            const res = await fetch(`http://localhost:3000/api/contact/${data._id}`,
                {
                    method: 'PUT',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        'contact_firstname': newdata.FName, 'contact_lastname': newdata.LName, 'is_active': newdata.active,
                        'is_primary': newdata.primary, 'contact_department': newdata.department, 'contact_role': newdata.role, 
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
                processContact: updateContact,
                FName: data.contact_firstname,
                LName: data.contact_lastname,
                active: data.is_active,
                primary: data.is_primary,
                department: data.contact_department,
                role: data.contact_role,
                clientId: data.client_id || router.query.id,
                contacts: contacts
            }}
        />
    );
}

export default EditContact;