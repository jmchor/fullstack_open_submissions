import patientData from '../../data/patients';
import { NonSensitiveEntries, PatientData, NewPatientInfo } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patientDataArray: PatientData[] = patientData;

const getEntries = (): PatientData[] => {
	return patientDataArray;
};

const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
	return patientDataArray.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatientInfo): PatientData => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const id: string = uuidv4();

	const newPatient = {
		id,
		...patient,
	};
	return newPatient;
};

const findById = (id: string): PatientData | undefined => {
	const patient = patientDataArray.find((p) => p.id === id);
	return patient;
};

export default {
	getEntries,
	addPatient,
	getNonSensitiveEntries,
	findById,
};
