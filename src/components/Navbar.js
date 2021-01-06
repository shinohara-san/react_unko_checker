import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from "./Signout";

function Navbar(props) {
  return (
    <>
    <div className="navbar_container">
        <div><Link to="/"><i class="fas fa-edit"></i></Link></div>
        <div><Link to="/result"><i class="fas fa-book-open"></i></Link></div>
        <SignOut auth={props.auth} />
        {/* それぞれアイコンで表示したい */}
    </div>  
    </>
  );
}
export default Navbar;