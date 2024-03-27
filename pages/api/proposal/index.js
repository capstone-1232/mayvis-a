import connectMongoDB from "@/lib/mongodb";
import Proposal from "@/models/proposal";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            try {
                const proposalData = req.body;
                const proposal = await Proposal.create(proposalData);
                res.status(201).json({ message: "Proposal created successfully", proposal });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating proposal", error: error.message });
            }
            break;

        case 'GET':
            try {
                const { top, userid } = req.query;
                if (top) {
                    // Fetch top 5 proposals ordered by date
                    const topProposals = await Proposal.find({ is_archived: false })
                        .sort({ createdAt: -1 }) // Assuming 'createdAt' is your date field
                        .limit(top);
                    return res.status(200).json(topProposals);
                }

                if(userid){
                    // Fetch proposals by user id
                    const proposals = await Proposal.find({ proposed_by: userid });
                    return res.status(200).json(proposals);
                }

                const proposals = await Proposal.find({ is_archived: false });
                return res.status(200).json(proposals);
            } catch (error) {
                return res.status(500).json({ message: "Error fetching proposals", error: error.message });
            }

        case 'DELETE':
            try {
                const { id } = req.query;
                const deletedProposal = await Proposal.findByIdAndDelete(id);
                if (!deletedProposal) {
                    return res.status(404).json({ message: "Proposal not found." });
                }
                return res.status(204).json({ message: "Proposal deleted successfully." });
            } catch (error) {
                return res.status(500).json({ message: "Error deleting proposal", error: error.message });
            }

        case 'PUT':
            try {
                const { id } = req.query;
                const updateFields = req.body;
                const updatedProposal = await Proposal.findByIdAndUpdate(id, updateFields, { new: true });
                if (!updatedProposal) {
                    return res.status(404).json({ message: "Proposal not found." });
                }
                return res.status(200).json({ message: "Proposal updated successfully.", proposal: updatedProposal });
            } catch (error) {
                return res.status(500).json({ message: "Error updating proposal", error: error.message });
            }

        default:
            res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
