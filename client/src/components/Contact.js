
import React, { useEffect, useState } from 'react';


const Contact = () => {


  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: {

          "Content-Type": "application/json"
        },

      });

      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }



    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    userContact();

  }, []);

  // we are storing data in states

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });

  }

  //send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });

    const data = await res.json();
    console.log("data : ",data);

    if (!data) {
      console.log("message not send");
    } else{
      alert("Message Send");
      setUserData({...userData, message:""});
    }

  }



  return (
    <>

      <div className='contact-info'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
              {/* phone no */}
              <div className='contact_info_item d-flex justify-content-start align-items-center contact-box m-4 p-2'>
                <img src="https://cdn-icons-png.flaticon.com/512/13/13936.png" alt="Phone" width="30" />
                <div className='contact_info_content ms-1'>
                  <div className='contact_info_title'>
                    Phone
                  </div>
                  <div className='contact_info_text'>
                    +91 123 456 7890
                  </div>
                </div>
              </div>

              {/* email no */}
              <div className='contact_info_item d-flex justify-content-start align-items-center contact-box m-4 p-2'>
                <img src="https://www.freepnglogos.com/uploads/email-png/email-guilford-computer-software-guide-libguides-36.png" alt="Phone" height="40" />
                <div className='contact_info_content ms-1'>
                  <div className='contact_info_title'>
                    Email
                  </div>
                  <div className='contact_info_text'>
                    Contact@gmail.com
                  </div>
                </div>
              </div>

              {/* address no */}
              <div className='contact_info_item d-flex justify-content-start align-items-center contact-box m-4 p-2'>
                <img src="https://png.pngitem.com/pimgs/s/146-1466755_nearby-transparent-background-address-icon-hd-png-download.png" alt="Phone" height="30" />
                <div className='contact_info_content ms-1'>
                  <div className='contact_info_title'>
                    Address
                  </div>
                  <div className='contact_info_text'>
                    Pune, Mh, India
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      {/* contact us form */}

      <div className='contact_form'>
        <div className='container box ' style={{ width: "60%" }}>
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className='contact_form_container py-4'>
                <div className='contact_form_title'>
                  Get in Touch
                </div>
                <form method="POST" id="contact_form">
                  <div className='contact_form_name d-flex justify-content-between align-items-between'>
                    <input type="text" id="contact_form_name" classname="contact_form_name input_field" onChange={handleInputs} name="name" value={userData.name} placeholder='Your Name' required="true" />

                    <input type="email" id="contact_form_email"
                      classname="contact_form_email input_field" onChange={handleInputs} name="email" value={userData.email} placeholder='Your Email' required="true" />

                    <input type="number" id="contact_form_phone"
                      classname="contact_form_phone input_field" onChange={handleInputs} name="phone" value={userData.phone} placeholder='Your Phone No' required="true" />
                  </div>

                  <div className='contact_form_text mt-3'>
                    <textarea
                      className="text_field contact_form_message" onChange={handleInputs} name="message" value={userData.message} placeholder='Message' cols="87" rows="6">
                    </textarea>
                  </div>

                  <div className='contact_form_button'>
                    <button type='submit' className='btn btn-primary' onClick={contactForm}>Send Message</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Contact