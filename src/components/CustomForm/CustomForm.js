import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CustomForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    paxNo: '',
    // Add other form fields here
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any form validation here
    // Call the onSubmit function with the form data
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        id="phoneNo"
        label="Phone Number"
        value={formData.phoneNo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        id="paxNo"
        label="Pax"
        type="number"
        value={formData.paxNo}
        onChange={handleChange}
        fullWidth
        required
      />
      {/* Add other form fields here */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default CustomForm;
