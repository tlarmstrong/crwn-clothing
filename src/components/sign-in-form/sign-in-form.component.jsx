
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { 
  // auth,  // singleton
  signInWithGoogleRedirect,
  // signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

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
    <SignInContainer>
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

        <ButtonsContainer>
          <Button
            buttonType="base"
            displayText="Sign In"
            inputOptions = {{
              type: "submit",
            }}
          />
          <Button 
            buttonType={BUTTON_TYPE_CLASSES.google}
            displayText="Google"
            options = {{
              type: "button",
              onClick: signInWithGoogle
            }}
          />
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm;
