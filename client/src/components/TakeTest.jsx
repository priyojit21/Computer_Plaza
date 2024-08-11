import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { set1 } from '../features/questionReducer';


export default function TakeTest() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("Current User", user);

  const { chosen } = useSelector((state) => state.question);
  const dispatch = useDispatch();


  function questionsetHandler(a) {
    return () => {
      dispatch(set1(a));
      console.log(a);
    };
  }



  return (
    <div>
      {/* Add protected routes here */}
      <Link to='/home'><button onClick={questionsetHandler(1)}>Test 1</button></Link>
      <Link to='/home'><button onClick={questionsetHandler(2)}>Test 2</button></Link>
      {/* question needs to be added */}
      <Link to='/home'><button onClick={questionsetHandler(3)}>Test 3</button></Link>
      <Link to='/home'><button onClick={questionsetHandler(4)}>Test 4</button></Link>

      {isAuthenticated &&
        <div>
          <h3 style={{ color: "white" }}>Hello {user.name}</h3>
          <img src={user.picture} alt="user_img" />
        </div>
      }

      {
        isAuthenticated ? <button onClick={(e) => logout()} >Logout</button> : <button onClick={(e) => loginWithRedirect()} >Signup</button>
      }

    </div>
  )
}
