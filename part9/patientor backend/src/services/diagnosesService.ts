import diagnosesData from '../../data/diagnoses';
import { Diagnosis, Entry, EntryWithoutId, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const diagnosisDataArray: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
	return diagnosisDataArray;
};

const addEntry = (diagnosis: EntryWithoutId, patient: Patient): Entry => {
	const id: string = uuidv4();

	const newEntry = {
		id,
		...diagnosis,
	};
	patient.entries.push(newEntry);
	return newEntry;
};

export default {
	getDiagnoses,
	addEntry,
};
