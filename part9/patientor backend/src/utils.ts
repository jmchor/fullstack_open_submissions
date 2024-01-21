import { NewPatientInfo, Gender } from './types';

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

const toNewPatientEntry = (object: unknown): NewPatientInfo => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatientInfo = {
			name: parseName(object.name),
			dateOfBirth: parseDOB(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};
		return newPatient;
	}

	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
