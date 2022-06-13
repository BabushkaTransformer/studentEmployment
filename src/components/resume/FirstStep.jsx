import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { MenuItem, Select } from '@mui/material';

const variant = 'standard';
const margin = 'normal';

export const FirstStep = ({ formValues, handleChange, handleNext }) => {
  const { t } = useTranslation();
  const { firstName, lastName, email, phone, city, date, position, sex } = formValues;

  const isError = React.useCallback(
    () =>
      Object.keys({ firstName, lastName, email, phone, city, date, sex }).some(
        (name) =>
          (formValues[name].required && !formValues[name].value) ||
          formValues[name].error
      ),
    [formValues, firstName, lastName, email, phone, city, date]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {firstName && (
            <TextField
              variant={variant}
              margin={margin}
              fullWidth
              label={t('form.name')}
              name="firstName"
              placeholder={t('form.name')}
              value={firstName.value}
              onChange={handleChange}
              error={!!firstName.error}
              helperText={firstName.error}
              required={firstName.required}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {lastName && (
            <TextField
              variant={variant}
              margin={margin}
              fullWidth
              label={t('form.surname')}
              name="lastName"
              placeholder={t('form.surname')}
              value={lastName.value}
              onChange={handleChange}
              error={!!lastName.error}
              helperText={lastName.error}
              required={lastName.required}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          {email && (
            <TextField
              variant={variant}
              margin={margin}
              fullWidth
              label={t('form.email')}
              name="email"
              placeholder={t('form.email')}
              type="email"
              value={email.value}
              onChange={handleChange}
              error={!!email.error}
              helperText={email.error}
              required={email.required}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          {phone && (
            <TextField
              variant={variant}
              margin={margin}
              fullWidth
              label={t('form.phone')}
              name="phone"
              placeholder={t('form.phone')}
              value={phone.value}
              onChange={handleChange}
              error={!!phone.error}
              helperText={phone.error}
              required={phone.required}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          {city && (
            <TextField
              variant={variant}
              margin={margin}
              fullWidth
              label={t('form.city')}
              name="city"
              placeholder={t('form.city')}
              value={city.value}
              onChange={handleChange}
              error={!!city.error}
              helperText={city.error}
              required={city.required}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2}>
          <Grid item xs={6}>
            {date && (
              <TextField
                variant={variant}
                margin={margin}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                label={t('form.birthDay')}
                name="date"
                type="date"
                defaultValue={date.value}
                onChange={handleChange}
                required={date.required}
              />
            )}
          </Grid>
          <Grid item xs={6} sx={{ mt: '32px' }}>
            {sex && (
              <Select
                variant="standard"
                name="sex"
                value={sex.value}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="male">Муж.</MenuItem>
                <MenuItem value="female">Жен.</MenuItem>
              </Select>
            )}
          </Grid>
        </Grid>
      </Grid>

      {position && (
        <TextField
          variant={variant}
          margin={margin}
          fullWidth
          label={t('form.position')}
          name="position"
          placeholder={t('form.position')}
          value={position.value}
          onChange={handleChange}
          error={!!position.error}
          helperText={position.error}
          required={position.required}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color="primary"
          onClick={!isError() ? handleNext : () => null}
        >
          {t('button.continue')}
        </Button>
      </Box>
    </>
  );
};
