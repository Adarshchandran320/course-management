
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import CourseList from "./pages/CourseList";
import CourseForm from "./pages/CourseForm";
import CourseDetails from "./pages/CourseDetails";
import StudentList from "./pages/StudentList";
import StudentForm from "./pages/StudentForm";
import EnrollmentList from "./pages/EnrollmentList";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/new" element={<CourseForm />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/edit" element={<CourseForm />} />

          <Route path="/students" element={<StudentList />} />
          <Route path="/students/new" element={<StudentForm />} />
          <Route path="/students/:id/edit" element={<StudentForm />} />

          <Route path="/enrollments" element={<EnrollmentList />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
