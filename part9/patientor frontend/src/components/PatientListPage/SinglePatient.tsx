import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IdParams, Patient, Gender, Diagnosis } from '../../types';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Entry from './Entry';
import EntryForm from './EntryForm';

const SinglePatient = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const { id } = useParams<IdParams>();

	const [singlePatient, setSinglePatient] = useState<Patient>({} as Patient);

	useEffect(() => {
		const fetchSinglePatient = async (id: string): Promise<void> => {
			const patient = await patientService.getOne(id);
			setSinglePatient(patient);
		};
		void fetchSinglePatient(id as string);
	}, []);

	const getGenderIcon = () => {
		switch (singlePatient?.gender) {
			case Gender.Male:
				return <MaleIcon />;
			case Gender.Female:
				return <FemaleIcon />;
			default:
				return <AltRouteIcon />;
		}
	};

	return (
		<div>
			<EntryForm diagnoses={diagnoses} />
			<div>
				<h1> {singlePatient.name}</h1> {getGenderIcon()}
			</div>
			<p>SSN: {singlePatient.ssn}</p>
			<p>Occupation: {singlePatient.occupation}</p>
			<h3>entries</h3>
			{singlePatient.entries &&
				singlePatient.entries.map((entry) => <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
		</div>
	);
};

export default SinglePatient;
