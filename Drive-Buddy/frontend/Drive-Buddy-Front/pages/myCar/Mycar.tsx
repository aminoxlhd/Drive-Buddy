import React, { useState, ChangeEvent } from 'react';
import "./Mycar.scss"

interface Car {
    id: string;
    imageUrl: string;
    title: string;
    category: string;
    ownerName: string;
    location: string;
}

interface Documents {
    drivingLicence: File | null;
    insurance: File | null;
    certification: File | null;
    carDetails: File | null;
}

interface MyCarProps {
    car: Car;
}

const MyCar: React.FC<MyCarProps> = ({ car }) => {
    const [carDetails, setCarDetails] = useState<Car>(car);
    const [documents, setDocuments] = useState<Documents>({
        drivingLicence: null,
        insurance: null,
        certification: null,
        carDetails: null,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setDocuments({ ...documents, [name]: files[0] });
        }
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Car Details:', carDetails);
        console.log('Documents:', documents);
    };

    return (
        <div className='container'>
            <div className="my-car-container">
                <div className="car-image-section">
                    <img src={carDetails.imageUrl} alt={carDetails.title} className="car-image" />
                    <div className="car-info">
                        <input
                            type="text"
                            name="title"
                            value={carDetails.title}
                            onChange={handleInputChange}
                            className="car-input"
                        />
                        <input
                            type="text"
                            name="category"
                            value={carDetails.category}
                            onChange={handleInputChange}
                            className="car-input"
                        />
                        <input
                            type="text"
                            name="ownerName"
                            value={carDetails.ownerName}
                            onChange={handleInputChange}
                            className="car-input"
                        />
                        <input
                            type="text"
                            name="location"
                            value={carDetails.location}
                            onChange={handleInputChange}
                            className="car-input"
                        />
                        <button className="button" onClick={handleSave}>Save</button>
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
