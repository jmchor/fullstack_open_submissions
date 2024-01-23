import patients from '../../data/patients';
import { NewPatientInfo, Patient, NonSensitivePatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Patient[] => {
	return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
	console.log(patients);
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatientInfo): Patient => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const id: string = uuidv4();

	const newPatient = {
		id,
		...patient,
	};
	return newPatient;
};

const findById = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id);
};

export default {
	getEntries,
	addPatient,
	getNonSensitiveEntries,
	findById,
};
