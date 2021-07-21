import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PatientService from "../../services/PatientService";
import {useStateIfMounted} from "use-state-if-mounted";
import Female from "../Patients/img/GenderImg/female.png"
import Male from "../Patients/img/GenderImg/male.png"

function Patients() {

    const [patients, setPatients] = useStateIfMounted([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        PatientService.getPatients()
            .then(({data: patients}) => {
                setPatients(
                    patients.sort((a,b)=>a.firstName.localeCompare(b.firstName)))
            })
    }, [patients])

    useEffect(() => {
        setFilteredData(
            patients.filter((patient) => patient.firstName.toLowerCase().includes(search.toLowerCase())),
        )
    }, [search, patients])

    return (
        <div className="Patients">

            <div className="patients-bar">
                <input placeholder="Search Patient" size={15} type="text"
                       onChange={(e) => {
                           setSearch(e.target.value);
                       }}/>

                <Link to="/patients/add">
                    <button>New Patient</button>
                </Link>
            </div>

            <div className="overflow-scroll-patients">

                {filteredData?.map(patients =>
                    <div className="patients-list" key={patients.id}>
                        <hr className="hr1"/>

                        <Link to={`/patient/${patients.id}`}>
                            <div className="patient-initials">
                                <a>{patients.firstName}</a>
                                <a>{patients.lastName}</a>
                                <p>{patients.dateOfBirth}</p>
                            </div>


                            <div className="gender-img">{
                                patients.sex === 'Female' ?
                                    <img width={40} src={Female} alt=""/>
                                    : <img width={40} src={Male} alt=""/>

                            }</div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="vl"></div>
        </div>
    )
}

export default Patients