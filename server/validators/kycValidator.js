const { z } = require('zod');

const kycSchema = z.object({
    aadhaarNumber: z
        .string()
        .length(12, "Aadhaar must be exactly 12 digits")
        .regex(/^\d{12}$/, "Aadhaar must contain only digits"),

    panNumber: z
        .string()
        .length(10, "PAN must be exactly 10 characters")
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),

    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ObjectId")
});

module.exports = { kycSchema };
