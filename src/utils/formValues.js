export const STUDENT_PERSONAL_VALUES = {
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
  date: {
    value: '',
    error: ''
  },
  sex: {
    value: 'male',
    error: '',
    required: false,
  },
  city: {
    value: '',
    error: '',
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  }
};

export const STUDENT_INFO_VALUES = {
  group: {
    value: '',
    required: false,
  },
  company: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  },
  salary: {
    value: '',
    error: '',
    required: true,
    validate: 'number',
    minLength: 2,
    maxLength: 30
  },
  type: {
    value: 'office',
    error: '',
    required: false,
    validate: 'text'
  },
  bySpeciality: {
    value: 'yes',
    error: '',
    required: false,
    validate: 'text'
  },
  abroad: {
    value: 'no',
    error: '',
    required: false,
    validate: 'text'
  },
  unemployed: {
    value: false,
  }
};

export const RESUME_VALUES = {
  position: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  },
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
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  }
};

export const EDUCATION_VALUES = {
  university: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  },
  admissionDate: {
    value: '',
    error: '',
    required: true,
    validate: 'date',
    minLength: 2,
    maxLength: 50
  },
  endingDate: {
    value: '',
    error: '',
    required: true,
    validate: 'date',
    minLength: 2,
    maxLength: 50
  },
  faculty: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  },
  speciality: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  },
  degree: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  }
};

export const RESUME_ADDITIONAL_VALUES = {
  skills: [
    {
      value: '',
      error: '',
      required: true,
      validate: 'text',
      minLength: 2,
      maxLength: 30
    }
  ],
  extra: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 50
  }
};