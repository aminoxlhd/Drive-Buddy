import axios from "axios";
import { VehiculeModel } from "./Vehicule";

const BASE_URL = 'http://localhost:5000/vehicule';

export const getAllVehicules = async (): Promise<VehiculeModel[]> => {
    const response = await fetch(BASE_URL, {
        method: 'GET',
        
    });
    return response.json();
}

export const getVehicule = async (id : string | undefined): Promise<VehiculeModel> => {
    const response = await fetch(BASE_URL + "/" + id, {
        method: 'GET',
        
    });
    return response.json();
}

export const updateVehicule = async (vehicule : VehiculeModel): Promise<void> => {
    /*const data = new FormData();
    Object.keys(vehicule).forEach((key) => {
        data.append(key, (vehicule as any)[key]);
    });*/
    const response = await axios.put(BASE_URL + "/" + vehicule.id,
        vehicule
    );

}