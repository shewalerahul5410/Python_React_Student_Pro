// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { registerUser } from "../services/authService";
// import AlertMessage from "../components/AlertMessage";

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     try {
//       await registerUser(formData);

//       setMessage("Registration successful! Redirecting to login...");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1200);
//     } catch (error) {
//       console.log(error.response?.data);

//       const backendError = error.response?.data;

//       if (backendError) {
//         setError(JSON.stringify(backendError));
//       } else {
//         setError("Registration failed.");
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="card auth-card shadow">
//         <div className="card-body p-4">
//           <h2 className="text-center fw-bold">Create Account</h2>

//           <p className="text-center text-muted mb-4">
//             Register a new student manager account
//           </p>

//           <AlertMessage
//             message={message}
//             type="success"
//             onClose={() => setMessage("")}
//           />

//           <AlertMessage
//             message={error}
//             type="danger"
//             onClose={() => setError("")}
//           />

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Username</label>

//               <input
//                 type="text"
//                 name="username"
//                 className="form-control"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>

//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>

//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button className="btn btn-success w-100">Register</button>
//           </form>

//           <div className="text-center mt-4">
//             Already have an account? <Link to="/login">Login</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// New HERE

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { registerUser } from "../services/authService";
import AlertMessage from "../components/AlertMessage";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================================
  // TanStack Query - Register Mutation

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    },

    onError: (error) => {
      console.log("Registration error:", error.response?.data);

      const backendError = error.response?.data;

      if (backendError) {
        setError(JSON.stringify(backendError));
      } else {
        setError("Registration failed.");
      }
    },
  });

  // ============================================
  // Input Change

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // Form Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    registerMutation.mutate(formData);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card shadow">
        <div className="card-body p-4">
          <h2 className="text-center fw-bold">Create Account</h2>

          <p className="text-center text-muted mb-4">
            Register a new student manager account
          </p>

          <AlertMessage
            message={message}
            type="success"
            onClose={() => setMessage("")}
          />

          <AlertMessage
            message={error}
            type="danger"
            onClose={() => setError("")}
          />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>

              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={registerMutation.isPending}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={registerMutation.isPending}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>

              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={registerMutation.isPending}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-4">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
