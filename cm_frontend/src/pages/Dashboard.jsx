
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";
import { getStudents } from "../services/studentService";
import { getEnrollments } from "../services/enrollmentService";

const toList = (data) =>
  Array.isArray(data) ? data : data?.results ?? [];

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);

        const [courseRes, studentRes, enrollmentRes] =
          await Promise.all([
            getCourses(),
            getStudents(),
            getEnrollments(),
          ]);

        setCourses(toList(courseRes.data));
        setStudents(toList(studentRes.data));
        setEnrollments(toList(enrollmentRes.data));
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your Course Management System.</p>
        </div>
        <Link to="/courses/new" className="primary-btn">
          + Add Course
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="stats-grid">
        <StatCard
          title="Total Courses"
          value={courses.length}
          icon="▤"
          description="Available courses"
          accent="indigo"
        />
        <StatCard
          title="Total Students"
          value={students.length}
          icon="♙"
          description="Registered students"
          accent="blue"
        />
        <StatCard
          title="Total Enrollments"
          value={enrollments.length}
          icon="✓"
          description="Enrollment records"
          accent="green"
        />
      </div>

      <div className="section-header">
        <h2>Courses</h2>
        <Link to="/courses">View All →</Link>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="course-grid">
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.course_id ?? course.id}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
}
