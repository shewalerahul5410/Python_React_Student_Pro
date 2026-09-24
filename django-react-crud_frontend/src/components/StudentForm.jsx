export default function StudentForm({
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>

        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
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
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>

        <input
          type="number"
          name="age"
          className="form-control"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Course</label>

        <input
          type="text"
          name="course"
          className="form-control"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary">{buttonText}</button>
    </form>
  );
}
