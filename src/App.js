import React from 'react';
import './App.css';
import firebase from "./firebase";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route } from 'react-router-dom';
import MainMenu from "./components/MainMenu";
import ResultPage from "./components/ResultPage";
import SignIn from "./components/SignIn";

const auth = firebase.auth();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <div>うんこかんり</div>
        </header>
        <Route exact path="/result" render={ () => <ResultPage auth={auth}/> } />
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
    </>  
  );
}

export default App;
