import { useState } from "react";
import axios from "axios";

export default function HealthScreeningApp() {
  const [formData, setFormData] = useState({
    conditions: [],
    familyHistory: [],
    lifestyle: [],
    age: "",
    gender: "",
    zipCode: "",
    insurancePlan: "",
  });
  const [results, setResults] = useState(null);
  const [clinics, setClinics] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Placeholder for screening recommendation logic based on user input
    setResults({
      screenings: ["Blood Pressure Check", "Cholesterol Test"],
      locations: ["General Hospital, 5 miles away", "Health Clinic, 8 miles away"],
    });

    try {
      const apiKey = "1c46fa169a1241b9bcb36dcf4544a855";
      const zipCode = formData.zipCode;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${apiKey}`;

      const response = await axios.get(url);
      const locationData = response.data.results;

      if (locationData.length > 0) {
        const clinicsNearZipCode = locationData.map((location) => ({
          name: location.formatted_address,
          latitude: location.geometry.lat,
          longitude: location.geometry.lng
        }));

        setClinics(clinicsNearZipCode);
      } else {
        setClinics([]);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setClinics([]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Health Screening Recommender</h1>
      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-blue-200">
        {/* Age, Gender, Zip Code, Insurance */}
        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="border-blue-400 p-2 rounded w-full"
        />
        <select
          name="gender"
          onChange={handleChange}
          className="border-blue-400 p-2 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <input
          name="zipCode"
          placeholder="ZIP Code"
          onChange={handleChange}
          className="border-blue-400 p-2 rounded w-full"
        />
        <input
          name="insurancePlan"
          placeholder="Insurance Plan"
          onChange={handleChange}
          className="border-blue-400 p-2 rounded w-full"
        />
        
        {/* Conditions */}
        <div>
          <h3>Current Health Conditions</h3>
          <input
            type="checkbox"
            name="conditions"
            value="cancer"
            onChange={handleChange}
          /> Cancer
          <input
            type="checkbox"
            name="conditions"
            value="diabetes"
            onChange={handleChange}
          /> Diabetes
          <input
            type="checkbox"
            name="conditions"
            value="heartDisease"
            onChange={handleChange}
          /> Heart Disease
        </div>
        
        {/* Family History */}
        <div>
          <h3>Family History</h3>
          <input
            type="checkbox"
            name="familyHistory"
            value="breastCancer"
            onChange={handleChange}
          /> Breast Cancer
          <input
            type="checkbox"
            name="familyHistory"
            value="prostateCancer"
            onChange={handleChange}
          /> Prostate Cancer
          <input
            type="checkbox"
            name="familyHistory"
            value="other"
            onChange={handleChange}
          /> Other
        </div>

        {/* Lifestyle Habits */}
        <div>
          <h3>Lifestyle Habits</h3>
          <input
            type="checkbox"
            name="lifestyle"
            value="smoking"
            onChange={handleChange}
          /> Smoking
          <input
            type="checkbox"
            name="lifestyle"
            value="exercise"
            onChange={handleChange}
          /> Regular Exercise
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full">
          Get Recommendations
        </button>
      </form>
      {results && (
        <div className="mt-6 w-full max-w-md bg-blue-100 border border-blue-300 p-4 rounded-lg">
          <h2 className="font-semibold text-blue-800">Recommended Screenings</h2>
          <ul className="list-disc list-inside text-blue-700">
            {results.screenings.map((screening, index) => (
              <li key={index}>{screening}</li>
            ))}
          </ul>
          <h2 className="font-semibold mt-3 text-blue-800">Nearby Locations</h2>
          <ul className="list-disc list-inside text-blue-700">
            {results.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}