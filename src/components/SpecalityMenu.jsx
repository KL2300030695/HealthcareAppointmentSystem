import React, { useEffect, useState } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = ({ isVisible }) => {
  useEffect(() => {
    console.log(`Loaded ${specialityData?.length || 0} specialities.`);
  }, []);

  if (!isVisible) return null; // Hide component if isVisible is false

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="specialist">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors and schedule your appointments.
      </p>

      {/* Speciality List */}
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto">
        {specialityData && specialityData.length > 0 ? (
          specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-16 h-16"
                onError={(e) => {
                  e.target.src = "/default-image.png"; // Set a fallback image
                  console.error(`Failed to load image for ${item.speciality}: ${item.image}`);
                }}
              />
              <p className="mt-2 text-lg font-semibold">{item.speciality}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No specialities available.</p>
        )}
      </div>
    </div>
  );
};

export default SpecialityMenu;
