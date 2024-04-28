import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  ModalCloseButton,
  Text,
  useDisclosure,
  Center,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getRandomCompany } from "../functions/randomOrgainzation";
import { getRandomLocation } from "../functions/randomCity";
import { RxSlash } from "react-icons/rx";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";


const AdminPage = () => {
  const [taskStats, setTaskStats] = useState({});
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTaskStatistics();
    fetchUsers();
  }, [currentPage,limit]);

  const fetchTaskStatistics = async () => {
    try {
      const response = await fetch("http://localhost:5500/admin/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTaskStats(data.data);
        
      } else {
        console.error("Failed to fetch task statistics");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:5500/user/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Logout successful",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Failed to logout",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/");
    localStorage.removeItem("token");
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5500/admin/users?page=${currentPage}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const members = data.users.filter((user) => user.roles.includes("user"));
        setUsers(members);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserTasks = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5500/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.tasks);
        setSelectedUser(data.tasks);
      } else {
        console.error("Failed to fetch user tasks");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowUserTasks = (id) => {
    fetchUserTasks(id)
    onOpen();
  };

  return (
    <Box p={10} w="100%" textAlign="center">
      <Heading fontSize={["2rem","3rem","4rem"]} fontWeight="bold" mb={8}>
        Admin Dashboard
      </Heading>
      <Flex
        flexDirection={["column", "column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        mb={6}
      >
        <Box mb={[4, 4, 0]} mr={[0, 0, 4]}>
          <Image
            src={taskStats?.admin?.image}
            alt="Admin"
            boxSize={["100px", "100px", "130px"]}
            borderRadius="full"
          />
        </Box>
        <Box>
          <Text fontSize={["xl", "xl", "3rem"]} fontWeight="bold">
            {taskStats?.admin?.username}
          </Text>
          <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
            Position: CEO
          </Text>
        </Box>
        <Flex columnGap={2}  alignItems={"center"} mt={[4,4,0]}>
        <Button colorScheme="red" onClick={logoutUser} >
          Logout
        </Button>
        <Select value={limit} mr={1} onChange={(e) => setLimit(e.target.value)} bg={"#3182CE"}  _focus={{ outline: "none" }} w={"50%"}>
            <option value="6" style={{ backgroundColor: "#F36114"}}>6</option>
            <option value="9" style={{ backgroundColor: "#F36114" }}>9</option>
            <option value="12" style={{ backgroundColor: "#F36114" }}>12</option>
      </Select>
        </Flex>
        
      </Flex>

      <Box mt={8} mb={8} className="task-statistics" >
        <Heading fontSize={["xl", "xl", "2xl"]} fontWeight="bold" mb={4}>
          Task Statistics
        </Heading>
        <Flex justifyContent="space-around">
          <Text fontSize={["0.7rem", "1rem", "2rem"]}>
            Tasks Completed: {taskStats.completed}
          </Text>
          <Text fontSize={["0.7rem", "1rem", "2rem"]}>
            Pending Tasks: {taskStats.pending}
          </Text>
          <Text fontSize={["0.7rem", "1rem", "2rem"]}>
            Tasks Created Today: {taskStats.totalTask}
          </Text>
        </Flex>
      </Box>
      <Box className="manage-users">
        <Heading fontSize={["xl", "xl", "2xl"]} fontWeight="bold" mb={4}>
          Manage Users
        </Heading>
        <Flex flexWrap="wrap" justifyContent="center">
          {users.map((user) => (
            <Flex
              key={user.userId}
              m={2}
              p={4}
              border="1px solid #e2e8f0"
              borderRadius="md"
              boxShadow="md"
              flexDirection={["column", "column", "row"]}
              alignItems={["center", "center", "flex-start"]}
              width={["100%", "45%", "30%"]}
              onClick={() => handleShowUserTasks(user.userId)}
              cursor="pointer"
            >
              <Image
                src={user.image}
                alt={user.username}
                boxSize="150px"
                objectFit="cover"
                mb={[4, 4, 0]}
              />
              <Flex
                flex="1"
                flexDirection="column"
                justifyContent="center"
                textAlign="start"
                ml={[0, 0, 4]}
              >
                <Text fontSize={["md", "md", "lg"]} fontWeight="bold">
                  Name: {user.username}
                </Text>
                <Text fontSize={["sm", "sm", "md"]} color="gray.600">
                  Email: {user.email}
                </Text>
                <Text fontSize={["sm", "sm", "md"]} color="gray.600">
                  userId: {user.userId}
                </Text>
                <Text fontSize={["sm", "sm", "md"]} color="gray.600">
                  Organization: {getRandomCompany()}
                </Text>
                <Text fontSize={["sm", "sm", "md"]} color="gray.600">
                  city: {getRandomLocation()}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Center width="100%" bottom={8} mt={8}>
          <Button border={"1px solid black"} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} ml={2}><ChevronLeftIcon/></Button>
          <Input ml={2} bg={"white"} color={"black"} value={currentPage} p={2} width={10} onChange={(e) => setCurrentPage(Math.min(e.target.value, totalPages))} />
          <RxSlash size={30} />
          <Button bg={"#3182CE"} mr={2} color={"white"} _hover={{bg:"blue"}} ml={2}>{totalPages}</Button>
          <Button border={"1px solid black"} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} ml={2}><ChevronRightIcon/></Button>
      </Center>

     
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Tasks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedUser && (
            <Box>
              <Flex justifyContent="space-between" mb={4}>
                <Heading as="h3" size="md">
                  Name: {selectedUser.user.username}
                </Heading>
                <Heading as="h3" size="md">
                  Total Tasks: {selectedUser.allTasks.length}
                </Heading>
              </Flex>
              {selectedUser.allTasks.map((task) => (
                <Box key={task.taskId} mb={4} p={4} bg="gray.100" borderRadius="md">
                  <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Heading as="h4" size="md">{task.title}</Heading>
                    <Text fontSize="sm" fontWeight="bold" color={task.status === "completed" ? "green.500" : "red.500"}>
                      {task.status === "completed" ? "Completed" : "Incomplete"}
                    </Text>
                  </Flex>
                  <Text>{task.description}</Text>
                </Box>
              ))}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
    </Box>
  );
};

export default AdminPage;
