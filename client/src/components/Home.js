import React, { useState, useEffect } from 'react';

const Home = () => {


  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  // const show = true;


  const userHome = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: {

          "Content-Type": "application/json"
        },

      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true); 


    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    userHome();

  }, []);


  return (
    <div>

    
        <h1 className="welcome"> Welcome</h1>
        <h1 className='welcome'>{userName}</h1>
        <h2 className='welcome'>{ show ? 'Happy, to see you back' :  'We are the MERN Developer'}</h2>

        <div className='justify-content-center d-flex'>

        <img src="https://www.bigscal.com/wp-content/uploads/2022/09/Features-of-Mern-stack-development-services-You-Should-Know.png" alt='mern' height="250" />
        </div>
   </div >
    )
}

export default Home