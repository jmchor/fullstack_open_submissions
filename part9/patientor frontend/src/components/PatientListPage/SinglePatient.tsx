import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IdParams, Patient, Gender } from '../../types';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Entry from './Entry';

const SinglePatient = () => {
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
			<div>
				<h1> {singlePatient.name}</h1> {getGenderIcon()}
			</div>
			<p>SSN: {singlePatient.ssn}</p>
			<p>Occupation: {singlePatient.occupation}</p>
			<h3>entries</h3>
			{singlePatient.entries && singlePatient.entries.map((entry) => <Entry key={entry.id} entry={entry} />)}
		</div>
	);
};

export default SinglePatient;
