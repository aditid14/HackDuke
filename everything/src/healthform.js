import { useState } from "react";

export default function HealthForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    conditions: [],
    familyHistory: [],
    lifestyle: [],
    age: "",
    gender: "",
    zipCode: "",
    insurancePlan: "",
    availability: [],
    distance: "",
    urgency: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent component (App.js)
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Health Screening Recommender</h1>
      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-blue-200">
        
        <input name="age" placeholder="Age" onChange={handleChange} className="border-blue-400 p-2 rounded w-full" />
        
        <select name="gender" onChange={handleChange} className="border-blue-400 p-2 rounded w-full">
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        
        <input name="zipCode" placeholder="ZIP Code" onChange={handleChange} className="border-blue-400 p-2 rounded w-full" />
        
        <input name="insurancePlan" placeholder="Insurance Plan" onChange={handleChange} className="border-blue-400 p-2 rounded w-full" />
        
        {/* Health Conditions */}
        <h3>Current Health Conditions (Select all that apply)</h3>
        <label><input type="checkbox" name="conditions" value="cancer" onChange={handleChange} /> Cancer</label>
        <label><input type="checkbox" name="conditions" value="diabetes" onChange={handleChange} /> Diabetes</label>
        <label><input type="checkbox" name="conditions" value="heartDisease" onChange={handleChange} /> Heart Disease</label>

        {/* Availability */}
        <h3>Availability (Select all that apply)</h3>
        <label><input type="checkbox" name="availability" value="morning" onChange={handleChange} /> Morning</label>
        <label><input type="checkbox" name="availability" value="afternoon" onChange={handleChange} /> Afternoon</label>
        <label><input type="checkbox" name="availability" value="evening" onChange={handleChange} /> Evening</label>

        {/* Preferred Clinic Distance */}
        <input type="number" name="distance" placeholder="Max Distance (miles)" onChange={handleChange} className="border-blue-400 p-2 rounded w-full" />

        {/* Urgency */}
        <select name="urgency" onChange={handleChange} className="border-blue-400 p-2 rounded w-full">
          <option value="">Select Urgency Level</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full">
          Get Recommendations
        </button>
      </form>
    </div>
  );
}
