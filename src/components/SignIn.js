import "firebase/auth";
import GoogleIcon from "../img/googlelogo.png";
import firebase from "../firebase";

const auth = firebase.auth();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <button onClick={signInWithGoogle} className="signin_button">Sign in with Google<img src={GoogleIcon} alt="googlelogo" className="googlelogo"/></button>
  )
}

export default SignIn;