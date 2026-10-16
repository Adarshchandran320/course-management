
import { useEffect, useState } from "react";
import { getEnrollments } from "../services/enrollmentService";

const toList = (data) =>
  Array.isArray(data) ? data : data?.results ?? [];

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const response = await getEnrollments();
        setEnrollments(toList(response.data));
      } catch (err) {
        console.error(err);
        setError("Failed to load enrollments.");
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Enrollments</h1>
          <p>View enrollment records.</p>
        </div>
      </div>

      <div className="content-card">
        {loading ? (
          <p>Loading enrollments...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Enrollment Name</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan="3">No enrollment records found.</td>
                  </tr>
                ) : (
                  enrollments.map((enrollment, index) => (
                    <tr
                      key={
                        enrollment.id ??
                        enrollment.enrollment_id ??
                        index
                      }
                    >
                      <td>
                        {enrollment.id ??
                          enrollment.enrollment_id ??
                          "—"}
                      </td>
                      <td>{enrollment.name ?? "—"}</td>
                      <td>
                        {Array.isArray(enrollment.students)
                          ? enrollment.students
                              .map((student) =>
                                typeof student === "object"
                                  ? student.name ??
                                    student.student_id ??
                                    student.id
                                  : student
                              )
                              .join(", ") || "No students"
                          : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
