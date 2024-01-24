import { NewPatientInfo, Gender, Entry } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const parseSSN = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};
const parseDOB = (dateofBirth: unknown): string => {
	if (!isString(dateofBirth)) {
		throw new Error('Incorrect or missing dateofBirth');
	}
	return dateofBirth;
};
const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};
const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const isEntry = (entry: unknown): entry is Entry => {
	if (!entry || typeof entry !== 'object' || !('type' in entry)) {
		throw new Error('Incorrect or missing data');
	}

	if (!('description' in entry && 'date' in entry && 'specialist' in entry)) {
		throw new Error('Incorrect or missing data');
	}

	return entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck';
};

const parseEntries = (entries: unknown): Entry[] => {
	if (!Array.isArray(entries)) {
		throw new Error('Incorrect or missing entries');
	}

	// Assert that each entry in the array is of type Entry
	entries.forEach((entry) => {
		if (!isEntry(entry)) {
			throw new Error('Invalid entry');
		}
	});

	return entries as Entry[];
};

const toNewPatientEntry = (object: unknown): NewPatientInfo => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object &&
		'entries' in object
	) {
		const newPatient: NewPatientInfo = {
			name: parseName(object.name),
			dateOfBirth: parseDOB(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
			entries: parseEntries(object.entries),
		};
		return newPatient;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
