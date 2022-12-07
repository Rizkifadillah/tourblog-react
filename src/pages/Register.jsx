

import React, { useState, useEffect } from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBValidationItem, MDBSpinner} from "mdb-react-ui-kit"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register } from '../redux/features/authSlice'
import {GoogleLogin} from  "react-google-login"

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {loading, error} = useSelector((state) => ({...state.auth}));
    const {firstName, lastName, email, password, confirmPassword} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return toast.error("Password not match")
        }
        if(email && password && firstName && lastName && confirmPassword){
            dispatch(register({formValue, navigate, toast}))
        }
    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const googleSuccess = (resp) => {
        console.log(resp)
    }
    const googleFailure = (error) => {
        toast.error(error);
    }

  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "480px", alignContent: "center", marginTop: "120px"}}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className='fa-2x' />
            <h5>Sign Up</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit}  className="row g-3">
                    {/* <div className="row-md-12"> */}
                        <div className="col-md-6">
                            <MDBValidationItem  feedback='Please provide your Firstname' invalid>
                                <MDBInput 
                                    label="First Name"
                                    type="firstName"
                                    value={firstName}
                                    name="firstName"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please provide your firstName"
                                />
                            </MDBValidationItem>
                        </div>
                        <div className="col-md-6">
                            <MDBValidationItem  feedback='Please provide your Lastname' invalid>
                                <MDBInput 
                                    label="LastName"
                                    type="lastName"
                                    value={lastName}
                                    name="lastName"
                                    onChange={onInputChange}
                                    required
                                    invalid
                                    validation="Please provide your LastName"
                                />
                            </MDBValidationItem>
                        </div>
                    {/* </div> */}
                    <div className="col-md-12">
                        <MDBValidationItem  feedback='Please provide your email' invalid>
                            <MDBInput 
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your email"
                            />
                        </MDBValidationItem>
                    </div>
                    <div className="col-md-12">
                        <MDBValidationItem  feedback='Please provide your password' invalid>
                            <MDBInput 
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your password"
                        />
                        </MDBValidationItem>
                    </div>
                    <div className="col-md-12">
                        <MDBValidationItem  feedback='Please provide your Confirm Password' invalid>
                            <MDBInput 
                                label="Confirm Password"
                                type="confirmPassword"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your confirmPassword"
                        />
                        </MDBValidationItem>
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            {loading && (
                                <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                            )}
                            Register
                        </MDBBtn>
                    </div>
                </MDBValidation>
                <br />
                <GoogleLogin
                    clientId='118153928101-f0d6gjhtb4rq2f8m5o314o8vnj49qpj7.apps.googleusercontent.com'
                    render={renderProps => (
                        <MDBBtn 
                            style={{width: "100%"}}
                            color="danger"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                        </MDBBtn>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/login">
                    <p>Have an account ? Sign In</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Register