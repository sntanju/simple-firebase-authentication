import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();



function App() {

  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email
      };
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const handleGithubSignIn =() => {
      signInWithPopup(auth, githubProvider)
      .then(result => {
        const {displayName, email} = result.user;
        const loggedInUser = {
          name: displayName,
          email: email
        };
        setUser(loggedInUser);
      })
      // .catch(error => {
      //   console.log(error.message)
      // })
  }

  const handleSignOut = () => {
      signOut(auth)
      .then( () => {
        setUser({});
      })
  }

  return (
    <div className="App">

      { !user.name ?
        <div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
      
      <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I Know Your Email Address: {user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;
