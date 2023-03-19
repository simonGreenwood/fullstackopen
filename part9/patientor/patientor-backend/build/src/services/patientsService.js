"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPatientsWithoutSSN = exports.getAllPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const getAllPatients = () => {
    return patients_1.default;
};
exports.getAllPatients = getAllPatients;
const getAllPatientsWithoutSSN = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getAllPatientsWithoutSSN = getAllPatientsWithoutSSN;
