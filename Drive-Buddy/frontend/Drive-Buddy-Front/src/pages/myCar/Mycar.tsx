import React, { useState, ChangeEvent, useEffect } from 'react';
import "./Mycar.scss"
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { useParams } from 'react-router-dom';
import { createVehicule, getVehicule, updateVehicule } from '../../services/vehicule/VehiculeService';
import { uploadFileToCloudinary, uploadImage } from '../../services/cloudinary/cloudinary';


interface Documents {
    photo: File | null;
    insurance: File | null;
    certification: File | null;
    carDetails: File | null;
}



const MyCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState<VehiculeModel>({
        id : '1',
        imageUrl: '',
        title: '',
        category: '',
        rating: '0',
        ownerName: '',
        location: '',
        price: "",
    })
    
    if(id){
        // update
        useEffect(() => {
            getVehicule(id).then(res => setCar(res)).catch(e => console.log(e))
        }, [])
    }

    

    const [documents, setDocuments] = useState<Documents>({
        photo: null,
        insurance: null,
        certification: null,
        carDetails: null,
    });

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            console.log(documents.photo)
            if(documents.photo){
                // let url = await uploadFileToCloudinary(documents.photo)
                // console.log(url);
                
            }
            setDocuments({ ...documents, [name]: files[0] });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
      };

    const handleSave = () => {
        console.log(id)
        if(!id){
            // creation 
            createVehicule(car).then(res => {}).catch(e => console.log(e))
        }else{
            // update
            updateVehicule(car).then(res => {}).catch(e => console.log(e))

        }

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
                        <input
                            type="text"
                            name="price"
                            value={car.price}
                            onChange={handleChange}
                            className="car-input"
                            placeholder='Price'
                        />
                        <button className="button" onClick={handleSave}>Save</button>
                    </div>
                </div>
                <div className="documents-upload-section">
                    <h3>Upload Car Image</h3>
                    <div className={`document-upload ${documents.photo ? 'approved' : ''}`}>
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Car Image
                        </div>
                        <div className="document-status">
                            {documents.photo ? 'State: Approved' : 'Upload your driving licence'}
                            <input
                                type="file"
                                name="photo"
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