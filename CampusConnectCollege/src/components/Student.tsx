import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
const Student = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`auth/student/${id}`);
        setStudent(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Student not found
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 ml-50 px-6 py-10 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Detail label="Name" value={student.username} />
          <Detail label="Roll Number" value={student.rollNumber} />
          <Detail label="Email" value={student.email} />
          <Detail label="Mobile" value={student.mobile || "—"} />
          <Detail label="Class" value={student.class} />
          <Detail label="Department" value={student.department} />
          <Detail
            label="Status"
            value={
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  student.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {student.status}
              </span>
            }
          />
          <Detail label="Date of Birth" value={student.dob || "—"} />
          <Detail label="Address" value={student.address || "—"} />
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(`/admin/students/edit/${student.id}`)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Edit Student
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="px-6 py-2 border rounded-lg"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-900 mt-1">{value}</p>
  </div>
);


export default Student;
