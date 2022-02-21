import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [rpassword, setRpassword] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    admin: "",
  });

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const cookies = new Cookies();

  const fetchLogin = async () => {
    const res = await fetch("http://localhost:5002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    if (data.jwt) {
      setError("Logging in");

      cookies.set("jwt", data.jwt, {
        path: "/",
        maxAge: 2 * 60 * 60,
      });
    } else {
      setError(data);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  const handleLoginUsername = (e) => {
    setUser((prevState) => {
      return { ...prevState, username: e.target.value };
    });
  };

  const handleLoginPassword = (e) => {
    setUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };
  console.log(user);
  const handleUsername = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, username: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  const handleRPassword = (e) => {
    setRpassword(e.target.value);
  };

  const handleUserType = (e) => {
    let admin = false;

    if (e.target.value === "true") {
      admin = true;
    } else {
      admin = false;
    }

    setNewUser((prevState) => {
      return { ...prevState, admin: admin };
    });
  };

  const handleNew = (e) => {
    e.preventDefault();
    if (newUser.username.length === 0 || newUser.password.length === 0) {
      setError("All fields are required.");
    } else if (newUser.password !== rpassword) {
      setError("Passwords do not match.");
    } else {
      createUser();
    }
  };

  const createUser = async () => {
    const res = await fetch("http://localhost:5002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(newUser),
    });
    const data = await res.json();

    if (
      data ===
      'duplicate key value violates unique constraint "username_unique"'
    ) {
      setError("Username taken");
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Container w="75%" mt="10">
        <Tabs w="100%" isFitted variant="enclosed" colorScheme="blue">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack direction="column" spacing={2}>
                <Input
                  placeholder="Enter username"
                  size="md"
                  onChange={handleLoginUsername}
                />

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={handleLoginPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormControl isInvalid={error}>
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  type="submit"
                  onClick={handleLoginSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction="column" spacing={2}>
                <Input
                  placeholder="Enter username"
                  size="md"
                  onChange={handleUsername}
                />

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={handlePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Retype password"
                    onChange={handleRPassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm">
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <RadioGroup>
                  <Stack direction="row" onChange={handleUserType}>
                    <Radio value="false">Normal</Radio>
                    <Radio value="true">Admin</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl isInvalid={error}>
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  type="submit"
                  onClick={handleNew}
                >
                  Submit
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default LoginPage;
