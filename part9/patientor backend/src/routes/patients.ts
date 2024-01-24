import express from 'express';
import patientService from '../services/patientService';
import { Entry, Patient } from '../types';
import diagnosesService from '../services/diagnosesService';
import toNewPatientEntry from '../utils/toNewPatient';
import toNewDiagnosticEntry from '../utils/toNewEntry';

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
	} catch (error: unknown) {
		if (error instanceof Error) {
			// Handle errors thrown by utility functions
			res.status(400).json({ error: error.message });
		} else {
			// Handle other types of errors
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
});

router.post('/:id/entries', (req, res) => {
	const { id } = req.params;

	console.log(id);

	try {
		const patient = patientService.findById(id);
		if (patient === undefined) {
			res.status(404).send(`patient not found`);
			return;
		}

		const newDiagnosticEntry = toNewDiagnosticEntry(req.body);

		const newEntry: Entry = diagnosesService.addEntry(newDiagnosticEntry, patient);

		res.json(newEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
