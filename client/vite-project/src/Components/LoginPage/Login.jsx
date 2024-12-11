import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    // State hooks for form fields and login status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

    // The userLogin function
    async function userLogin(event) {
        event.preventDefault();  // Prevent form submission

        let data = { email, password };

        try {
            let response = await axios.post('http://localhost:3000/login', data, {
                headers: { 'Content-Type': 'application/json' }
            });

            let token_data = response.data.data;
            let usertype = token_data.user_type.usertype;
            let token = token_data.token;
            let id = token_data.id;
            let token_key = id;

            // Store data in localStorage
            localStorage.setItem(token_key, token);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('userType', usertype);

            // Update state for login success
            setIsLoggedIn(true);
            setUserType(usertype);

            // Redirect based on user type
            if (usertype === "Admin") {
                alert("Admin logged in successfully");
                navigate (`/AdminPanel?login=${token_key}&id=${id}`)
            } else if (usertype === "Buyer") {
                alert("Buyer logged in successfully");
                navigate (`/Buyerpage?login=${token_key}&id=${id}`)
            } else if (usertype === "Seller") {
                alert("Seller logged in successfully");
                navigate (`/Seller?login=${token_key}&id=${id}`)
            } else {
                alert("Unknown user type");
            }
        } catch (error) {
            console.log("Error during login:", error);
        }
    }

    // Logout function
    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserType('');
    }

    return (
        <div className="flex justify-end">
            <div className="mainFormContainer1">
                {!isLoggedIn ? (
                    <div className="form-container1 mainFormContainer1">
                        <p className="title1 text-center">Welcome back</p>
                        <form className="form1" onSubmit={userLogin}>
                            <input 
                                type="email" 
                                className="input" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <p className="page-link">
                                <span className="page-link-label">Forgot Password?</span>
                            </p>
                            <button className="form-btn">Log in</button>
                        </form>
                        <p className="sign-up-label">
                            Don't have an account?
                            <a className="sign-up-link" href="./signUP.html">
                                Sign up
                            </a>
                        </p>
                    </div>
                ) : (
                    <div className="loggedInSection">
                        <span className="user-icon">
                            <img src="./images/user-icon.png" alt="User Icon" />
                        </span>
                        <span>{userType}</span>
                        <button
                            onClick={logout}
                            style={{ marginLeft: "10px" }}
                        >
                            Logout
                        </button>
                    </div>
                )}
                <div className="buttons-container">
                <div className="apple-login-button">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        className="apple-icon"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                    </svg>
                    <span>Log in with Apple</span>
                </div>
                <div className="google-login-button">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        version="1.1"
                        x="0px"
                        y="0px"
                        className="google-icon"
                        viewBox="0 0 48 48"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                            c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                            c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                            C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                            c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                            c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                    </svg>
                    <span>Log in with Google</span>
                </div>
            </div>
            </div>
            
            <div className="p-2 flex justify-end">
                <img
                    src="https://img.freepik.com/free-photo/black-white-portrait-professional-tennis-player_23-2151418400.jpg?t=st=1733409680~exp=1733413280~hmac=c619418fcee21d21f11d59630eb16087d5ec1366db928dcc73a406aa475faa1c&w=1060"
                    className="w-5/6 h-[97vh] border-l-4 border-t-4 rounded-lg shadow-2xl"
                    alt="Login Image"
                />
            </div>
        </div>
    );
}



export default Login;
