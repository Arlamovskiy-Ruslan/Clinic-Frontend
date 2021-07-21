import React, {useEffect, useState} from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PatientInfo from "./components/Patients/PatientInfo";
import Patients from "./components/Patients/Patients";
import AddPatient from "./components/Patients/AddPatient";
import EditPatient from "./components/Patients/EditPatient";
import Header from "./components/Header";
import {useStateIfMounted} from "use-state-if-mounted";
import PatientService from "./services/PatientService";

function App() {

    const [patients, setPatients] = useStateIfMounted([]);
    const [firstPatient, setFirstPatient] = useState([])

    useEffect(() => {
        PatientService.getPatients()
            .then(({data: patients}) => {
                setPatients(patients)
            })
    }, [patients])

    useEffect(() => {
        setFirstPatient(
            patients.sort((a, b) => b.id - a.id)
        )
    }, [patients])

    return (
        <div className="Page">

            <Router key={patients.id}>
                {firstPatient?.map(patients =>
                    <Redirect from={"/"} to={`/patient/${patients.id}`}/>
                )}

                <Route path="/patient/:id">

                    <div className="_Patients">
                        <Patients/>
                    </div>

                    <div className="_Header">
                        <Header/>
                    </div>

                </Route>

                <div className="_Details">
                    <Switch>
                        <Route exact path="/patient/:id">
                            <PatientInfo/>
                        </Route>

                        <Route path="/patients/add">
                            <Patients/>
                            <AddPatient/>
                        </Route>

                        <Route path="/patients/:id-edit">
                            <Patients/>
                            <EditPatient/>
                        </Route>

                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
