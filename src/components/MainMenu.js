import React, {useState} from 'react';
import firebase from "../firebase";
import Icon from "../img/dogs.jpg";

function MainMenu() {
  const auth = firebase.auth();
  const ref = firebase.firestore().collection("results");;
  //ラジオボタン
  const [val, setVal] = useState('');
  const handleChange = e => setVal(e.target.value);
  //チェックボックス
  const [chokoVal, setChokoVal] = useState([]);
  const [kotsuVal, setKotsuVal] = useState([]);
  //チョコのチェック処理
  const handleChokoCheck = e => {
    // change したのはいいとして、ON なのか OFF なのか判定する必要がある
    if (chokoVal.includes(e.target.value)) {
      // すでに含まれていれば OFF したと判断し、
      // イベント発行元を除いた配列を set し直す
      setChokoVal(chokoVal.filter(item => item !== e.target.value));
    } else {
      // そうでなければ ON と判断し、
      // イベント発行元を末尾に加えた配列を set し直す
      setChokoVal([...chokoVal, e.target.value]);
      // setChokoVal([...chokoVal, e.target.value]);
      // state は直接は編集できない
      // つまり val.push(e.target.value) はNG ❌
    }
  }
  //コツのチェック処理
  const handleKotsuCheck = e => {
    if (kotsuVal.includes(e.target.value)) {
      setKotsuVal(kotsuVal.filter(item => item !== e.target.value));
    } else {
      setKotsuVal([...kotsuVal, e.target.value]);
    }
  }

  function getNowDatetime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);
    // const sec = ('0' + date.getSeconds()).slice(-2);
    return `${year}/${month}/${day} ${hour}:${min}`
  }

  const sendData = (e) => {
    e.preventDefault();
    if (!val) {
      alert("時間帯を確認してください");
      return;
    }

    const chokoResult = chokoVal.indexOf("ちょこまん") === 0 ? true : false;
    const kotsuResult = kotsuVal.indexOf("こたろ") === 0 ? true : false;

    const { uid, photoURL } = auth.currentUser;
    ref.add({
      time: val,
      choko: chokoResult,
      kotsu: kotsuResult,
      createdAt: getNowDatetime(),
      uid,
      photoURL,
    })
      .then(function (docRef) {
        // console.log(docRef.id);
        ref.doc(docRef.id).update({
          id: docRef.id
        })
        .then(function() {
          alert("散歩お疲れ様でした。");
        })
        .catch(function(error) {
          console.log(error);
      });
    })
    .catch(function(error) {
    alert("エラーが発生しました。");
  });
  }

  return (
    <div>
    <div className="imgContainer">
      <img src={ Icon } className="img" alt="dogs"/>
    </div>
    <form className="menu">
      <div className="timeLabel">
        <label for="morning" className="m">
            <input
              type="radio"
              name="time"
              value="朝"
              id="morning"
              onChange={handleChange}
              checked={val === "朝"} />朝
        </label>
        <label for="evening" className="e">
            <input type="radio"
              name="time"
              value="夕"
              id="evening"
              onChange={handleChange}
              checked={val === "夕"} />夕
        </label>
      </div>
      <div className="dogLabel">
        <label for="choko">
            <input type="checkbox"
              name="choko"
              value="ちょこまん"
              id="choko"
              onChange={handleChokoCheck}
              checked={chokoVal.includes('ちょこまん')}
            />ちょこまん
        </label>
        <label for="kotsu">
            <input type="checkbox"
              name="kotsu"
              value="こたろ"
              id="kotsu"
              onChange={handleKotsuCheck}
              checked={kotsuVal.includes('こたろ')}
            />こたろ
        </label>
        </div>
        <div>
          <button id="send" onClick={sendData}>送信</button>
        </div>
    </form>
    </div>
  );
}

export default MainMenu;