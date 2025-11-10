import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    console.log("🔥 GET /api/health called");
    return res.json({ status: "ok", message: "API is running" });
});

export default router;
