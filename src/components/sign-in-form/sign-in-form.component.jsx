
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
  // auth,  // singleton
  signInWithGoogleRedirect,
  // signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  // sign in with google
  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleRedirect();
    } catch (err) {
      console.log('Error!');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!email || !password) {
      alert('please fill in required fields');
      return;
    }

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error.code+': '+error.message);
      }
    }
  }

  const handleChange = (event) => {
    // deconstruct values
    const {name, value} = event.target;

    // spread in the object and then set specific field
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit} >
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

        <div className="buttons-container">
          <Button
            buttonType="default"
            displayText="Sign In"
            inputOptions = {{
              type: "submit",
            }}
          />
          <Button 
            buttonType="google"
            displayText="Google Sign in"
            options = {{
              type: "button",
              onClick: signInWithGoogle
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
