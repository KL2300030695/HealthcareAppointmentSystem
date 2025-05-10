import React from 'react';
import './Doctors.css'; // Ensure you have the CSS file for styling

// Import images
import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';
import doc6 from '../assets/doc6.png';
import doc7 from '../assets/doc7.png';
import doc8 from '../assets/doc8.png';
import doc9 from '../assets/doc9.png';
import doc10 from '../assets/doc10.png';
import doc11 from '../assets/doc11.png';
import doc12 from '../assets/doc12.png';
import doc13 from '../assets/doc13.png';
import doc14 from '../assets/doc14.png';
import doc15 from '../assets/doc15.png';

const doctors = [
  { name: 'Dr. John Doe', specialty: 'Cardiologist', image: doc1 },
  { name: 'Dr. Jane Smith', specialty: 'Dermatologist', image: doc2 },
  { name: 'Dr. Mike Johnson', specialty: 'Neurologist', image: doc3 },
  { name: 'Dr. Sarah Williams', specialty: 'Pediatrician', image: doc4 },
  { name: 'Dr. Robert Brown', specialty: 'Orthopedic Surgeon', image: doc5 },
  { name: 'Dr. Emily Davis', specialty: 'Oncologist', image: doc6 },
  { name: 'Dr. William Wilson', specialty: 'Psychiatrist', image: doc7 },
  { name: 'Dr. Olivia Taylor', specialty: 'Endocrinologist', image: doc8 },
  { name: 'Dr. James Martinez', specialty: 'Urologist', image: doc9 },
  { name: 'Dr. Sophia Anderson', specialty: 'Nephrologist', image: doc10 },
  { name: 'Dr. Daniel Thomas', specialty: 'Pulmonologist', image: doc11 },
  { name: 'Dr. Isabella Hernandez', specialty: 'Gastroenterologist', image: doc12 },
  { name: 'Dr. Michael White', specialty: 'Ophthalmologist', image: doc13 },
  { name: 'Dr. Elizabeth Clark', specialty: 'Hematologist', image: doc14 },
  { name: 'Dr. Benjamin Lewis', specialty: 'General Surgeon', image: doc15 },
];

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h1 className="doctors-title">Our Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" loading="lazy" />
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-specialty">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
