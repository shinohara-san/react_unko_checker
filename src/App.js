import React from 'react';
import './App.css';
import firebase from "./firebase";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import MainMenu from "./components/MainMenu";
import ResultPage from "./components/ResultPage";
import GoogleIcon from "./img/googlelogo.png";
import Navbar from './components/Navbar';

const auth = firebase.auth();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <div>うんこかんり</div>
        </header>
        <Route exact path="/result" render={ () => <ResultPage auth={auth}/> } />
        {/* {render={ () => <About name={'Tom'}/> }} */}
        <Route exact path="/" component={MainPart} />
      </BrowserRouter>
      
    </div>
  );
}

function MainPart() {
  const [user] = useAuthState(auth);
  return (
    <>
    <section>
      {user ? <MainMenu /> : <SignIn />}
      </section>
      {/* {user ? <Navbar auth={user}/> : ""} */}
    </>  
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle} className="signin_button">Sign in with Google<img src={GoogleIcon} alt="googlelogo" className="googlelogo"/></button>
  )
}

export default App;
