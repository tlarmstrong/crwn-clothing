
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

import Button from '../button/button.component';

import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!displayName || !email || !password || !confirmPassword) {
      alert('please fill in required fields');
      return;
    }
    if(password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('cannot create user, email already in use.');
      } else {
        console.log('user creation with email password failed', error.message);
      }
    }
  }

  const handleChange = (event) => {
    // deconstruct values
    const {name, value} = event.target;

    // spread in the object and then set specific field
    setFormFields({ ...formFields, [name]: value });
    console.log(event);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput
          label="Display Name" 
          // since this is an object, need to double wrap
          inputOptions = {{
            type: 'text', 
            required: true, 
            onChange: handleChange,
            name: "displayName", 
            value: displayName
          }}
        />

        <FormInput
          label="Email"
          inputOptions = {{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email
          }}
        />

        <FormInput
          label="Password" 
          inputOptions = {{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password
          }}
        />

        <FormInput
          label="Confirm Password" 
          inputOptions = {{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword
          }}
        />

        <Button
          buttonType="default"
          displayText="Sign Up"
          inputOptions = {{
            type: "submit",
          }}
        />
      </form>
    </div>
  );
}

export default SignUpForm;
