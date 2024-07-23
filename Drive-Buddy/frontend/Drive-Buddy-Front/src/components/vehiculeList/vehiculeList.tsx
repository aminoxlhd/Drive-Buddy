import React from 'react';
import { VehiculeModel } from '../../services/vehicule/Vehicule';

interface VehiculeListProps {
  vehicules: VehiculeModel[];
}

const VehiculeList = ({ vehicules }: VehiculeListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {vehicules.map((vehicule) => (
          <tr key={vehicule.id}>
            <td>{vehicule.id}</td>
            <td>{vehicule.title}</td>
            <td>{vehicule.category}</td>
            <td>{vehicule.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehiculeList;
