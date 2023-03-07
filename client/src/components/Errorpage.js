import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
    <div className="container" style={{height : "80vh"}}>
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className='text-center'>
            <h1 className='pb-0 mb-0'>404 Error</h1>
            <h2>We are Sorry, Page Not Found</h2>
            <p className='fs-5'>The Page you are looking for is unavailable.</p>
            <br/> <br/>
            <NavLink to='/'><button type="button" className="btn btn-primary">Back to Homepage</button></NavLink>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Errorpage