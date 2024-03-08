import connectMongoDB from "@/lib/mongodb";
import Proposal from "@/models/proposal";

export default async function handler(req, res) {
    await connectMongoDB();

    switch (req.method) {
        case 'POST':
            // Create a new proposal
            try {
                const { proposal_title, message, attachment, suggestions, is_archived, project_total, recurring_total, proposal_total, updated_by, status, client_id, product_id, proposed_by, category_id } = req.body;
                const proposal = await Proposal.create({
                  proposal_title,
                  message,
                  attachment,
                  suggestions,
                  is_archived,
                  project_total,
                  recurring_total,
                  proposal_total,
                  updated_by,
                  status,
                  client_id,
                  product_id,
                  proposed_by,
                  category_id
                });
                return res.status(201).json({ message: "Proposal created successfully.", proposal });
            } catch (error) {
                return res.status(500).json({ message: "Error creating proposal", error: error.message });
            }

        case 'GET':
            // Fetch all proposals or a specific proposal by ID
            try {
                const { id } = req.query;
                if (id) {
                    const proposal = await Proposal.findById(id)
                      .populate('updated_by')
                      .populate('status')
                      .populate('client_id')
                      .populate('product_id')
                      .populate('proposed_by')
                      .populate('category_id');
                    if (!proposal) {
                        return res.status(404).json({ message: "Proposal not found." });
                    }
                    return res.status(200).json(proposal);
                } else {
                    const proposals = await Proposal.find({})
                      .populate('updated_by')
                      .populate('status')
                      .populate('client_id')
                      .populate('product_id')
                      .populate('proposed_by')
                      .populate('category_id');
                    return res.status(200).json(proposals);
                }
            } catch (error) {
                return res.status(500).json({ message: "Error fetching proposals", error: error.message });
            }

        case 'DELETE':
            // Delete a proposal by ID
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
            // Update a proposal by ID
            try {
                const { id } = req.query;
                const updateData = req.body;
                const updatedProposal = await Proposal.findByIdAndUpdate(id, updateData, { new: true })
                  .populate('updated_by')
                  .populate('status')
                  .populate('client_id')
                  .populate('product_id')
                  .populate('proposed_by')
                  .populate('category_id');
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
