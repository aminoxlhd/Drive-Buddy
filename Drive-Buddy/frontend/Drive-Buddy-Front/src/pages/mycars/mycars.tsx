import { useEffect, useState } from "react";
import { getAllVehiculesByTeacher } from "../../services/vehicule/VehiculeService";
import { VehiculeModel } from "../../services/vehicule/Vehicule";
import VehiculeList from "../../components/vehiculeList/vehiculeList";



const MyCars = () => {
    const [cars, setCars] = useState<VehiculeModel[]>([{
        id : '1',
        imageUrl: '',
        title: '',
        category: '',
        rating: '0',
        ownerName: '',
        location: '',
        price: "",
    }])

    useEffect(() => {
        getAllVehiculesByTeacher().then(res => {
            setCars(res)}
        ).catch(e => console.log(e))
    }, [])

    const addCar = () => {
        window.location.href = '/mycar'    
    }

    
    return (
        <div className='container'>
            <h1>My Cars</h1>
            <button onClick={addCar}>Add Vehicule</button>
            <VehiculeList vehicules={cars} />

        </div>

    );
};

export default MyCars;