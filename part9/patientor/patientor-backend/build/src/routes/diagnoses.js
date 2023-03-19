"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosesService_1 = require("../services/diagnosesService");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send((0, diagnosesService_1.getAllDiagnoses)());
});
exports.default = router;
