// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// import { getStudents, deleteStudent } from "../services/studentService";

// import AlertMessage from "../components/AlertMessage";

// export default function Dashboard() {
//   const location = useLocation();

//   const [students, setStudents] = useState([]);

//   const [nextPage, setNextPage] = useState(null);
//   const [previousPage, setPreviousPage] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);

//   const [message, setMessage] = useState(location.state?.message || "");

//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadStudents(1);
//   }, []);

//   const loadStudents = async (page = 1) => {
//     try {
//       setError("");

//       const data = await getStudents(page);

//       setStudents(data.results || []);

//       setNextPage(data.next);
//       setPreviousPage(data.previous);

//       setCurrentPage(page);
//     } catch (error) {
//       console.log(error.response?.data);

//       setError(error.response?.data?.detail || "Unable to load students.");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this student?",
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       await deleteStudent(id);

//       setMessage("Student deleted successfully!");

//       loadStudents(currentPage);
//     } catch (error) {
//       console.log(error.response?.data);

//       setError(error.response?.data?.detail || "Unable to delete student.");
//     }
//   };

//   const handleNext = () => {
//     if (nextPage) {
//       loadStudents(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (previousPage && currentPage > 1) {
//       loadStudents(currentPage - 1);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       {/* Header */}

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">Student Management</h2>

//           <p className="text-muted">Manage all registered students</p>
//         </div>

//         <Link to="/students/add" className="btn btn-primary">
//           + Add Student
//         </Link>
//       </div>

//       {/* Alerts */}

//       <AlertMessage
//         message={message}
//         type="success"
//         onClose={() => setMessage("")}
//       />

//       <AlertMessage
//         message={error}
//         type="danger"
//         onClose={() => setError("")}
//       />

//       {/* Student table */}

//       <div className="card shadow-sm">
//         <div className="card-body p-0">
//           <div className="table-responsive">
//             <table className="table table-hover table-bordered mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Age</th>
//                   <th>Course</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {students.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-5">
//                       No students found.
//                     </td>
//                   </tr>
//                 ) : (
//                   students.map((student) => (
//                     <tr key={student.id}>
//                       <td>{student.id}</td>

//                       <td className="fw-semibold">{student.name}</td>

//                       <td>{student.email}</td>

//                       <td>{student.age}</td>
//                       <td>{student.course}</td>

//                       <td>
//                         <Link
//                           to={`/students/edit/${student.id}`}
//                           className="btn btn-sm btn-warning me-2"
//                         >
//                           Edit
//                         </Link>

//                         <button
//                           onClick={() => handleDelete(student.id)}
//                           className="btn btn-sm btn-danger"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}

//       <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
//         <button
//           className="btn btn-outline-primary"
//           disabled={!previousPage}
//           onClick={handlePrevious}
//         >
//           ← Previous
//         </button>

//         <span className="fw-semibold">Page {currentPage}</span>

//         <button
//           className="btn btn-outline-primary"
//           disabled={!nextPage}
//           onClick={handleNext}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getStudents, deleteStudent } from "../services/studentService";

import AlertMessage from "../components/AlertMessage";

export default function Dashboard() {
  const location = useLocation();

  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState(location.state?.message || "");

  // GET STUDENTS

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["students", currentPage],

    queryFn: () => getStudents(currentPage),

    keepPreviousData: true,
  });

  // DELETE STUDENT

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      setMessage("Student deleted successfully!");

      // Refresh student list
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });

  // DATA

  const students = data?.results || [];

  const nextPage = data?.next;

  const previousPage = data?.previous;

  // =========================
  // DELETE HANDLER
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    deleteMutation.mutate(id);
  };

  // LOADING

  if (isLoading) {
    return (
      <div className="container mt-4">
        <h3>Loading students...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Student Management</h2>

          <p className="text-muted">Manage all registered students</p>
        </div>

        <Link to="/students/add" className="btn btn-primary">
          + Add Student
        </Link>
      </div>

      {/* Success Message */}

      <AlertMessage
        message={message}
        type="success"
        onClose={() => setMessage("")}
      />

      {/* Error Message */}

      <AlertMessage
        message={
          isError
            ? error?.response?.data?.detail || "Unable to load students."
            : deleteMutation.isError
              ? deleteMutation.error?.response?.data?.detail ||
                "Unable to delete student."
              : ""
        }
        type="danger"
        onClose={() => {}}
      />

      {/* Student Table */}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-bordered mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>

                      <td className="fw-semibold">{student.name}</td>

                      <td>{student.email}</td>

                      <td>{student.age}</td>

                      <td>{student.course}</td>

                      <td>
                        <Link
                          to={`/students/edit/${student.id}`}
                          className="btn btn-sm btn-warning me-2"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(student.id)}
                          className="btn btn-sm btn-danger"
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-outline-primary"
          disabled={!previousPage}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          ← Previous
        </button>

        <span className="fw-semibold">Page {currentPage}</span>

        <button
          className="btn btn-outline-primary"
          disabled={!nextPage}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
