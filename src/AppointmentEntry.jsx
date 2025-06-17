import { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentEntry() {
  const [form, setForm] = useState({
    appointment_id: "",
    patient_id: "",
    doctor_id: "",
    date: "",
    time: "",
    status: "Not Confirmed Yet",
  });

  const [appointments, setAppointments] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments", form);
      alert("Appointment added!");
      setForm({
        appointment_id: "",
        patient_id: "",
        doctor_id: "",
        date: "",
        time: "",
        status: "Not Confirmed Yet",
      });
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to add appointment");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-6 rounded-xl shadow-md space-y-5 border border-blue-200"
      >
        <h2 className="text-2xl font-bold text-blue-600">
          Add New Appointment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="appointment_id"
            value={form.appointment_id}
            onChange={handleChange}
            placeholder="Appointment ID"
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            name="patient_id"
            value={form.patient_id}
            onChange={handleChange}
            placeholder="Patient ID"
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            placeholder="Doctor ID"
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Time (e.g., 10:00 AM)"
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border border-blue-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-600"
          >
            <option value="Not Confirmed Yet">Not Confirmed Yet</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Appointment
        </button>
      </form>

      {/* Appointment List Section */}
      <div className="mt-10 bg-blue-50 shadow-md p-6 rounded-xl border border-blue-200">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Appointments List
        </h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <table className="min-w-full border border-blue-200">
            <thead>
              <tr className="bg-blue-100 text-left text-blue-800 text-sm uppercase">
                <th className="p-2 border">Appointment ID</th>
                <th className="p-2 border">Patient ID</th>
                <th className="p-2 border">Doctor ID</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="text-sm text-gray-700 bg-white hover:bg-blue-50 transition">
                  <td className="p-2 border">{a.appointment_id}</td>
                  <td className="p-2 border">{a.patient_id}</td>
                  <td className="p-2 border">{a.doctor_id}</td>
                  <td className="p-2 border">{a.date}</td>
                  <td className="p-2 border">{a.time}</td>
                  <td className="p-2 border">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
