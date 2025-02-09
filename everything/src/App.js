import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    conditions: [],
    healthHistory: [],
    lifestyle: [],
    age: "",
    gender: "",
    zipCode: "",
    insurancePlan: "",
    symptoms: "", // New field for symptoms
  });
  const [results, setResults] = useState(null);
  const [step, setStep] = useState(0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

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
    setResults({
      screenings: ["Blood Pressure Check", "Cholesterol Test"],
      locations: ["General Hospital, 5 miles away", "Health Clinic, 8 miles away"],
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

  // FRONT PAGE (step = 0)
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
        <button
          onClick={() => setStep(1)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded"
        >
          Get Personalized Screening Plan
          </button>
        </div>
    );
  }

  // FORM PAGES (step >= 1)
  return (
    <div className="max-w-lg mx-auto p-4 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="w-full text-center text-2xl font-bold mb-4 text-blue-800">OncoCheck</h1>
      
      <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden mb-6">
        <div
          className="bg-green-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-blue-200">
        {step === 1 && (
          <div className="flex flex-col space-y-3">
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
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
            >
              Next
            </button>
          </div>
        )}

{step === 2 && (
  <div className="flex flex-col space-y-3">
    <div>
      <h3>Current Health Conditions</h3>
      <input
        type="checkbox"
        name="conditions"
        value="cancer"
        onChange={handleChange}
      /> Cancer
      <br />
      <input
        type="checkbox"
        name="conditions"
        value="diabetes"
        onChange={handleChange}
      /> Diabetes
      <br />
      <input
        type="checkbox"
        name="conditions"
        value="heartDisease"
        onChange={handleChange}
      /> Heart Disease
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Back
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
)}

{step === 3 && (
  <div className="flex flex-col space-y-3">
    <div>
      <h3>Health History</h3>
      <input
        type="checkbox"
        name="healthHistory"
        value="brcaMutation"
        onChange={handleChange}
      /> Known BRCA1 or BRCA2 gene mutation
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="firstDegreeRelativeBrca"
        onChange={handleChange}
      /> First-degree relative with BRCA1 or BRCA2 gene mutation, and no genetic testing
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="radiationTherapy"
        onChange={handleChange}
      /> Radiation therapy to the chest before 30 years old
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> Li-Fraumeni syndrome, Cowden syndrome, or Bannayan-Riley-Ruvalcaba syndrome, or first-degree relatives
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> A personal history of colorectal cancer or certain types of polyps
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> family history of colorectal cancer
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> A personal history of inflammatory bowel disease (ulcerative colitis or Crohn’s disease)
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> A confirmed or suspected hereditary colorectal cancer syndrome
      <br />
      <input
        type="checkbox"
        name="healthHistory"
        value="geneticSyndrome"
        onChange={handleChange}
      /> A personal history of getting radiation to the abdomen or pelvic area
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Back
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
)}

        {step === 4 && (
          <div className="flex flex-col space-y-3">
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
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        )}
      </form>

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
