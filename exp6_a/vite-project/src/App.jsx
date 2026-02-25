import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    skills: [],
    address: "",
    state: "",
    age: ""
  });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔥 if DOB changes → auto update age
    if (name === "dob") {
      const age = calculateAge(value);
      setFormData({ ...formData, dob: value, age: age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    let updatedSkills = [...formData.skills];

    if (checked) updatedSkills.push(value);
    else updatedSkills = updatedSkills.filter((s) => s !== value);

    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.age > 100) {
      alert("Age must be less than 100");
      return;
    }

    alert(
      `First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Gender: ${formData.gender}
DOB: ${formData.dob}
Age: ${formData.age}
Skills: ${formData.skills.join(", ")}
Address: ${formData.address}
State: ${formData.state}`
    );
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      skills: [],
      address: "",
      state: "",
      age: ""
    });
  };

  return (
    <div className="container">
      <h2>Controlled Form Example</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        {/* Gender */}
        <div className="group">
          <strong>Gender:</strong><br />
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        {/* DOB */}
        <input
          type="datetime-local"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        {/* 🔥 Auto Age (readonly) */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          readOnly
        />

        {/* Skills */}
        <div className="group">
          <strong>Skills:</strong><br />

          <label>
            <input
              type="checkbox"
              value="Java"
              checked={formData.skills.includes("Java")}
              onChange={handleCheckbox}
            />
            Java
          </label>

          <label>
            <input
              type="checkbox"
              value="React"
              checked={formData.skills.includes("React")}
              onChange={handleCheckbox}
            />
            React
          </label>

          <label>
            <input
              type="checkbox"
              value="Python"
              checked={formData.skills.includes("Python")}
              onChange={handleCheckbox}
            />
            Python
          </label>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Select State</option>
          <option value="Punjab">Punjab</option>
          <option value="Haryana">Haryana</option>
          <option value="Delhi">Delhi</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>

        <div className="btn-row">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;