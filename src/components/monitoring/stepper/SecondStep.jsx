import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MenuItem, Select } from '@mui/material';

const variant = 'standard';
const margin = 'normal';

export const SecondStep = ({
  values,
  handleChange,
  handleNext,
  handlePrev
}) => {
  const { t } = useTranslation();

  const isError = React.useCallback(
    () =>
      Object.keys(values).some(
        (name) =>
          (values[name].required && !values[name].value) ||
          values[name].error
      ),
    [values]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label={t('form.group')}
            name="group"
            placeholder={t('form.group')}
            value={values.group.value}
            onChange={handleChange}
            error={!!values.group.error}
            required={values.group.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label={t("form.company")}
            name="company"
            placeholder={t("form.company")}
            value={values.company.value}
            onChange={handleChange}
            error={!!values.company.error}
            required={values.company.required}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            type="number"
            label={t("form.salary")}
            name="salary"
            placeholder={t("form.salary")}
            value={values.salary.value}
            onChange={handleChange}
            error={!!values.salary.error}
            required={values.salary.required}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            name="type"
            value={values.type.value}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value="office">Офис</MenuItem>
            <MenuItem value="remote">Удаленная работа</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            name="bySpeciality"
            value={values.bySpeciality.value}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value="yes">По специальности</MenuItem>
            <MenuItem value="no">Не по специальности</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Select
            name="abroad"
            value={values.abroad.value}
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value="yes">За границей</MenuItem>
            <MenuItem value="no">В Кыргызстане</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={handlePrev} sx={{ mr: 1 }}>
          {t('button.back')}
        </Button>
        <Button
          variant="contained"
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
