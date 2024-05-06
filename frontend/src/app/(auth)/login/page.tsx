// createa a basic login page ( page.tsx)

import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Login;