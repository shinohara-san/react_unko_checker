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

// firebase.analytics();

const auth = firebase.auth();

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
        <header className="App-header">
          <Link to="/result">うんこかんり</Link>
        </header>
          <Route exact path="/result" component={ResultPage} />
          <Route exact path="/" component={MainPart} />
      </BrowserRouter>
      
    </div>
  );
}
function MainPart() {
  const [user] = useAuthState(auth);
  return (
    <section>
      {user ? <MainMenu /> : <SignIn />}
      <SignOut /> 
    </section>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    //ボタンをクリックするとポップアップが表示される
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <div className="signOut">
      <button className="signoutButton" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default App;
