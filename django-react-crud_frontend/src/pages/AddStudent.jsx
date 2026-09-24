// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AlertMessage from "../components/AlertMessage";
// import StudentForm from "../components/StudentForm";
// import { createStudent } from "../services/studentService";

// export default function AddStudent() {
//   const navigate = useNavigate(); // user for the navigation

//   // use for the store the formdata and updated data store in there using the useState
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await createStudent(formData);

//       navigate("/dashboard", {
//         state: {
//           message: "Student added successfully!",
//         },
//       });
//     } catch (error) {
//       console.log(error.response?.data);

//       setError(
//         JSON.stringify(error.response?.data || "Failed to create student"),
//       );
//     }
//   };

//   // return the jsx format here and aslo use there the bootstrap
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-7">
//           <div className="card shadow">
//             <div className="card-header bg-primary text-white">
//               <h4 className="mb-0">Add Student</h4>
//             </div>

//             <div className="card-body">
//               {/* this is use the custome alreat means whenever need then import and pass our message here  */}
//               <AlertMessage
//                 message={error}
//                 type="danger"
//                 onClose={() => setError("")}
//               />

//               <StudentForm
//                 formData={formData}
//                 setFormData={setFormData}
//                 onSubmit={handleSubmit}
//                 buttonText={" Add Student"}
//               ></StudentForm>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// NEW CONCPET

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import AlertMessage from "../components/AlertMessage";
import StudentForm from "../components/StudentForm";

import { createStudent } from "../services/studentService";

export default function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // ============================================
  // TanStack Query - Create Student
  // ============================================

  const createMutation = useMutation({
    mutationFn: createStudent,

    onSuccess: () => {
      navigate("/dashboard", {
        state: {
          message: "Student added successfully!",
        },
      });
    },

    onError: (error) => {
      console.log("Create student error:", error.response?.data);

      setError(
        JSON.stringify(error.response?.data || "Failed to create student"),
      );
    },
  });

  // ============================================
  // Form Submit
  // ============================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    createMutation.mutate(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Add Student</h4>
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
                  createMutation.isPending ? "Adding..." : "Add Student"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
