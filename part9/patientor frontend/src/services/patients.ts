import axios from 'axios';
import { EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const getOne = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
	return data;
};

const addEntry = async (newEntry: EntryWithoutId, patientID: string) => {
	const { data } = await axios.post<EntryWithoutId>(`${apiBaseUrl}/patients/${patientID}/entries`, newEntry);
	return data;
};

export default {
	getAll,
	create,
	getOne,
	addEntry,
};
