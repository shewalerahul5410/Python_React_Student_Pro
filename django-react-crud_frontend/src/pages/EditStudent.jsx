// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { getStudent, updateStudent } from "../services/studentService";

// import StudentForm from "../components/StudentForm";
// import AlertMessage from "../components/AlertMessage";

// export default function EditStudent() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     course: "",
//   });

//   const [error, setError] = useState();

//   useEffect(() => {
//     loadStudent();
//   }, [id]);

//   const loadStudent = async () => {
//     try {
//       const data = await getStudent(id);

//       setFormData({
//         name: data.name || "",
//         email: data.email || "",
//         age: data.age || "",
//         course: data.course || "",
//       });
//     } catch (error) {
//       console.log(error);

//       setError("Unable to load student.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await updateStudent(id, formData);

//       navigate("/dashboard", {
//         state: {
//           message: "Student updated successfully!",
//         },
//       });
//     } catch (error) {
//       console.log(error.response?.data);

//       setError(JSON.stringify(error.response?.data || "Update failed"));
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-7">
//           <div className="card shadow">
//             <div className="card-header bg-warning">
//               <h4 className="mb-0">Edit Student</h4>
//             </div>

//             <div className="card-body">
//               <AlertMessage
//                 message={error}
//                 type="danger"
//                 onClose={() => setError("")}
//               />

//               <StudentForm
//                 formData={formData}
//                 setFormData={setFormData}
//                 onSubmit={handleSubmit}
//                 buttonText="Update Student"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//  NEW CONCPET

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";

import { getStudent, updateStudent } from "../services/studentService";

import StudentForm from "../components/StudentForm";
import AlertMessage from "../components/AlertMessage";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [error, setError] = useState("");

  // ============================================
  // Get Student
  // ============================================

  const {
    data: student,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id),
  });

  // ============================================
  // Update Student
  // ============================================

  const updateMutation = useMutation({
    mutationFn: (studentData) => updateStudent(id, studentData),

    onSuccess: () => {
      navigate("/dashboard", {
        state: {
          message: "Student updated successfully!",
        },
      });
    },

    onError: (error) => {
      console.log("Update error:", error.response?.data);

      setError(JSON.stringify(error.response?.data || "Update failed"));
    },
  });

  // ============================================
  // Set API data into form
  // ============================================

  React.useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        age: student.age || "",
        course: student.course || "",
      });
    }
  }, [student]);

  // ============================================
  // Form Submit
  // ============================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    updateMutation.mutate(formData);
  };

  // ============================================
  // Loading
  // ============================================

  if (isLoading) {
    return (
      <div className="container mt-5">
        <h3>Loading student...</h3>
      </div>
    );
  }

  // ============================================
  // Error Loading Student
  // ============================================

  if (isError) {
    return (
      <div className="container mt-5">
        <AlertMessage message="Unable to load student." type="danger" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-header bg-warning">
              <h4 className="mb-0">Edit Student</h4>
            </div>

            <div className="card-body">
              <AlertMessage
                message={error}
                type="danger"
                onClose={() => setError("")}
              />

              <StudentForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText={
                  updateMutation.isPending ? "Updating..." : "Update Student"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
