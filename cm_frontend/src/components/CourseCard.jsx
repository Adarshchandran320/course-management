
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  if (!course) return null;

  const courseId = course.course_id ?? course.id;
  const courseName = course.course_name ?? "Untitled Course";
  const duration = course.duration ?? "—";
  const fee = Number(course.fee);

  return (
    <article className="course-card">
      <div className="course-card-icon">▤</div>

      <h3>{courseName}</h3>

      <div className="course-card-details">
        <p>
          <span>Duration</span>
          <strong>{duration}</strong>
        </p>

        <p>
          <span>Course fee</span>
          <strong>
            {Number.isFinite(fee)
              ? `₹${fee.toLocaleString("en-IN")}`
              : "Not set"}
          </strong>
        </p>
      </div>

      {courseId != null && (
        <Link
          className="course-card-link"
          to={`/courses/${courseId}`}
        >
          View course <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}
