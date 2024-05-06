// createa a basic login page ( page.tsx)

import React from "react";
import Link from "next/link";

const Register: React.FC = () => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, backgroundColor: "#04AED2" }}>
                
                <h1>MOOC</h1>
                <span>Knowledge at your fingertips. Explore, learn, grow withour e-learning platform.</span>
            </div>
            
            <div style={{ flex: 1, backgroundColor: "#2563EB" }}>
                <div className="padding: 40px">
                    <h1>Register</h1>
                    <span>sign up and embark on your journey to knowledge today.</span><br/><br/>
                </div>
                
      
                <form>
        
                    <input type="email" placeholder="Email" /> <br/><br/>
                    <input type="password" placeholder="Password" /><br/><br/>
                    <input type="confirm password" placeholder="confirm Password" /><br/><br/>
                    <button type="submit">N E X T</button><br/>
                    <span>Already have an account? <u>Login</u></span><br/>

                </form>


            </div>
        </div>
    );
};

export default Register;