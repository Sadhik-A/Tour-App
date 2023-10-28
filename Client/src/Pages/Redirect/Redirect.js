import React from 'react'
import { GoogleLogin } from '../../redux/Userslice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const dispatch = useDispatch;
function Redirect() {
    useEffect(() => {
      dispatch(GoogleLogin());  
 }, [dispatch]);
  return (
    <div>Redirect</div>
  )
}

export default Redirect