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
    useToast,
    Center,
    Select,
    HStack,
    Image
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
import { ChevronDownIcon } from "@chakra-ui/icons"
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import "./Miscellaneous/table.css"
import Navbar from "./Miscellaneous/navbar"
import axios from "axios"
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MmyForm = () => {
    const toast = useToast();
    const [make, setmake] = useState("");
    const [model, setmodel] = useState("");
    const [year, setyear] = useState("");
    const [vin, setvin] = useState("");
    const [load, setLoad] = useState(false);
    const [custmmi, setcustmmi] = useState([{}]);
    const [srch, setsrch] = useState("");
    const [filter, setFilter] = useState('');
    const submitHandler = async () => {
        console.log("ss")
        if ((/^[A-Z0-9]*$/.test(vin) === false) && vin.length !== 8) {
            toast({
                title: 'Vin should be 8 charachters long and should contain only Capital charachters and numbers',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        if ((/^[0-9]*$/.test(year) === false) && year.length !== 4) {
            toast({
                title: 'Please enter a valid year i.e 2019',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            return;
        }
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
            const { data } = await axios.post("http://localhost:5000/api/addmmy", { make, model, year, vin },
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
                    title: 'MMY Data already exists',
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
    const [mmi, setmmi] = useState([{}]);
    useEffect(() => {
        getMmiData();

    }, [])

    useEffect(() => {
        getcustMmiData();
    }, [])
    const getMmiData = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },

            };
            const { data } = await axios.get("http://localhost:5000/api/addmmy",
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
    const updateHandler = async (status, _id) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",

                },

            };
            const { data } = await axios.post("http://localhost:5000/api/addmmy/acceptreject", { _id, status },
                config);
            console.log(data)
            setcustmmi(data)

        } catch (error) {
            toast({
                title: 'Error Updating',
                position: 'bottom',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const [approved, setapproved] = useState([]);
    const [pending, setpending] = useState([]);
    const [rejected, setrejected] = useState([]);
    const count = () => {
        (Array.isArray(custmmi)) && custmmi.map((doc, index) => {
            if (doc.status === "approved") {
                setapproved(oldArray => [...oldArray, doc.make]);
            }
            if (doc.status === "pending") {
                setpending(oldArray => [...oldArray, doc.make]);
            }
            if (doc.status === "rejected") {
                setrejected(oldArray => [...oldArray, doc.make]);
            }
        })
    }

    useEffect(() => {
        count()
    }, [custmmi])
    console.log(approved.length, pending.length, rejected.length)

    const data = {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [
            {
                label: '# of Votes',
                data: [approved.length, pending.length, rejected.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Navbar />
            <Flex
                minH={'10vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'xxl'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Enter Make, Model, Year  and VIN number</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            <ChevronDownIcon w={8} h={8} color="grey.500" />
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="Make">
                                <FormLabel>Make </FormLabel>
                                <Input required onChange={(e) => setmake(e.target.value)} value={make} placeholder='Enter makers name' />
                            </FormControl>
                            <FormControl id="Model">
                                <FormLabel>Model</FormLabel>
                                <Input required onChange={(e) => setmodel(e.target.value)} value={model} placeholder='Enter model name' />
                            </FormControl>
                            <FormControl id="Year">
                                <FormLabel>Year</FormLabel>
                                <Input required onChange={(e) => setyear(e.target.value)} value={year} placeholder='Enter year' />
                            </FormControl>
                            <FormControl id="VIN">
                                <FormLabel>Enter 8 charachters of VIN number</FormLabel>
                                <Input required onChange={(e) => setvin(e.target.value)} value={vin} placeholder='Enter 8 digit vin' />
                            </FormControl>
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
                        <Flex flexDir={'row'}><Heading fontSize={'2xl'}>Pending Requests <Select placeholder='Filter by' my={8} onChange={(e) => setFilter(e.target.value)}>
                            <option value='pending'>pending</option>
                            <option value='approved'>approved</option>
                            <option value='rejected'>rejected</option>
                        </Select>
                            <Input variant='flushed' placeholder='enter vin to search' value={srch} onChange={(e) => setsrch(e.target.value)} my={'5'} /></Heading>
                        </Flex>

                        <table class="table" >

                            <thead>
                                <th> Date added</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th >Year</th>
                                <th>Vin</th>
                                <th>status</th>
                                <th>Image</th>
                                <th></th>
                            </thead>

                            <tbody>

                                {
                                    (Array.isArray(custmmi)) && custmmi.filter((doc, index) =>
                                        doc.vin?.includes(srch.toString()) || srch === ""
                                    ).map((d, index) => {
                                        if (d.status === filter || filter === "") {
                                            if (d.status === "pending") {
                                                return (
                                                    <tr>
                                                        <td data-label="Date added">{d.Date}</td>
                                                        <td data-label="Make">{d.make}</td>
                                                        <td data-label="Model">{d.model}</td>
                                                        <td data-label="Year">{d.year}</td>
                                                        <td data-label="Vin">{d.vin}</td>
                                                        <td data-label="status">{d.status} <HStack my={5}><Button colorScheme='green' onClick={(e) => updateHandler("approved", d._id)}>Approve</Button>
                                                            <Button colorScheme='red' onClick={(e) => updateHandler("rejected", d._id)}>Reject</Button>
                                                            {/* <Button colorScheme='blue' onClick={(e) => updateHandler("need Comment", d._id)}>Need Comment</Button> */}
                                                        </HStack> </td>
                                                        {
                                                            d.Pic && <td>  <a href={d.Pic}><Image src={d.Pic} boxSize={'200px'} /></a>

                                                            </td>
                                                        }

                                                    </tr>

                                                )
                                            }
                                            return (
                                                <>  <tr>
                                                    <td>{d.Date}</td><td>{d.make}</td>
                                                    <td>{d.model}</td>

                                                    <td>{d.year}</td>
                                                    <td>{d.vin}</td>
                                                    <td>{d.status}</td>
                                                    {
                                                        d.Pic && <td>  <a href={d.Pic}><Image src={d.Pic} boxSize={'200px'} /></a>
                                                        </td>
                                                    }
                                                </tr>
                                                </>
                                            )
                                        }


                                    })
                                }


                            </tbody>

                        </table>




                    </Center>
                    <Heading fontSize={'2xl'}>Chart Depicting number of approved , rejected and pending requests</Heading>
                    <Center width={500}> <Pie data={data} /></Center>

                </Stack>
            </Flex >
        </>
    )
}
export default MmyForm