import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import PatientService from "../services/PatientService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

function Header() {

    const {id} = useParams()
    const [patient, setPatient] = useState([])

    useEffect(() => {
        PatientService.getPatientById(id)
            .then(({data: patient}) => {
                setPatient(patient)
            })
    }, [id])

    const deletePatientById = () => {
        PatientService.deletePatient(id)
            .then(data => {
                console.log(data);
            })
    }

    return (
        patient ?
        <div key={patient.id} className="Header">

            <p>{patient.firstName} {patient.lastName}</p>
            <p>{patient.age} years old</p>

            <div className="patient_crud">

                <Link to={`/patients/${patient.id}-edit`}>
                    <button className="UserEdit-icon-patient">
                        <FontAwesomeIcon icon={faUserEdit}/>
                    </button>
                </Link>

                <button className="Trash-icon-patient" onClick={deletePatientById}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>


            </div>

        </div>
            : <span></span>
    )

}

export default Header