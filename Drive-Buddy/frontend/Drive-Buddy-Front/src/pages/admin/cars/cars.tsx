import { useEffect, useState } from "react"
import { VehiculeModel } from "../../../services/vehicule/Vehicule"
import { getAllVehicules } from "../../../services/vehicule/VehiculeService"
import VehiculeList from "../../../components/vehiculeListAdmin/vehiculeList"




export const CarsPage = () => {

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
        getAllVehicules().then(res => {
            setCars(res)}
        ).catch(e => console.log(e))
    }, [])



    
    return (
        <div className='container'>
            <div className="row justify-content-md-center">
                <h1 className="col-md-10">Orders</h1>
            </div>
            <VehiculeList vehicules={cars} />

        </div>

    );
}