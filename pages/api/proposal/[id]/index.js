import connectMongoDB from "@/lib/mongodb";
import Proposal from "@/models/proposal";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const proposal = await Proposal.find({ _id: id });
                return res.status(200).json(proposal);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching proposals", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const { proposal_name, is_archived, description } = req.body;
                const updatedProposal = await Proposal.findByIdAndUpdate(id, { proposal_name, is_archived, description }, { new: true });
                if (!updatedProposal) {
                    return res.status(404).json({ message: "Proposal not found." });
                }
                return res.status(200).json({ message: "Proposal updated successfully.", proposal: updatedProposal });
            } catch (error) {
                return res.status(500).json({ message: "Error updating proposal", error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
