// import React from "react";
// import { NavLink } from "react-router-dom";

// const Signup = () => {
//     return (
//         <>
//             <section className="vh-100" style={{ backgroundColor: "rgb(131 181 166)" }}>
//                 <div className="container h-100">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-lg-12 col-xl-11">
//                             <div className="card text-black" style={{ borderRadius: "25px" }}>
//                                 <div className="card-body p-md-5">
//                                     <div className="row justify-content-center">
//                                         <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

//                                             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

//                                             <form className="mx-1 mx-md-4">

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                     <label className="form-label" htmlFor="name">Name</label>
//                                                         <input type="text" id="name" placeholder="Enter your name" className="form-control" autoComplete="off" />
                                                        
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <input type="email" id="email" placeholder="Enter your email" className="form-control" autoComplete="off" />
//                                                         <label className="form-label" htmlFor="email">Email</label>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <input type="number" id="phone" placeholder="Enter your phone number" className="form-control" autoComplete="off" />
//                                                         <label className="form-label" htmlFor="phone">Mobile Number</label>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <input type="text" id="work" placeholder="Enter your profession" className="form-control" autoComplete="off" />
//                                                         <label className="form-label" htmlFor="work">Your Profession</label>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <input type="password" id="password" placeholder="Enter password" className="form-control" autoComplete="off" />
//                                                         <label className="form-label" htmlFor="password">Password</label>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-row align-items-center mb-4">
//                                                     <i className="fas fa-key fa-lg me-3 fa-fw"></i>
//                                                     <div className="form-outline flex-fill mb-0">
//                                                         <input type="password" id="cpassword" placeholder="Confirm password" className="form-control" autoComplete="off" />
//                                                         <label className="form-label" htmlFor="cpassword">Confirm password</label>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                                                     <button type="submit" className="btn btn-primary btn-lg">Register</button>
//                                                 </div>
//                                                 <div className="text-center text-lg-start mt-4 pt-2">
//                                                     <p className="small fw-bold mt-2 pt-1 mb-0">Already Registered? <NavLink to="/login"
//                                                         className="link-success">Login</NavLink></p>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                         <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//                                             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                                                 className="img-fluid" alt="Registration Image" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Signup




// This is mine signup page first one and css from App.css from 51 line ok bro




import React, {useState} from 'react';
import { NavLink} from 'react-router-dom';
import {useHistory} from 'react-router-use-history';
import signpic from "../images/signup.svg";



const Signup = () => {
    
    const history = useHistory();
    const [user,setUser] = useState({
        name: "", email: "", work: "", phone: "", password: "", cpassword: "" 
    })

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name, email, work, phone, password, cpassword} = user;

        const res = await fetch("/register", {
            method:"POST", 
            headers: {
                "Content-Type" : "application/json"
            }, 
            body: JSON.stringify({

                name, email, work, phone, password, cpassword   
            
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successfull");
            console.log("Successfull Registration");

            history.push("/login");
        }
    }

    return (
      


        <>

            <h2 className="signup">Sign Up</h2>
            <div className="form " method="POST">

                <div className="form-body">
                    <div className="username">
                        <label className="form__label" for="Name">Name </label>
                        <input className="form__input" type="text" name="name" id="Name" value={user.name} onChange={handleInputs} placeholder="Full Name" />
                    </div>

                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" name="email" id="email" className="form__input" value={user.email} onChange={handleInputs} placeholder="Email" />
                    </div>
                    <div className="work">
                        <label className="form__label" for="work">Work </label>
                        <input type="text" name="work" id="work" className="form__input" value={user.work} onChange={handleInputs} placeholder="Your Profession" />
                    </div>
                    <div className="phone">
                        <label className="form__label" for="phone">Phone </label>
                        <input type="number" name="phone" id="phone" className="form__input" value={user.phone} onChange={handleInputs} placeholder="Mobile No" />
                    </div>
                    <div className="password">
                        <label className="form__label" for="password">Password </label>
                        <input className="form__input" name="password" type="password" id="password" value={user.password} onChange={handleInputs} placeholder="Enter Password" />
                    </div>
                    <div className="cpassword">
                        <label className="form__label" for="cpassword">CPassword </label>
                        <input className="form__input" type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} placeholder="Confirm your Password" />
                    </div>
                </div>
                <div class="footer">
                    <button type="submit" className="btn btn-primary" onClick={PostData}>Register</button>
                </div>
                <div className="signup-image">
                    <figure>
                        <img src={signpic} alt="registration pic" width="80" height="140" /> 
                    </figure>
                    <NavLink to="/login" className="nav-link">I am already Register</NavLink>
                </div>
            </div>

           

        </>
    )
}

export default Signup