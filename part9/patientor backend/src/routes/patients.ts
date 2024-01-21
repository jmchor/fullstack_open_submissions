import express from 'express';
import patientService from '../services/patientService';
import { PatientData } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const newPatient: PatientData = patientService.addPatient(newPatientEntry);
		res.json(newPatient);
	} catch (error) {
		if (error instanceof Error) {
			// Handle errors thrown by utility functions
			res.status(400).json({ error: error.message });
		} else {
			// Handle other types of errors
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
});

export default router;
