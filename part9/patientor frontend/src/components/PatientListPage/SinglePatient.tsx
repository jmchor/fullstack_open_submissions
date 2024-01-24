import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IdParams, Patient, Gender, Diagnosis } from '../../types';
import patientService from '../../services/patients';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Entry from './Entry';
import EntryForm from './EntryForm';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const SinglePatient = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const { id } = useParams<IdParams>();

	const [singlePatient, setSinglePatient] = useState<Patient>({} as Patient);
	const [isFormShown, setIsFormShown] = useState<boolean>(false);

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

	const toggleForm = () => {
		setIsFormShown(!isFormShown);
	};

	const patientStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
		padding: '20px 5px',
	};

	return (
		<div style={patientStyle}>
			<Typography variant='h4'>{singlePatient.name}</Typography>
			{getGenderIcon()}
			<Typography variant='body1'>SSN: {singlePatient.ssn}</Typography>
			<Typography variant='body1'>Occupation: {singlePatient.occupation}</Typography>
			<Typography variant='h6'>Entries</Typography>
			{singlePatient.entries &&
				singlePatient.entries.map((entry) => (
					<Card key={entry.id}>
						<CardContent>
							<Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
						</CardContent>
					</Card>
				))}

			{!isFormShown ? (
				<Button onClick={toggleForm}> Add Entry</Button>
			) : (
				<div>
					<EntryForm diagnoses={diagnoses} patientID={id as string} />
					<Button onClick={toggleForm}> Cancel Entry</Button>
				</div>
			)}
		</div>
	);
};

export default SinglePatient;
