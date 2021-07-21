import React, {useEffect, useState} from "react";
import PatientService from "../../services/PatientService";
import {useParams, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

function EditPatient() {

    const [patient, setPatient] = useState([])
    const {id} = useParams()
    let history = useHistory();

    useEffect(() => {
        PatientService.getPatientById(id)
            .then(({data: patient}) => {
                setPatient(patient)
            })
    }, [id])

    const editPatient = (e) => {
        e.preventDefault(patient)
        PatientService.editPatient(id, patient).then(({data: patient}) => {
            history.push(`/patient/${patient.id}`)
        })
    };

    const closeComponent = () => {
        history.goBack()
    }

    const setData = (e) => {
        const newData = {...patient}
        newData[e.target.name] = e.target.value
        setPatient(newData)
    };

    const editGender = (e) => {
        const gender = {...patient}
        gender[e.target.name] = e.target.value
        setPatient(gender)
        console.log(gender)
    }

    return (
        patient ?
            <div className="EditPatient">

                <form onSubmit={editPatient}>

                    <table className="patient-edit-table">

                        <tr>
                            <th>First Name:</th>
                            <td><input onChange={(e) => setData(e)}
                                       name="firstName"
                                       value={patient.firstName}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Last Name:</th>
                            <td><input onChange={(e) => setData(e)}
                                       name="lastName"
                                       value={patient.lastName}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Date of Birth:</th>
                            <td><input onChange={(e) => setData(e)} name="dateOfBirth" value={patient.dateOfBirth}
                                       type="date"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Sex:</th>
                            <td>
                                <input
                                    id="Male"
                                    type="radio"
                                    name="sex"
                                    value="Male"
                                    onChange={(e) => editGender(e)}
                                />Male
                                <input
                                    id="Female"
                                    type="radio"
                                    name="sex"
                                    value="Female"
                                    onChange={(e) => editGender(e)}
                                />Female
                            </td>
                        </tr>

                        <tr>
                            <th>Country:</th>
                            <td>
                                <input onChange={(e) => setData(e)} name="country" value={patient.country} type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>State:</th>
                            <td>
                                <input onChange={(e) => setData(e)} name="state" value={patient.state} type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Address:</th>
                            <td>
                                <input onChange={(e) => setData(e)} name="address" value={patient.address} type="text"/>
                            </td>
                        </tr>

                    </table>

                    <button className="Close-icon" onClick={closeComponent}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>

                    <button className="Check-icon" type='submit'>
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </form>
            </div>
            : <span> </span>
    )
}

export default EditPatient