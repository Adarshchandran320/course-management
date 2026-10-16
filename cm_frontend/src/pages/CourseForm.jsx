
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addCourse,
  getCourse,
  updateCourse,
} from "../services/courseService";

const initialForm = {
  course_name: "",
  duration: "",
  fee: "",
};

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    async function fetchCourse() {
      try {
        setLoading(true);
        const response = await getCourse(id);

        setForm({
          course_name: response.data.course_name ?? "",
          duration: response.data.duration ?? "",
          fee: response.data.fee ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.course_name.trim()) {
      setError("Course name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        course_name: form.course_name.trim(),
        duration: Number(form.duration),
        fee: form.fee,
      };

      if (isEditing) {
        await updateCourse(id, payload);
      } else {
        await addCourse(payload);
      }

      navigate("/courses");
    } catch (err) {
      console.error(err);
      const details = err.response?.data;
      setError(
        details
          ? JSON.stringify(details)
          : "Unable to save course. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading course...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{isEditing ? "Edit Course" : "Add Course"}</h1>
          <p>Enter the course information below.</p>
        </div>
      </div>

      <div className="content-card form-card">
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="course_name">Course Name</label>
            <input
              id="course_name"
              name="course_name"
              value={form.course_name}
              onChange={handleChange}
              required
              placeholder="Enter course name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              min="1"
              step="1"
              value={form.duration}
              onChange={handleChange}
              required
              placeholder="Duration in months"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fee">Course Fee (₹)</label>
            <input
              id="fee"
              name="fee"
              type="number"
              min="0"
              step="0.01"
              value={form.fee}
              onChange={handleChange}
              required
              placeholder="Enter course fee"
            />
          </div>

          <div className="form-actions">
            <Link to="/courses" className="secondary-btn">
              Cancel
            </Link>
            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : isEditing ? "Update Course" : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
