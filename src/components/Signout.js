import React from 'react';

function SignOut(props) {
  return props.auth.currentUser && (
      <div className="signoutButton" onClick={() => props.auth.signOut()}>
        <i class="fas fa-sign-out-alt"></i>
      </div>
  )
}

export default SignOut;