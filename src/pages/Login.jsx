import React from 'react'
import {MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBValidationItem, MDBSpinner} from "mdb-react-ui-kit"
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { googleSignIn, login } from '../redux/features/authSlice'
import { useEffect } from 'react'
// import {GoogleLogin} from  "react-google-login"
import GoogleLogin from  "react-google-login"


const initialState = {
    email: "",
    password: ""
}

const clientId = "118153928101-f0d6gjhtb4rq2f8m5o314o8vnj49qpj7.apps.googleusercontent.com";

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const {loading, error} = useSelector((state) => ({...state.auth}));
    const {email, password} = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password){
            dispatch(login({formValue, navigate, toast}))
        }
    }

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    };
    const onSuccess = (res) => {
        const email = res?.profileObj.email;
        const name = res?.profileObj.name;
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const result = {email, name, token, googleId};
        dispatch(googleSignIn({result, navigate, toast}))

        console.log(res)
        console.log("succes", res.profileObj)
    };
    const onFailure = (error) => {
        console.log(error)
        toast.error(error);
    };
    
  return (
    <div style={{margin: "auto", padding: "15px", maxWidth: "480px", alignContent: "center", marginTop: "120px"}}>
        <MDBCard alignment='center'>
            <MDBIcon fas icon="user-circle" className='fa-2x' />
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit}  className="row g-3">
                    <div className="col-md-12">
                        <MDBValidationItem  feedback='Please provide your email' invalid>
                            <MDBInput 
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                // invalid
                                // validation="Please provide your email"
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
                                // invalid
                                // validation="Please provide your password"
                        />
                        </MDBValidationItem>
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className="mt-2">
                            {loading && (
                                <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                            )}
                            Login
                        </MDBBtn>
                    </div>
                </MDBValidation>
                <br />
                <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                        <MDBBtn 
                            style={{width: "100%"}}
                            color="danger"
                            onClick={renderProps.onClick}
                            // disabled={renderProps.disabled}
                        >
                            <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                        </MDBBtn>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </MDBCardBody>
            <MDBCardFooter>
                <Link to="/register">
                    <p>Don't have an account ? Sign Up</p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
  )
}

export default Login