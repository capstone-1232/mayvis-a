import ViewProposalComponent from "@/components/ViewProposalComponent";


export async function getServerSideProps({ params }) {
  let proposalData = [{}];
  try {
    const id = params.id;
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
    const apiRoute = `${baseURL}/api/proposal/${id}`;
    const res = await fetch(apiRoute, { cache: "no-store" });

    if (!res.ok) {
      throw new Error('Failed to fetch proposal');
    }
    proposalData = await res.json();
  }
  catch (error) {
    console.log('Error loading proposal', error);
  }
  return { props: { proposalData } };
}


const ViewProposal = ({ proposalData }) => {
  const data = proposalData[0];
  return (
    <ViewProposalComponent
      proposal={data}
    />
  );
}

export default ViewProposal;