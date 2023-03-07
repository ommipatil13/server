import React, { useEffect, useState } from 'react';
import patilpic from "../images/nature.jpg";
import aboutpic from "../images/aboutpic.png";
import { useHistory } from 'react-router-use-history';


const About = () => {

  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }



    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  }

  useEffect(() => {
    callAboutPage();

  }, []);


  return (
    <>

      <div className='container emp-profile box my-4 p-3' style={{ width: "60%" }}>
        <form method="GET">
          <div className='row'>
            <div className='col-md-4'>
              <img src={userData.name === "omkar" ? patilpic : aboutpic} alt="patil" height="150" />
            </div>

            <div className='col-md-6'>
              <div className='profile-head'>
                <h5> {userData.name} </h5>
                <h6> {userData.work} </h6>
                <p className='profile-rating mt-3 mb-5'>B.E. IT 2022 Fresher</p>
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                    <button class="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                  </div>
                </nav>


              </div>
            </div>

            {/* <div className='col-md-2'>
              <input type="submit" className='btn btn-secondary' name="btnAddMore" value='Edit Profile' />
            </div> */}

            <div className='row'>
              {/* left side urls */}

              <div className='col-md-4'>
                <div className='profile-work'>
                  <p>Work Link</p>
                  <a href="https://drive.google.com/file/d/1XyOjvANfcwFJ32L9tW-Yilv6Rx5IZlLj/view?usp=share_link" target="_patil" className='nav-link'>Resume</a>
                  <a href="https://github.com/ommipatil13" target="_patil" className="nav-link" >GitHub</a>
                  <a href="https://www.linkedin.com/in/omkar-patil-738092203/" target="_patil" className="nav-link" >LinkedIn</a>
                  <a href="https://www.hackerrank.com/ommipatil13?hr_r=1" target="_patil" className="nav-link">HackerRank</a>

                </div>
              </div>

              {/* right side  */}

              <div className='col-md-8 ps-4 about-info pt-3'>
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div className='row'>
                      <div className='col-md-6'>
                        <label>User ID</label>
                      </div>
                      <div className='col-md-6'>
                        <p>958400399404</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Name:</label>
                      </div>
                      <div className='col-md-6'>
                        <p> {userData.name} </p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Email:</label>
                      </div>
                      <div className='col-md-6'>
                        <p> {userData.email} </p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Phone:</label>
                      </div>
                      <div className='col-md-6'>
                        <p> {userData.phone} </p>
                      </div>
                    </div>

                    {/* <div className='row'>
                      <div className='col-md-6'>
                        <label>Profession</label>
                      </div>
                      <div className='col-md-6'>
                        <p> {userData.work} </p>
                      </div>
                    </div> */}

                  </div>

                  {/* this is profile timeline part */}

                  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">

                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Profession:</label>
                      </div>
                      <div className='col-md-6'>
                        <p> {userData.work} </p>
                      </div>
                    </div>


                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Type:</label>
                      </div>
                      <div className='col-md-6'>
                        <p>MERN Stack</p>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-6'>
                        <label>Experience:</label>
                      </div>
                      <div className='col-md-6'>
                        <p>Fresher</p>
                      </div>
                    </div>



                  </div>


                </div>
              </div>

            </div>


          </div>
        </form>
      </div >

    </>
  )
}

export default About

