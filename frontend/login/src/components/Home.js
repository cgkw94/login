import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies();
  const storedJwt = cookies.get("jwt");

  const [jwt, setJwt] = useState(storedJwt || null);
  const [user, setUser] = useState({});

  const fetchUserDetails = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setUser({ username: data.username, admin: JSON.stringify(data.admin) });
  };

  useEffect(() => {
    fetchUserDetails("http://localhost:5002/user/");
  }, []);

  const handleAdminButton = () => {
    window.location.href = "/admin";
  };

  const handleLogout = (e) => {
    cookies.remove("jwt");

    window.location.href = "/";
  };
  return (
    <Box>
      <Heading>Welcome!</Heading>
      <Text>Username: {user.username}</Text>
      <Text>Admin: {user.admin}</Text>
      <Button onClick={handleAdminButton}>Admin Page</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Home;
