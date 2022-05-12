import React from 'react';
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import { FirstStep } from '../../components/resume/FirstStep';
import { SecondStep } from '../../components/resume/SecondStep';

const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/);
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/);
const isNumber = RegExp(/^\d+$/);

const variant = 'standard';
const margin = 'normal';

const labels = ['First Step', 'Second Step', 'Confirmation']

export const CreateResume = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setFormValues] = React.useState({
    firstName: {
      value: '',
      error: '',
      required: true,
      validate: 'text',
      minLength: 2,
      maxLength: 20,
      helperText: 'Custom error message'
    },
    lastName: {
      value: '',
      error: '',
      required: true,
      validate: 'text',
      minLength: 2,
      maxLength: 20
    },
    email: {
      value: '',
      error: '',
      validate: 'email'
    },
    gender: {
      value: '',
      error: '',
      validate: 'select'
    },
    date: {
      value: '',
      error: ''
    },
    city: {
      value: '',
      error: '',
      validate: 'text',
      minLength: 3,
      maxLength: 20
    },
    agreenemt: {
      value: false,
      error: '',
      required: true,
      validate: 'checkbox',
      helperText: 'Please accept our terms and conditions'
    },
    phone: {
      value: '',
      error: '',
      validate: 'phone',
      maxLength: 15
    }
  });

  const handleIncrease = () => setActiveStep(prev => prev + 1);
  const handleDecrease = () => setActiveStep(prev => prev - 1);




  const handleChange = (event, checked) => {
    const { type, name, value } = event.target

    const fieldValue = type === 'checkbox' ? checked : value

    setFormValues(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: fieldValue
      }
    }));

    const fieldName = formValues[name]
    if (!fieldName) return

    const { required, validate, minLength, maxLength, helperText } = fieldName
    let error = ''

    if (required && !fieldValue) error = 'This field is required'
    if (minLength && value && value.length < minLength)
      error = `Minimum ${minLength} characters is required.`
    if (maxLength && value && value.length > maxLength)
      error = 'Maximum length exceeded!'
    if (validate) {
      switch (validate) {
        case 'text':
          if (value && !isText.test(value))
            error = helperText || 'This field accepts text only.'
          break

        case 'number':
          if (value && !isNumber.test(value))
            error = helperText || 'This field accepts numbers only.'
          break

        case 'email':
          if (value && !isEmail.test(value))
            error = helperText || 'Please enter a valid email address.'
          break

        case 'phone':
          if (value && !isPhone.test(value))
            error =
              helperText ||
              'Please enter a valid phone number. i.e: xxx-xxx-xxxx'
          break

        case 'zip':
          if (value && !isZip.test(value))
            error = helperText || 'Please enter a valid zip code.'
          break

        case 'checkbox':
          if (!checked) error = helperText || 'Please provide a valid value.'
          break

        case 'select':
          if (!value) error = helperText || 'Please select a value.'
          break

        default:
          break
      }
    }

    setFormValues(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error
      }
    }));
  }

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            formValues={formValues}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleChange={handleChange}
          />
        )
      case 1:
        return (
          <SecondStep
            formValues={formValues}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleChange={handleChange}
          />
        )
      default:
        throw new Error('Unknown step')
    }
  }

  return (
    <>
      {activeStep === labels.length ? (
        <>adsf</>
      ) : (
        <>
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" align="center">
              Multi Step Form
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              React Material UI multi step form with basic form validation
              logic.
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
};
