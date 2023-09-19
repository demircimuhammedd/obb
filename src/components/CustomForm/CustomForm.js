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

  const [phoneNoError, setPhoneNoError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;

    // Truncate the input if it exceeds the character limit (e.g., 15 characters)
    if (id === 'phoneNo' && value.length > 15) {
      value = value.slice(0, 15);
    }

    setFormData({ ...formData, [id]: value });

    // Validate phone number (example: check if it's a valid Singapore phone number)
    if (id === 'phoneNo') {
      const phoneRegex = /^\+?[1-9][0-9]{7,14}$/;
      if (!phoneRegex.test(value)) {
        setPhoneNoError('Invalid phone number');
      } else {
        setPhoneNoError('');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are any validation errors before submitting
    if (phoneNoError) {
      return; // Don't submit if there's a phone number error
    }

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
        error={!!phoneNoError}
        helperText={phoneNoError}
        inputProps={{ maxLength: 15 }} // Set the maxLength attribute
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
