import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PatientService from "../../services/PatientService";
import Comments from "../Comments/Comments";

function PatientInfo() {

    const {id} = useParams()
    const [patient, setPatient] = useState([])

    useEffect(() => {
        PatientService.getPatientById(id)
            .then(({data: patient}) => {
                setPatient(patient)
            })
    }, [id])

    return (
        patient ?
            <div className="PatientInfo">

                    <table className="patient-info-table">
                        <tr>
                            <th>Date of Birth:</th>
                            <td>{patient.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <th>Sex:</th>
                            <td>{patient.sex}</td>
                        </tr>
                        <tr>
                            <th>Country:</th>
                            <td>{patient.country}</td>
                        </tr>
                        <tr>
                            <th>State:</th>
                            <td>{patient.state}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>{patient.address}</td>
                        </tr>
                    </table>


                <Comments comments={patient.comment}/>

            </div>
            : <span> </span>
    )
}

export default PatientInfo