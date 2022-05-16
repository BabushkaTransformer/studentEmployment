import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { TextEditor } from '../ui/TextEditor';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const variant = 'outlined';
const margin = 'normal';

export const ThirdStep = ({
  skills,
  setSkills,
  handlePrev,
  handleNext
}) => {
  const isError = React.useCallback(
    () =>
      skills.skills.some(
        (el) =>
          (el.required && !el.value) ||
          el.error
      ),
    [skills.skills]
  );

  const handleSkillChange = (event, index) => {
    const { value } = event.target;
    const a = [...skills.skills];
    const current = {
      ...skills.skills[index],
      value
    };

    a[index] = current;
    setSkills(prev => ({
      ...prev,
        skills: a
    }));

    const { required, validate, minLength, maxLength, helperText } = skills.skills[index];

    let error = '';
    const isText = RegExp(/^[A-ZА-Я\s]*$/i);

    if (required && !value) error = 'This field is required';
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
        default:
          break;
      }
    }

    const currentError = {
      ...skills.skills[index],
      error,
      value
    };
    a[index] = currentError;

    setSkills(prev => ({
      ...prev,
      skills: a
    }));
  };

  const addOne = () => {
    const data = {
      value: '',
      error: '',
      required: true,
      validate: 'text',
      minLength: 2,
      maxLength: 30
    };

    const b = [...skills.skills, data];
    setSkills(prev => ({ ...prev, skills: b }));
  };

  const deleteOne = (index) => {
    const a = [...skills.skills];
    a.splice(index, 1);
    setSkills(prev => ({ ...prev, skills: a }));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextEditor
            variant={variant}
            margin={margin}
            fullWidth
            label="Университет"
            name="university"
            placeholder="Enter your city"
          />
        </Grid>
        <Grid item xs={12}>
          {skills.skills.map((skill, i) => (
            <Box sx={{ position: 'relative' }}>
              <TextField
                variant={variant}
                margin={margin}
                fullWidth
                label={`Навык ${i + 1}`}
                name="degree"
                placeholder="Ключевые навыки"
                value={skill.value}
                onChange={(e) => handleSkillChange(e, i)}
                error={!!skill.error}
                required={skill.required}
              />
              <Box
                onClick={() => deleteOne(i)}
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: '5px',
                  cursor: 'pointer'
              }}
              >
                x
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Button onClick={addOne}>
        Добавить еще
      </Button>

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
    </div>
  );
};