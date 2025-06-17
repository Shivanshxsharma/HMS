import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRes = await axios.get("http://localhost:5000/api/doctors");
        const appRes = await axios.get("http://localhost:5000/api/appointments");
        const patRes = await axios.get("http://localhost:5000/api/patients");

        setDoctors(docRes.data);
        setAppointments(appRes.data);
        setPatients(patRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  const getPatientName = (id) => {
    const patient = patients.find((p) => p.patient_id === id);
    return patient ? patient.name : "Unknown";
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6 overflow-y-scroll scrollbar-hide">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Doctors Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => {
          const docAppointments = appointments.filter(
            (a) => a.doctor_id === doctor.Doctor_id
          );

          return (
            <div
              key={doctor.Doctor_id}
              className="bg-blue-50 p-4 rounded-xl shadow-sm border-2 border-blue-600"
            >
              <div className="mb-2">
                <h2 className="text-lg font-bold text-blue-800">{doctor.Name}</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  ID: <span className="font-mono">{doctor.Doctor_id}</span>
                </p>
                <p className="text-sm italic text-blue-700">{doctor.Specialization}</p>
              </div>

              <h3 className="text-sm font-semibold text-blue-700 mb-1 mt-2">
                Appointments
              </h3>

              {docAppointments.length === 0 ? (
                <p className="text-gray-400 text-sm">No appointments</p>
              ) : (
                <ul className="text-sm text-gray-700 space-y-1 max-h-40 overflow-y-auto pr-1 scrollbar-hide">
                  {docAppointments.map((a) => (
                    <li
                      key={a._id}
                      className="border border-gray-200 p-2 rounded bg-white"
                    >
                      <div>
                        <strong>Patient:</strong> {getPatientName(a.patient_id)}{" "}
                        <span className="text-gray-500">({a.patient_id})</span>
                      </div>
                      <div><strong>Date:</strong> {a.date}</div>
                      <div><strong>Time:</strong> {a.time}</div>
                      <div><strong>Status:</strong> {a.status}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
