import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Cookies from "universal-cookie";

const AdminPage = () => {
  const cookies = new Cookies();
  const storedJwt = cookies.get("jwt");

  const [jwt, setJwt] = useState(storedJwt || null);
  const [isAdmin, setIsAdmin] = useState(null);

  const fetchAdmin = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setIsAdmin(data.admin);
  };

  useEffect(() => {
    fetchAdmin("http://localhost:5002/user");
  }, []);

  return (
    <>
      {isAdmin ? (
        <Box>
          <Text>Hi Admin</Text>
        </Box>
      ) : (
        <Box>
          <Text>You are not autheorized to view this.</Text>
        </Box>
      )}
    </>
  );
};

export default AdminPage;
