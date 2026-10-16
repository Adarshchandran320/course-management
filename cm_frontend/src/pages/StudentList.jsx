
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getStudents,
  deleteStudent,
} from "../services/studentService";

const toList = (data) =>
  Array.isArray(data) ? data : data?.results ?? [];

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStudents() {
    try {
      setLoading(true);
      setError("");

      const response = await getStudents();
      setStudents(toList(response.data));
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      setStudents((previous) =>
        previous.filter(
          (student) => (student.student_id ?? student.id) !== id
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete student.");
    }
  }

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      (student.name ?? "").toLowerCase().includes(query) ||
      (student.email ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage registered students.</p>
        </div>
        <Link to="/students/new" className="primary-btn">
          + Add Student
        </Link>
      </div>

      <div className="content-card">
        <div className="table-toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5">No students found.</td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const id = student.student_id ?? student.id;

                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>
                          <div className="action-buttons">
                            <Link to={`/students/${id}/edit`}>
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="danger-btn"
                              onClick={() => handleDelete(id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
