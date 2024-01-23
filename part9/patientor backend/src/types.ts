export interface PatientData {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Female = 'female',
	Male = 'male',
	Other = 'other',
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Entry {}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitiveEntries = Omit<Patient, 'ssn'>;
export type NewPatientInfo = Omit<Patient, 'id'>;
