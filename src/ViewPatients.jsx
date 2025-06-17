import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/patients")
      .then(res => {
        setPatients(res.data);
      })
      .catch(err => {
        console.error("Error fetching patients:", err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-8">
      <h2 className="text-2xl font-semibold text-black mb-4 border-b pb-2">All Patients</h2>
      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {patients.map(p => (
            <li key={p._id} className="py-2 flex justify-between items-center">
              <span className="text-black">{p.name}</span>
              <span className="text-sm text-black">ID: {p.patient_id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

