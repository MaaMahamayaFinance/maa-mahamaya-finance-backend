const { findMatchingBusinessesService } = require('../service/customerService');

const getMatchingBusinessesController = async (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const result = await findMatchingBusinessesService(userId, page, limit);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching matching businesses:', error.message);
        res.status(500).json({ error: error.message });
    }
    };

module.exports = {
    getMatchingBusinessesController,
};
