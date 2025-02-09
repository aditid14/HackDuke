export default function ScreeningResults({ results, generateSchedule }) {
    if (!results) return null;
  
    return (
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
  
        <button onClick={generateSchedule} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full mt-4">
          Generate My Screening Schedule
        </button>
  
        {results.schedule && (
          <div className="mt-6 w-full max-w-md bg-green-100 border border-green-300 p-4 rounded-lg">
            <h2 className="font-semibold text-green-800">Your Screening Schedule</h2>
            <ul className="list-disc list-inside text-green-700">
              {results.schedule.map((item, index) => (
                <li key={index}>
                  <strong>{item.screening}</strong> at <em>{item.clinic}</em> - {item.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  