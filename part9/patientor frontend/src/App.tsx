import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from './types';

import patientService from './services/patients';
import diagnosisService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import SinglePatient from './components/PatientListPage/SinglePatient';

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchPatientList = async (): Promise<void> => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();

		const fetchDiagnoses = async (): Promise<void> => {
			const diagnoses = await diagnosisService.getAll();
			setDiagnoses(diagnoses);
		};
		void fetchDiagnoses();
	}, []);

	return (
		<div className='App'>
			<Router>
				<Container>
					<Typography variant='h3' style={{ marginBottom: '0.5em' }}>
						Patientor
					</Typography>
					<Button component={Link} to='/' variant='contained' color='primary'>
						Home
					</Button>
					<Divider hidden />
					<Routes>
						<Route path='/' element={<PatientListPage patients={patients} setPatients={setPatients} />} />
						<Route path='/:id' element={<SinglePatient diagnoses={diagnoses} />}></Route>
					</Routes>
				</Container>
			</Router>
		</div>
	);
};

export default App;
