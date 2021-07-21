import axios from 'axios';

const instance = axios.create({
    baseURL : `http://localhost:8080`
});

class PatientService {

    getPatients(){
       return instance.get();
    }

    getPatientById(id){
        return instance.get(`/patient/${id}`);
    }

    deletePatient(id){
        return instance.delete(`/patient/${id}/delete`);
    }

    addPatient(patient){
        return instance.post(`/patient/create`,{
            firstName: patient.firstName,
            lastName: patient.lastName,
            sex: patient.sex,
            age: patient.age,
            dateOfBirth: patient.dateOfBirth,
            country: patient.country,
            state: patient.state,
            address: patient.address
        })
    }

    editPatient(id, patient){
        return instance.put(`/patient/${id}/update`,{
            firstName: patient.firstName,
            lastName: patient.lastName,
            sex: patient.sex,
            age: patient.age,
            dateOfBirth: patient.dateOfBirth,
            country: patient.country,
            state: patient.state,
            address: patient.address
        })
    }

}

export default new PatientService();