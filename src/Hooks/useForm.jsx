import { useState, useEffect, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidations();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.values(formValidation)) {
      if (formValue !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleInputChangeToUpperCase = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value.toUpperCase(),
    });
  };


  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidations = () => {
    const newFormValidation = {};

    for (const formField of Object.keys(formValidations)) {
      const [validationFn, errorMessage] = formValidations[formField];
      newFormValidation[`${formField}Valid`] = validationFn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(newFormValidation);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    handleInputChangeToUpperCase,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
