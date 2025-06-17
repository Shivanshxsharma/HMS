import { useState, useEffect } from "react";
import axios from "axios";

export default function AddPatient() {
  const [form, setForm] = useState({
    patient_id: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  const [patients, setPatients] = useState([]);

  // Fetch patient list
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patients", form);
      alert("Patient added!");
      setForm({ patient_id: "", name: "", age: "", gender: "", phone: "" });
      fetchPatients(); // refresh list
    } catch (err) {
      alert("Error adding patient.");
    }
  };

  return (
    <div className="min-h-screen bg-{#11111} p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Patient List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Patient List</h2>
          {patients.length === 0 ? (
            <p className="text-gray-500">No patients yet.</p>
          ) : (
            <ul className="space-y-2 max-h-[450px] overflow-y-auto">
             {patients.map((p) => {
              // console.log(p); // 👈 Check what keys are coming from MongoDB
           return (
    <li key={p._id} className="p-3 bg-blue-50  border-blue-600 border rounded-md shadow-sm">
      <div className="font-semibold text-black">{p.name}</div>
      <div className="text-sm text-black">
        ID: {p.patient_id}| Age:{p.age} | Gender: {p.gender}
      </div>
      <div className="text-sm text-black">Phone: {p.phone}</div>
    </li>
            );
             })}

            </ul>
          )}
        </div>

        {/* Right: Add Patient Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 border-2  border-blue-600 p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-600">Add New Patient</h2>

          <div className="grid grid-cols-1 gap-4">
            <input
              name="patient_id"
              value={form.patient_id}
              onChange={handleChange}
              placeholder="Patient ID"
              type="number"
              className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              type="number"
              className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              type="number"
              className="border text-black border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}

