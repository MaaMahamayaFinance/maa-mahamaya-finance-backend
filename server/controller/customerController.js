const { findMatchingBusinessesService, submitAadhaarPanDetailsService } = require('../service/customerService');
const { kycSchema } = require('../validators/kycValidator');

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




const submitAadhaarPanController = async (req, res) => {
    try {
        const validatedData = kycSchema.parse(req.body);
        const result = await submitAadhaarPanDetailsService(validatedData);

        return res.status(201).json({
            message: 'Details submitted successfully.',
            data: result
        });
    } catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({
                message: 'Validation failed.',
                errors: err.errors
            });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getMatchingBusinessesController,
    submitAadhaarPanController
};
