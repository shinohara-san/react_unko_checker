import React, {useState, useEffect} from 'react';
import firebase from "../firebase";
import { Link } from 'react-router-dom';

function ResultPage() {
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
    return <div>Loading...</div>
  }
  
  return (
    <>
      {results.map(result => (
        <div key={result.id} style={{margin: "5px"}}>
          <div>{result.time}</div>
          <div>{result.choko ? "ちょこした💩" : "ちょこしてない❌"}</div>
          <div>{result.kotsu ? "こつした💩" : "こつしてない❌"}</div>
          <div>{result.createdAt}</div>
        </div>
      ))}
      <div style={{margin: "20px"}}><Link to="/" className="backbutton">Back</Link></div>
    </>
  )
}

export default ResultPage;