import React, {useState} from "react";
import PatientService from "../../services/PatientService";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

function AddPatient() {

    const [patient, setPatient] = useState([])
    let history = useHistory();

    const closeComponent = () => {
        history.goBack()
    }

    const addPatient = (e) => {
        e.preventDefault(patient)
        PatientService.addPatient(patient).then(({data: patient}) => {
            history.push(`/patient/${patient.id}`)
        })
    };


    const handleChange = (e) => {
        const newData = {...patient}
        newData[e.target.name] = e.target.value
        setPatient(newData)
        console.log(newData)
    };

    const changeGender = (e) => {
        const gender = {...patient}
        gender[e.target.name] = e.target.value
        setPatient(gender)
        console.log(gender)
    }

    return (
        patient ?
            <div className="AddPatient">
                <form onSubmit={addPatient}>
                    <table className="patient-add-table">

                        <tr>
                            <th>First Name:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="firstName"
                                       value={patient.firstName}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Last Name:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="lastName"
                                       value={patient.lastName}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Age:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="age"
                                       value={patient.age}
                                       type="number"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Date of Birth:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="dateOfBirth"
                                       value={patient.dateOfBirth}
                                       type="date"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Sex:</th>
                            <td><input id="Male"
                                       type="radio"
                                       name="sex"
                                       value="Male"
                                       onChange={(e) => changeGender(e)}/>Male

                                <input id="Female"
                                       type="radio"
                                       name="sex"
                                       value="Female"
                                       onChange={(e) => changeGender(e)}/>Female
                            </td>
                        </tr>

                        <tr>
                            <th>Country:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="country"
                                       value={patient.country}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>State:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="state"
                                       value={patient.state}
                                       type="text"/>
                            </td>
                        </tr>

                        <tr>
                            <th>Address:</th>
                            <td><input onChange={(e) => handleChange(e)}
                                       name="address"
                                       value={patient.address}
                                       type="text"/></td>
                        </tr>

                    </table>

                    <button className="Close-icon" onClick={closeComponent}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>

                    <button className="Check-icon" type='submit'>
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </form>
            </div> : <span></span>
    )
}

export default AddPatient