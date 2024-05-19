import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
    </div>
  );
}
