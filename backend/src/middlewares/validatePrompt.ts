import { Request, Response, NextFunction } from "express";

export const validatePrompt = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({
            error: "Prompt is required and must be a string"
        });
    }

    if (prompt.length < 5) {
        return res.status(400).json({
            error: "Prompt is too short"
        });
    }

    if (prompt.length > 1000) {
        return res.status(400).json({
            error: "Prompt exceeds maximum length"
        });
    }

    next();
};

