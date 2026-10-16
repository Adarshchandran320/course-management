
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../services/courseService";

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await getCourse(id);
        setCourse(response.data);
      } catch (err) {
        console.error(err);
        setError("Course not found or unable to load details.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;

  if (error) return <p className="error-message">{error}</p>;

  if (!course) return <p>No course found.</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Course Details</h1>
          <p>View course information.</p>
        </div>

        <Link to={`/courses/${id}/edit`} className="primary-btn">
          Edit Course
        </Link>
      </div>

      <div className="content-card details-card">
        <h2>{course.course_name}</h2>

        <div className="details-row">
          <span>Course ID</span>
          <strong>{course.course_id ?? course.id}</strong>
        </div>

        <div className="details-row">
          <span>Course Name</span>
          <strong>{course.course_name}</strong>
        </div>

        <div className="details-row">
          <span>Duration</span>
          <strong>{course.duration}</strong>
        </div>

        <div className="details-row">
          <span>Course Fee</span>
          <strong>
            ₹{Number(course.fee).toLocaleString("en-IN")}
          </strong>
        </div>

        <Link to="/courses" className="secondary-btn">
          ← Back to Courses
        </Link>
      </div>
    </div>
  );
}
