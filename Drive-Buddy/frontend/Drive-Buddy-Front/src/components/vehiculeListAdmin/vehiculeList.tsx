import React, { useState } from 'react';
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { useNavigate } from 'react-router-dom';
import { deleteVehicule } from '../../services/vehicule/VehiculeService';

interface VehiculeListProps {
  vehicules: VehiculeModel[];
}

const VehiculeList = ({ vehicules }: VehiculeListProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
  
  const removeCarBtn = (carId : string) => {
    deleteVehicule(carId).then(res => {
      if(res){
          setMessage("Teacher deleted.")
      }
  })
  }
  return (
    <>
      { message != "" && <h5 className="alert alert-success" style={{color : 'green'}}>{message}</h5>}
      <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {vehicules.map((vehicule) => (
          <tr key={vehicule.id}>
            <td>{vehicule.id}</td>
            <td><img src={vehicule.imageUrl}/></td>
            <td>{vehicule.title}</td>
            <td>{vehicule.category}</td>
            <td>{vehicule.price}</td>
            <td><button className="btn btn-danger" onClick={() => removeCarBtn(vehicule.id)} >Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>

  );
};

export default VehiculeList;
