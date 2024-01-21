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

export type NonSensitiveEntries = Omit<PatientData, 'ssn'>;
export type NewPatientInfo = Omit<PatientData, 'id'>;
