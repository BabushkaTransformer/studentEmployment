export const useValidate = () => {
  let error = '';
  const isText = RegExp(/^[A-ZА-Я\s]*$/i);
  const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{3,6})$/);
  const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/);
  const isNumber = RegExp(/^\d+$/);

  const onValidate = (data, value) => {
    const { required, validate, minLength, maxLength, helperText } = data;

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
          if (!value) error = helperText || 'Please provide a valid value.';
          break;

        case 'select':
          if (!value) error = helperText || 'Please select a value.';
          break;

        default:
          break;
      }
    }

    return { error };
  };


  return {
    onValidate
  };
};
