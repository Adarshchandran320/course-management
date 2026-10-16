
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../services/courseService";

const toList = (data) =>
  Array.isArray(data) ? data : data?.results ?? [];

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCourses() {
    try {
      setLoading(true);
      setError("");
      const response = await getCourses();
      setCourses(toList(response.data));
    } catch (err) {
      console.error(err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await deleteCourse(id);
      setCourses((previous) =>
        previous.filter((course) => (course.course_id ?? course.id) !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  }

  const filteredCourses = courses.filter((course) =>
    (course.course_name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p>Manage all available courses.</p>
        </div>
        <Link to="/courses/new" className="primary-btn">
          + Add Course
        </Link>
      </div>

      <div className="content-card">
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Fee</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="5">No courses found.</td>
                  </tr>
                ) : (
                  filteredCourses.map((course) => {
                    const id = course.course_id ?? course.id;

                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{course.course_name}</td>
                        <td>{course.duration}</td>
                        <td>₹{Number(course.fee).toLocaleString("en-IN")}</td>
                        <td>
                          <div className="action-buttons">
                            <Link to={`/courses/${id}`}>View</Link>
                            <Link to={`/courses/${id}/edit`}>Edit</Link>
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
