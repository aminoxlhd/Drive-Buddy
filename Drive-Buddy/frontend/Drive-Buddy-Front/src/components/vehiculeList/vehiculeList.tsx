import React from 'react';
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { useNavigate } from 'react-router-dom';

interface VehiculeListProps {
  vehicules: VehiculeModel[];
}

const VehiculeList = ({ vehicules }: VehiculeListProps) => {
  const navigate = useNavigate();
  
  const editCar = (carId : string) => {
    navigate('/mycar/' + carId)
  }
  return (
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
            <td><button className="btn btn-primary" onClick={() => editCar(vehicule.id)} >Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehiculeList;
