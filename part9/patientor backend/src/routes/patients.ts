import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	const entries: Patient[] = patientService.getEntries();
	res.json(entries);
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	const patient = patientService.findById(id) as Patient;

	try {
		res.json(patient);
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

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);
		const newPatient: Patient = patientService.addPatient(newPatientEntry);
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
