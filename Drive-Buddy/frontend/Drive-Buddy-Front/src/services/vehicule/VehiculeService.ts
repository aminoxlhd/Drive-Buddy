import axios from "axios";
import { VehiculeModel } from "./Vehicule";

const BASE_URL = 'http://localhost:5000/vehicule';

export const getAllVehicules = async (): Promise<VehiculeModel[]> => {
    const response = await fetch(BASE_URL, {
        method: 'GET',
        
    });
    return response.json();
}


export const getAllVehiculesByTeacher = async (): Promise<VehiculeModel[]> => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:5000/vehicule_by_teacher`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    const responseJson = await response.data
    return responseJson;
}

export const getVehicule = async (id : string | undefined): Promise<VehiculeModel> => {
    const response = await fetch(BASE_URL + "/" + id, {
        method: 'GET',
        
    });
    return response.json();
}

export const updateVehicule = async (vehicule : VehiculeModel): Promise<void> => {
    await axios.put(BASE_URL + "/" + vehicule.id,
        vehicule
    );

}


export const createVehicule = async (vehicule : VehiculeModel): Promise<void> => {
    const token = localStorage.getItem('token')
    vehicule.id = "11"
    const response = await axios.post(`${BASE_URL}`, 
        vehicule,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            withCredentials : true
        }
    );
  
    const responseJson = await response.data
    return responseJson;

}




export const deleteVehicule = async(vehiculeId : string) => {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${BASE_URL}/${vehiculeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    const responseJson = await response.data
    return responseJson;
  }