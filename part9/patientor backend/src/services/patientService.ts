import patientData from '../../data/patients';
import { NonSensitiveEntries, PatientData } from '../types';

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

const addEntry = () => {
	return null;
};

export default {
	getEntries,
	addEntry,
	getNonSensitiveEntries,
};
