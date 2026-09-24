import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-75">
          {/* Left Content */}
          <div className="col-lg-7 text-center text-lg-start">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
              🎓 Student Management System
            </span>

            <h1 className="display-4 fw-bold text-dark mb-3">
              Manage Students
              <span className="text-primary"> Easily & Efficiently</span>
            </h1>

            <p className="lead text-secondary mb-4">
              A simple and powerful platform to manage student records, view
              student details, and keep everything organized in one place.
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
              <Link to="/students" className="btn btn-primary btn-lg px-4">
                View Students
              </Link>

              <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
                Login
              </Link>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <span className="fs-1">🎓</span>
                  </div>

                  <h3 className="fw-bold mt-3">Student Dashboard</h3>

                  <p className="text-muted">Everything you need in one place</p>
                </div>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3 text-center">
                      <div className="fs-3">👨‍🎓</div>
                      <h6 className="fw-bold mt-2 mb-1">Students</h6>
                      <small className="text-muted">Manage Records</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3 text-center">
                      <div className="fs-3">📋</div>
                      <h6 className="fw-bold mt-2 mb-1">Records</h6>
                      <small className="text-muted">View Details</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3 text-center">
                      <div className="fs-3">🔒</div>
                      <h6 className="fw-bold mt-2 mb-1">Secure</h6>
                      <small className="text-muted">Protected Access</small>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-light rounded-3 p-3 text-center">
                      <div className="fs-3">⚡</div>
                      <h6 className="fw-bold mt-2 mb-1">Fast</h6>
                      <small className="text-muted">Easy Management</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Everything You Need</h2>
            <p className="text-muted">
              Manage your student information with ease.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">👥</div>
                  <h5 className="fw-bold">Student Management</h5>
                  <p className="text-muted mb-0">
                    Add, update, view, and manage student information from a
                    single platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">📊</div>
                  <h5 className="fw-bold">Organized Records</h5>
                  <p className="text-muted mb-0">
                    Keep student records organized and easily accessible
                    whenever you need them.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">🔐</div>
                  <h5 className="fw-bold">Secure Access</h5>
                  <p className="text-muted mb-0">
                    Login securely and access student management features based
                    on your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Manage Students?</h2>

          <p className="mb-4">
            Login to your account and start managing student records.
          </p>

          <Link to="/login" className="btn btn-light btn-lg px-5">
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  );
}
