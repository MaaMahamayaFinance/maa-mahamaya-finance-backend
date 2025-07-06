const { s3 } = require('../config/s3Client');

const generateUploadURL = async (req, res) => {
    const { fileName, contentType } = req.query;

    const key = `profile-images/${Date.now()}_${fileName}`;

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Expires: 60,
        ContentType: contentType
    };

    try {
        const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
        const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        res.json({ uploadUrl, publicUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate pre-signed URL' });
    }
};

module.exports = {generateUploadURL};
