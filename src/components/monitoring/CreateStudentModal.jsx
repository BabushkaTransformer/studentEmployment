import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useValidate } from '../../hooks/useValidate';

import { FirstStep } from '../resume/FirstStep';
import { SecondStep } from './stepper/SecondStep';
import { Confirmation } from './stepper/Confirmation';
import { Modal } from '@mui/material';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { STUDENT_INFO_VALUES, STUDENT_PERSONAL_VALUES } from '../../utils/formValues';

const labels = ['Личная информация', 'Данные о трудоустройстве', 'Просмотр'];

export const CreateStudentModal = ({ open, onClose, group }) => {
  const [personal, setPersonal] = React.useState(STUDENT_PERSONAL_VALUES);
  const [employmentInfo, setEmploymentInfo] = React.useState(STUDENT_INFO_VALUES);
  const [activeStep, setActiveStep] = React.useState(0);

  const { onValidate } = useValidate();

  const handleIncrease = () => setActiveStep(prev => prev + 1);
  const handleDecrease = () => setActiveStep(prev => prev - 1);

  const handleChange = (event, checked) => {
    const { type, name, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const fieldName = personal[name];
    if (!fieldName) return;

    const { error } = onValidate(fieldName, fieldValue);

    setPersonal(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
        value: fieldValue
      }
    }));
  };

  const handleChangeInfo = (event, checked) => {
    const { type, name, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const fieldName = employmentInfo[name];
    if (!fieldName) return;

    const { error } = onValidate(fieldName, fieldValue);

    setEmploymentInfo(prev => ({
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
            formValues={personal}
            handleChange={handleChange}
            handleNext={handleIncrease}
            handlePrev={handleDecrease}
          />
        );
      case 1:
        return (
          <SecondStep
            values={employmentInfo}
            handleChange={handleChangeInfo}
            handleNext={handleIncrease}
            handlePrev={handleDecrease}
          />
        );
      case 2:
        return (
          <Confirmation
            personalInfo={personal}
            employmentInfo={employmentInfo}
            handlePrev={handleDecrease}
            onClose={onClose}
            group={group}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        maxWidth={1200}
        className="modal-classes"
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: "10px",
          p: 4
        }}
      >
        {activeStep === labels.length ? (
          <>adsf</>
        ) : (
          <form>
            <Box sx={{ my: 5 }}>
              <Typography variant="h4" align="center">
                Регистрация студента
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
      </Box>
    </Modal>
  );
};
