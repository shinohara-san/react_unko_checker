import React, {useState, useEffect} from 'react';
import firebase from "../firebase";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

function ResultPage(props) {
  const [ results, setResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const ref = firebase.firestore().collection("results");

  function getResults() {
    const items = [];
    setLoading(true);
    ref.orderBy("createdAt", "desc").limit(5).onSnapshot((querySnapshot) => {
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      });
      setResults(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getResults();
  }, []);
  
  if (loading) {
    return (
      <>
        <div className = "loading">Loading...</div>
      </>
    ) 
  }
  
  return (
    <>
      <div class="result_container">
        <div class="results">
          {results.map(result => (
            <div key={result.id} className="result">
              <div>{result.time} {result.createdAt}</div>
              <div>{result.choko ? "ちょこした💩" : "ちょこしてない❌"}</div>
              <div>{result.kotsu ? "こつした💩" : "こつしてない❌"}</div>
              <div>散歩 by {result.uid === "OVHzF9XaYDaJvlN0mkbc4aVqyMH3" ? "母ちゃん" : "ゆうき"}</div>
            </div>
          ))}
          </div>
        <Navbar auth={props.auth} />
      </div>
    </>
  )
}

export default ResultPage;