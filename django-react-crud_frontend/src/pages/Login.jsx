// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import AlertMessage from "../components/AlertMessage";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // this is used for the access the value from the user input.
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");
//     try {
//       const data = await loginUser(formData);

//       console.log("Login response:", data);

//       if (data.access) {
//         localStorage.setItem("access_token", data.access);

//         if (data.refresh) {
//           localStorage.setItem("refresh_token", data.refresh);
//         }

//         localStorage.setItem(
//           "user",
//           JSON.stringify({ username: formData.username }),
//         );

//         setMessage("Login successful!");
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 800);
//       } else {
//         setError("Access token not received from server.");
//       }
//     } catch (error) {
//       console.log(error.response?.data);

//       setError(error.response?.data?.detail || "Invalid username or password.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="card auth-card shadow">
//         <div className="card-body p-4">
//           <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

//           <p className="text-center text-muted mb-4">
//             Login to Student Manager
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
//                 placeholder="Enter username"
//                 value={formData.username}
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
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button className="btn btn-primary w-100">Login</button>
//           </form>

//           <div className="text-center mt-4">
//             Don't have an account? <Link to="/register">Register</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { loginUser } from "../services/authService";
import AlertMessage from "../components/AlertMessage";

import { login } from "../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================================
  // TanStack Query - Login Mutation

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log("Login response:", data);

      if (data.access) {
        // Send login information to Redux
        dispatch(
          login({
            accessToken: data.access,
            refreshToken: data.refresh,
            userData: {
              username: formData.username,
            },
          }),
        );

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {
        setError("Access token not received from server.");
      }
    },

    onError: (error) => {
      console.log("Login error:", error.response?.data);

      setError(error.response?.data?.detail || "Invalid username or password.");
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

    loginMutation.mutate(formData);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card shadow">
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-2">Welcome Back</h2>

          <p className="text-center text-muted mb-4">
            Login to Student Manager
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
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loginMutation.isPending}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loginMutation.isPending}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
