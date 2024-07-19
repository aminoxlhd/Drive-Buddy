import React, { useState, ChangeEvent, useEffect } from 'react';
import "./Mycar.scss"
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { useParams } from 'react-router-dom';
import { getVehicule, updateVehicule } from '../../services/vehicule/VehiculeService';


interface Documents {
    drivingLicence: File | null;
    insurance: File | null;
    certification: File | null;
    carDetails: File | null;
}



const MyCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState<VehiculeModel>({
        id : 1,
        imageUrl: '',
        title: '',
        category: '',
        rating: 0,
        ownerName: '',
        location: '',
        price: "",
    })

    useEffect(() => {
        getVehicule(id).then(res => setCar(res)).catch(e => console.log(e))
    }, [])

    const [documents, setDocuments] = useState<Documents>({
        drivingLicence: null,
        insurance: null,
        certification: null,
        carDetails: null,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setDocuments({ ...documents, [name]: files[0] });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
      };

    const handleSave = () => {
        updateVehicule(car).then(res => {}).catch(e => console.log(e))
        console.log('Car Details:', car);
        console.log('Documents:', documents);
    };

    return (
        <div className='container'>
            <div className="my-car-container">
                <div className="car-image-section">
                    <img src={car.imageUrl} alt={car.title} className="car-image" />
                    <div className="car-info">
                        <input
                            type="text"
                            name="title"
                            value={car.title}
                            onChange={handleChange}
                            className="car-input"
                            placeholder='Car title'
                        />
                        <input
                            type="text"
                            name="category"
                            value={car.category}
                            onChange={handleChange}
                            className="car-input"
                            placeholder='Car Category'
                        />
                        <input
                            type="text"
                            name="ownerName"
                            value={car.ownerName}
                            onChange={handleChange}
                            className="car-input"
                            placeholder='Owner Name'
                        />
                        <input
                            type="text"
                            name="location"
                            value={car.location}
                            onChange={handleChange}
                            className="car-input"
                            placeholder='Location'
                        />
                        <button className="button" onClick={handleSave}>Save</button>
                        {/* <button className="button" onClick={handleAddCar}>Add Car</button> */}
                    </div>
                </div>
                <div className="documents-upload-section">
                    <h3>Upload Documents</h3>
                    <div className={`document-upload ${documents.drivingLicence ? 'approved' : ''}`}>
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Driving Licence
                        </div>
                        <div className="document-status">
                            {documents.drivingLicence ? 'State: Approved' : 'Upload your driving licence'}
                            <input
                                type="file"
                                name="drivingLicence"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="document-upload">
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Insurance
                        </div>
                        <div className="document-status">
                            Upload your insurance
                            <input
                                type="file"
                                name="insurance"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="document-upload">
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Certification
                        </div>
                        <div className="document-status">
                            Upload your certification
                            <input
                                type="file"
                                name="certification"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="document-upload">
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Car Details
                        </div>
                        <div className="document-status">
                            Upload your car details
                            <input
                                type="file"
                                name="carDetails"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyCar;