import { useState } from "react";
import AddPatient from "./AddPatients";
import ViewPatients from "./ViewPatients";
import AppointmentEntry from "./AppointmentEntry";
import DoctorDashboard from "./DoctorsDashboard"; // ✅ import dashboard
import "./output.css";

function App() {
  const [view, setView] = useState("patient");

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6">
      <div className="w-screen px-5">
        <h1 className="text-blue-600 font-bold text-4xl">Long-Life Hospital</h1>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6 mt-4">
        <button
          onClick={() => setView("patient")}
          className={`px-4 py-2 rounded ${
            view === "patient" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          ➕ Add Patient
        </button>
        <button
          onClick={() => setView("appointment")}
          className={`px-4 py-2 rounded ${
            view === "appointment" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          📅 Add Appointment
        </button>
        <button
          onClick={() => setView("doctors")}
          className={`px-4 py-2 rounded ${
            view === "doctors" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          👨‍⚕️ Doctors
        </button>
      </div>

      {/* Conditional Rendering */}
      {view === "patient" ? (
        <>
          <AddPatient />
          <ViewPatients />
        </>
      ) : view === "appointment" ? (
        <AppointmentEntry />
      ) : (
        <DoctorDashboard />
      )}
    </div>
  );
}

export default App;

