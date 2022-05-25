import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { FirstStep } from '../../components/resume/FirstStep';
import { SecondStep } from '../../components/resume/SecondStep';
import { ThirdStep } from '../../components/resume/ThirdStep';
import { Confirmation } from '../../components/resume/Confirmation';
import { useValidate } from '../../hooks/useValidate';
import {
  EDUCATION_VALUES,
  RESUME_ADDITIONAL_VALUES,
  RESUME_VALUES
} from '../../utils/formValues';

const labels = ['First Step', 'Second Step', 'Third Step', 'Confirm'];

export const CreateResume = () => {
  const [formValues, setFormValues] = React.useState(RESUME_VALUES);
  const [education, setEducation] = React.useState(EDUCATION_VALUES);
  const [skills, setSkills] = React.useState(RESUME_ADDITIONAL_VALUES);
  const [activeStep, setActiveStep] = React.useState(0);

  const { onValidate } = useValidate();

  const handleIncrease = () => setActiveStep(prev => prev + 1);
  const handleDecrease = () => setActiveStep(prev => prev - 1);

  const handleChange = (event, checked) => {
    const { type, name, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const fieldName = formValues[name];
    if (!fieldName) return;

    const { error } = onValidate(fieldName, fieldValue);

    setFormValues(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
        value: fieldValue
      }
    }));
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            formValues={formValues}
            handleChange={handleChange}
            handleNext={handleIncrease}
            handlePrev={handleDecrease}
          />
        );
      case 1:
        return (
          <SecondStep
            education={education}
            setEducation={setEducation}
            handleNext={handleIncrease}
            handlePrev={handleDecrease}
          />
        );
      case 2:
        return (
          <ThirdStep
            skills={skills}
            setSkills={setSkills}
            handleNext={handleIncrease}
            handlePrev={handleDecrease}
          />
        );
      case 3:
        return (
          <Confirmation
            formValues={formValues}
            education={education}
            skills={skills}
            handlePrev={handleDecrease}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
      {activeStep === labels.length ? (
        <>adsf</>
      ) : (
        <form>
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
        </form>
      )}
    </>
  );
};
