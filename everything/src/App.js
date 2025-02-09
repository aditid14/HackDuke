import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    conditions: [],
    familyHistory: [],
    lifestyle: [],
    age: "",
    gender: "",
    zipCode: "",
    insurancePlan: "",
    symptoms: "", // New field for symptoms
  });
  const [results, setResults] = useState(null);
  const [bgColor, setBgColor] = useState("rgb(75, 156, 211)");

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

    // Mock results based on the form data
    const mockResults = {
      screenings: ["Blood Pressure Check", "Cholesterol Test"], // Example screenings
      locations: [
        "General Hospital, 5 miles away",
        "Health Clinic, 8 miles away",
      ], // Example locations
      conditions: ["Diabetes", "Heart Disease"], // Example conditions
      advice: "It is advisable to monitor your blood sugar levels and cholesterol.", // Example advice
    };

    // Set mock results as the response
    setResults(mockResults);
  };

  // Function to generate calendar link
  const generateCalendar = (screenings) => {
    const calendarHeader = "BEGIN:VCALENDAR\nVERSION:2.0\n";
    const calendarFooter = "END:VCALENDAR";
    const events = screenings.map((screening, index) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + index * 2); // Scheduling screenings every 2 days

      return `BEGIN:VEVENT\nSUMMARY:${screening}\nDTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}\nDTEND:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}\nDESCRIPTION:Reminder for your health screening.\nEND:VEVENT\n`;
    });

    const icsContent = calendarHeader + events.join("") + calendarFooter;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    return url;
  };

  // Handle the scheduling request (download .ics file)
  const handleScheduleRequest = () => {
    if (results && results.screenings) {
      const icsLink = generateCalendar(results.screenings);
      window.open(icsLink, "_blank"); // Open the generated .ics file in a new tab for download
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgb(187, 222, 250)" }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      {/* Navbar */}
      <nav className="w-full bg-blue-700 text-white py-4 text-center text-xl font-bold shadow-md">
        Health Screening Recommender
      </nav>

      <div className="max-w-md w-full bg-white p-6 mt-6 rounded-2xl shadow-lg border border-blue-200 text-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="border p-2 rounded w-full text-center"
          />
          <select
            name="gender"
            onChange={handleChange}
            className="border p-2 rounded w-full text-center"
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
            className="border p-2 rounded w-full text-center"
          />
          <input
            name="insurancePlan"
            placeholder="Insurance Plan"
            onChange={handleChange}
            className="border p-2 rounded w-full text-center"
          />

          {/* Health Conditions */}
          <h2 className="text-lg font-semibold">Health Conditions</h2>
          <label className="block">
            <input
              type="checkbox"
              name="conditions"
              value="cancer"
              onChange={handleChange}
            />{" "}
            Cancer
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="conditions"
              value="diabetes"
              onChange={handleChange}
            />{" "}
            Diabetes
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="conditions"
              value="heartDisease"
              onChange={handleChange}
            />{" "}
            Heart Disease
          </label>

          {/* Family History */}
          <h2 className="text-lg font-semibold">Family History</h2>
          <label className="block">
            <input
              type="checkbox"
              name="familyHistory"
              value="breastCancer"
              onChange={handleChange}
            />{" "}
            Breast Cancer
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="familyHistory"
              value="prostateCancer"
              onChange={handleChange}
            />{" "}
            Prostate Cancer
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="familyHistory"
              value="other"
              onChange={handleChange}
            />{" "}
            Other
          </label>

          {/* Lifestyle Habits */}
          <h2 className="text-lg font-semibold">Lifestyle Habits</h2>
          <label className="block">
            <input
              type="checkbox"
              name="lifestyle"
              value="smoking"
              onChange={handleChange}
            />{" "}
            Smoking
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="lifestyle"
              value="exercise"
              onChange={handleChange}
            />{" "}
            Regular Exercise
          </label>

          {/* Symptoms Input */}
          <h2 className="text-lg font-semibold">Describe Your Symptoms</h2>
          <textarea
            name="symptoms"
            placeholder="Describe your symptoms here"
            onChange={handleChange}
            className="border p-2 rounded w-full text-center"
          />

          {/* Submit Button */}
          <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
            Get Recommendations
          </button>
        </form>
      </div>

      {/* Show recommendations after form submission */}
      {results && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="font-semibold">Recommended Screenings</h2>
          <ul>
            {results.screenings.map((screening, index) => (
              <li key={index}>{screening}</li>
            ))}
          </ul>

          {/* Display Conditions or Advice */}
          {results.conditions && (
            <>
              <h3 className="font-semibold mt-4">Potential Conditions</h3>
              <ul>
                {results.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </>
          )}

          {results.advice && (
            <>
              <h3 className="font-semibold mt-4">Advice</h3>
              <p>{results.advice}</p>
            </>
          )}

          <h3 className="font-semibold mt-4">Nearby Locations</h3>
          <ul>
            {results.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>

          {/* Button to download the schedule */}
          <button
            onClick={handleScheduleRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Download Your Schedule
          </button>
        </div>
      )}
    </div>
  );
}
