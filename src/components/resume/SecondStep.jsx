import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const variant = 'standard';
const margin = 'normal';

export const SecondStep = ({
  education,
  setEducation,
  handleNext,
  handlePrev
}) => {

  const isError = React.useCallback(
    () =>
      Object.keys(education).some(
        (name) =>
          (education[name].required && !education[name].value) ||
          education[name].error
      ),
    [education]
  );

  const handleChange = (event, checked) => {
    const { type, name, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setEducation(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: fieldValue
      }
    }));

    const fieldName = education[name];
    if (!fieldName) return;
    const { required, validate, minLength, maxLength, helperText } = fieldName;

    let error = '';
    const isText = RegExp(/^[A-ZА-Я\s]*$/i);
    const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{3,6})$/);
    const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/);
    const isNumber = RegExp(/^\d+$/);

    if (required && !fieldValue) error = 'This field is required';
    if (minLength && value && value.length < minLength)
      error = `Minimum ${minLength} characters is required.`;
    if (maxLength && value && value.length > maxLength)
      error = 'Maximum length exceeded!';
    if (validate) {
      switch (validate) {
        case 'text':
          if (value && !isText.test(value))
            error = helperText || 'This field accepts text only.';
          break;

        case 'number':
          if (value && !isNumber.test(value))
            error = helperText || 'This field accepts numbers only.';
          break;

        case 'email':
          if (value && !isEmail.test(value))
            error = helperText || 'Please enter a valid email address.';
          break;

        case 'phone':
          if (value && !isPhone.test(value))
            error =
              helperText ||
              'Please enter a valid phone number. i.e: xxx-xxx-xxxx';
          break;

        case 'zip':
          if (value && !isZip.test(value))
            error = helperText || 'Please enter a valid zip code.';
          break;

        case 'checkbox':
          if (!checked) error = helperText || 'Please provide a valid value.';
          break;

        case 'select':
          if (!value) error = helperText || 'Please select a value.';
          break;

        default:
          break;
      }
    }

    setEducation(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error
      }
    }));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Университет"
            name="university"
            placeholder="Enter your city"
            value={education.university.value}
            onChange={handleChange}
            error={!!education.university.error}
            required={education.university.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Год поступления"
            name="admissionDate"
            type="date"
            defaultValue={education.admissionDate.value}
            onChange={handleChange}
            required={education.admissionDate.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Год окончания"
            name="endingDate"
            type="date"
            defaultValue={education.endingDate.value}
            onChange={handleChange}
            required={education.endingDate.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Академическая степень"
            name="degree"
            placeholder="Академическая степень"
            value={education.degree.value}
            onChange={handleChange}
            error={!!education.degree.error}
            required={education.degree.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Факультет"
            name="faculty"
            placeholder="Ваш факультет"
            value={education.faculty.value}
            onChange={handleChange}
            error={!!education.faculty.error}
            required={education.faculty.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label="Специализация"
            name="speciality"
            placeholder="Ваша специализация"
            value={education.speciality.value}
            onChange={handleChange}
            error={!!education.speciality.error}
            required={education.speciality.required}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={handlePrev} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={isError()}
          color="primary"
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
