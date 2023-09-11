import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setusername] = useState("")
    const handleShowClick = () => setShowPassword(!showPassword);
    const [pass, setpass] = useState("");
    const navigate = useNavigate();
    const submitHandle = () => {
        if (username === "user" && pass === "user123") {
            navigate('/user');
        }
        if (username === "admin" && pass === "admin123") {
            navigate('/admin')
        }
    }
    return (
        <Flex
            borderRadius={'5'}
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="grey"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="Username" onChange={(e) => setusername(e.target.value)} value={username} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={(e) => setpass(e.target.value)} value={pass}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                            </FormControl> <Button colorScheme="green"
                                onClick={(e) => {
                                    setpass("user123");
                                    setusername("user")
                                }}>Join as User</Button>
                            <Button colorScheme="blue" onClick={(e) => {
                                setpass("admin123");
                                setusername("admin")
                            }}>Join as Admin</Button>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                onClick={submitHandle}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>

                </Box>
            </Stack>

        </Flex>
    );
};

export default App;
