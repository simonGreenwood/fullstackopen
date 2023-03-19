"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiagnoses = void 0;
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getAllDiagnoses = () => {
    return diagnoses_1.default;
};
exports.getAllDiagnoses = getAllDiagnoses;
