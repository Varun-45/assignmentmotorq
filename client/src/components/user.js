import React from 'react'
import Navbar from "./Miscellaneous/navbar"
import { Center, HStack, Select, filter, useToast } from '@chakra-ui/react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,

} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import axios from "axios"
import { useEffect, useState } from 'react';
import "./Miscellaneous/table.css"
const User = () => {

    const [make, setmake] = useState("");
    const [model, setmodel] = useState("");
    const [year, setyear] = useState("");
    const [vin, setvin] = useState("");
    const [load, setLoad] = useState(false);
    const toast = useToast();
    const [mmi, setmmi] = useState([{}]);
    const [defaultval, setdefault] = useState(0);
    const [idx, setidx] = useState(0);
    const [custmmi, setcustmmi] = useState([{}]);
    useEffect(() => {
        getMmiData();
        getcustMmiData();
    }, [])
    const getMmiData = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },

            };
            const { data } = await axios.get("http://localhost:5000/api/addmmy/",
                config);
            console.log(data)
            setmmi(data)

        } catch (error) {
            toast({
                title: 'Error Fetching data',
                position: 'bottom',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const getcustMmiData = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },

            };
            const { data } = await axios.get("http://localhost:5000/api/addmmy/customerdata",
                config);
            console.log(data)
            setcustmmi(data)

        } catch (error) {
            toast({
                title: 'Error Fetching data',
                position: 'bottom',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const [filter, setFilter] = useState('');
    const submitHandler = async () => {
        if ((/^[A-Z0-9]*$/.test(vin) === false) && vin.length !== 17) {
            toast({
                title: 'Vin should be 17 charachters long and should contain only Capital charachters and numbers',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        console.log(model, make, year, vin)
        console.log("ss")
        setLoad(true);
        if (make === "" || model === "" || year === "" || vin === "") {
            toast({
                title: 'Please fill all the fields',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            setLoad(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },

            };
            const { data } = await axios.post("http://localhost:5000/api/addmmy/customerdata", { make, model, year, vin, status: "pending", pic },
                config);
            setLoad(false);

            toast({
                title: 'Added Successfully',
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setmake(" ");
            setyear(" ");
            setmodel(" ");
            setvin(" ");
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                toast({
                    title: 'VIN already exists not yet rejected',
                    position: 'bottom',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'Error Occured',
                    position: 'bottom',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }

            setLoad(false);
        }
    }
    const [pic, setPic] = useState("")
    const postDetails = (pic) => {

        setLoad(true);
        if (pic === undefined) {
            toast({
                title: 'Please select an image',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            setLoad(false)
            return
        }
        else if (pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg") {
            const data = new FormData();

            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "do15gqrjf");
            fetch("https://api.cloudinary.com/v1_1/do15gqrjf/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    console.log(data.url.toString())
                    toast({
                        title: 'image uploaded successfully',

                        position: 'bottom',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    setPic(data.url.toString());
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoad(false)

                })

        }
        else {
            toast({
                title: 'Please select an image',
                description: 'Image format should be png,jpg or jpeg',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            setLoad(false)
            return
        }

    }
    const submitComment = () => {

    }
    const [Comment, setComment] = useState("")
    const [srch, setsrch] = useState("");
    return (
        <div><Navbar />
            <Flex
                minH={'10vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'xxl'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'}>Enter Make, Model, Year  and VIN number to register a new request</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>

                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormLabel>Select Make</FormLabel>
                            <Select placeholder='Select Make' onChange={(e) => setmake(e.target.value)}>
                                {
                                    mmi.map((doc, index) => {
                                        return (
                                            <option value={doc.make}>{doc.make}</option>
                                        )
                                    })
                                }
                            </Select>
                            <FormLabel>Select model based on the make</FormLabel>
                            <Select placeholder='Select Model' onChange={(e) => setmodel(e.target.value)}>
                                {
                                    mmi.map((doc, index) => {
                                        if (doc.make === make) return (
                                            <option value={doc.model}>{doc.model}</option>
                                        )
                                    })
                                }
                            </Select>
                            <FormLabel>Select year as per previous choices</FormLabel>
                            <Select placeholder='Select Year' onChange={(e) => setyear(e.target.value)}>
                                {
                                    mmi.map((doc, index) => {
                                        if (doc.make === make && doc.model === model) {
                                            return (
                                                <option value={doc.year}>{doc.year}</option>
                                            )
                                        }


                                    })
                                }
                            </Select>

                            {
                                mmi.map((doc, index) => {
                                    if (doc.make === make && doc.model === model && doc.year === year) {
                                        return (
                                            <>
                                                <FormControl><FormLabel>Enter remaining charachters of VIN number</FormLabel>
                                                    <Input required onChange={(e) => setvin(e.target.value)} placeholder='Enter 8 digit vin' defaultValue={doc.vin} />
                                                </FormControl>
                                                < Input type="file" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} placeholder="Choose a profile image" />

                                            </>)

                                    }



                                })
                            }

                            <Stack spacing={10}>

                                <Button
                                    isLoading={load}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={submitHandler}

                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <Center flexDir={'column'}>
                        <Flex flexDir={'row'}><Heading fontSize={'2xl'}>Your Requests Till now <Select placeholder='Filter by' my={8} onChange={(e) => setFilter(e.target.value)}>
                            <option value='pending'>pending</option>
                            <option value='approved'>approved</option>
                            <option value='rejected'>rejected</option>
                        </Select>
                            <Input variant='flushed' placeholder='enter vin to search' value={srch} onChange={(e) => setsrch(e.target.value)} /></Heading>
                        </Flex>

                        <table className='table'>


                            <tr>
                                <th> Date added</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th >Year</th>
                                <th>Vin</th>
                                <th>status</th>
                            </tr>

                            <tbody>

                                {
                                    custmmi.filter((doc, index) =>
                                        doc.vin?.includes(srch.toString()) || srch === ""
                                    ).map((d, index) => {
                                        if (d.status === filter || filter === "") {
                                            return (
                                                <>  <tr >
                                                    <td data-label="Date added">{d.Date}</td>
                                                    <td data-label="Make">{d.make}</td>
                                                    <td data-label="Model">{d.model}</td>

                                                    <td data-label="Year">{d.year}</td>
                                                    <td data-label="Vin">{d.vin}</td>
                                                    <td data-label="status">{d.status} {
                                                        // (d.status === "need Comment") && <HStack><Input onChange={(e) => setComment(e.target.value)}></Input><Button colorScheme='green' onClick={submitComment}>Send</Button></HStack>
                                                    } </td>

                                                </tr>
                                                </>
                                            )
                                        }
                                        // return (

                                        // )

                                    })
                                }


                            </tbody>

                        </table>
                    </Center>
                </Stack>
            </Flex >
        </div>
    )
}

export default User