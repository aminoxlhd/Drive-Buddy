import React, { useState, ChangeEvent, useEffect } from 'react';
import "./Mycar.scss"
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { useParams } from 'react-router-dom';
import { createVehicule, getVehicule, updateVehicule } from '../../services/vehicule/VehiculeService';
import {  uploadImage } from '../../services/cloudinary/cloudinary';


interface Documents {
    photo: File | null;
    insurance: File | null;
    certification: File | null;
    carDetails: File | null;
}



const MyCar = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("Vehicule Updated")

    const [showMessage, setShowMessage] = useState(false)
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
          const selectedFile = files[0]; 
      
          try {
            const url = await uploadImage(selectedFile);
            if (url) {
              car.imageUrl = url;
              setDocuments({ ...documents, [name]: null }); 
            } else {
              console.error('Error uploading image');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
          }
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
            setMessage("Vehicule Created")
        }else{
            // update
            updateVehicule(car).then(res => {}).catch(e => console.log(e))
        }
        setShowMessage(true)
    };

    return (
        <div className='container'>
            <div className="my-car-container">
                <div className="car-image-section">
                    { showMessage && <h3 style={{color : 'green'}}>{message}</h3>}
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
                    <img src={car.imageUrl} alt={car.title} className="car-image" />

                    <div className={`document-upload ${car.imageUrl ? 'approved' : ''}`}>
                        <div className="document-label">
                            <span className="icon">📄</span>
                            Car Image
                        </div>
                        <div className="document-status">
                            {documents.photo ? 'State: Approved' : 'Upload your car image'}
                            <input
                                type="file"
                                name="photo"
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