
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addStudent,
  getStudent,
  updateStudent,
} from "../services/studentService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
};

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    async function fetchStudent() {
      try {
        const response = await getStudent(id);

        setForm({
          name: response.data.name ?? "",
          email: response.data.email ?? "",
          phone: response.data.phone ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load student.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
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

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      if (isEditing) {
        await updateStudent(id, payload);
      } else {
        await addStudent(payload);
      }

      navigate("/students");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to save student."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading student...</p>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{isEditing ? "Edit Student" : "Add Student"}</h1>
          <p>Enter the student information.</p>
        </div>
      </div>

      <div className="content-card form-card">
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-actions">
            <Link to="/students" className="secondary-btn">
              Cancel
            </Link>
            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : isEditing ? "Update Student" : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
