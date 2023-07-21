
// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth';

import { 
  auth,  // singleton
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Button from '../../components/button/button.component';

const SignIn = () => {
/*  useEffect(() => {
    async function fetchData() {
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
      console.log(response);
    }
    fetchData();
  }, []);*/

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (err) {
      console.log('Error!');
    }
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button
        buttonType="google"
        displayText="Sign in with Google Popup"
        inputOptions = {{
          type: "button",
          onClick: logGoogleUser
        }}
      />
      {/*<button onClick={logGoogleUser}>Sign in with Google Popup</button>*/}
      {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
      <SignUpForm />
    </div>
  );
}

export default SignIn;
