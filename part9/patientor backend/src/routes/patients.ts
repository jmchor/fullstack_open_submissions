import express from 'express';
import patientService from '../services/patientService';
import { PatientData, NewPatientInfo } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
	const newPatientEntry = toNewPatientEntry(req.body);

	const newPatient: PatientData = patientService.addPatient(newPatientEntry);

	res.json(newPatient);
});

export default router;
