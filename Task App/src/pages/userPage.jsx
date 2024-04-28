import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Stack,
  Text,
  useToast,
  Input,
  Flex,
  Image,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td, // Import the Image component
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      let response = await fetch("http://localhost:5500/user/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTasks(data.tasks.allTasks || []);
        setUser(data.tasks.user);
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Failed to fetch tasks",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:5500/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTask,
          description: newTaskDescription,
          taskId: id,
          dueDate:dueDate,
        }),
      });
      if (response.ok) {
        setNewTask("");
        setNewTaskDescription("");
        setId("");
        setDueDate("");
        fetchTasks();
        toast({
          title: "Success",
          description: "Task added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Failed to add task",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateStatus = async (taskId, status) => {
    console.log(status);
    console.log(taskId);
    try {
      const response = await fetch(
        `http://localhost:5500/task/task/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) {
        fetchTasks();
        toast({
          title: "Success",
          description: "Task status updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Failed to update task status",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteTask = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `http://localhost:5500/task/task/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        fetchTasks();
        toast({
          title: "Success",
          description: "Task deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.msg || "Failed to delete task",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box p={4}>
      <Flex justifyContent={"space-between"}  alignItems={"center"}>
        <Flex alignItems={"center"} mb={5} justifyContent={"space-between"} >
        <Box >
          <Heading mb={4}>User Details</Heading>
          <Flex  alignItems={"center"} flexDirection={"column"}>
          <Image src={user.image} alt="User Photo" borderRadius="full" boxSize="100px" />
          <Text fontWeight={"bold"}>Name: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          </Flex>
        </Box>
        </Flex>
        <Button colorScheme="red" onClick={logoutUser}>
            Logout
          </Button>
      </Flex>
      <Box>
          <Heading mb={4}>Add Task</Heading>
        </Box>
      <Stack direction="row" spacing={2} mb={4}>
        <Input
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Input
          placeholder="Enter description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <Input
          placeholder="Task id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
         <Input
          type="date"
          placeholder="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button colorScheme="blue" onClick={addTask}>
          Add
        </Button>
      </Stack>
      <Heading mb={4} textAlign={"center"}>totalTasks: {tasks.length}</Heading>
      <Box p={4} width="100%">
    <Table variant="simple">
    
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>Description</Th>
        <Th>Status</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {tasks.map((task) => (
        <Tr key={task.taskId}>
          <Td>{task.title}</Td>
          <Td>{task.description}</Td>
          <Td>
            <Checkbox
              isChecked={task.status === "completed"}
              onChange={() =>
                updateStatus(
                  task.taskId,
                  task.status === "completed" ? "pending" : "completed"
                )
              }
            >
              {task.status === "completed" ? "Completed" : "Pending"}
            </Checkbox>
          </Td>
          <Td>
            <Button colorScheme="red" onClick={() => deleteTask(task.taskId)}>
              Delete
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</Box>

    </Box>
  );
};

export default UserPage;
