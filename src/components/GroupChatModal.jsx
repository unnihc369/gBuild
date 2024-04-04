import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Text,
  useToast,
  Box,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../context/ChatContext";

const GroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(true);
  const [chatname, setChatname] = useState("");
  const [userName, setUserName] = useState("");
  // const [allUsers,setAllUsers]=use
  const toast = useToast();
  const {LoadAll,setLoadAll}=ChatState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleCreategroup = async (e) => {
    // e.preventDefault();
    if (!chatname) {
      toast({
        title: "please enter the chatname",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const users = selectedUsers.map((el) => el.userId);

    if (users.length <= 1) {
      toast({
        title: "to create group atleast two member need",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const { data } = await axios.post(
      `http://127.0.0.1:8000/chat/createGroup`,
      {
        userss: users,
        chatname,
        isGroupChat: true,
      },
      config
    );

    if (data) {
      toast({
        title: "group created successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setLoadAll(!LoadAll);
      onClose();
    } else {
      toast({
        title: "There is a error with creating chat",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    setChatname("");
    setSearch("");

  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`http://127.0.0.1:8000/chat/findUser`, {
        params: { name: query },
        headers: config.headers,
      });
      console.log(data);
      // setLoading(false);
      if (data) setSearchResult(data.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  console.log(selectedUsers);

  return (
    <>
      {/* <span onClick={onOpen}>{children}</span> */}
      <Button
        onClick={(e) => {
          // setGroup(!group);
          // group ? onOpen(): onClose();
          onOpen();
        }}
      >
        create group
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            {/* <Text fontSize="27px" pb={3} fontFamily="Work sans">
              Email: {user.email}
            </Text> */}
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={chatname}
                onChange={(e) => {
                  setChatname(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <Button onClick={(e) => handleSearch(userName)}>find</Button>
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <Badge
                  px={2}
                  py={1}
                  borderRadius="lg"
                  m={1}
                  mb={2}
                  variant="solid"
                  fontSize={12}
                  colorScheme="purple"
                  cursor="pointer"
                  onClick={() => console.log(u.username)}
                >
                  {u.username}
                </Badge>
              ))}
            </Box>

            {searchResult &&
              searchResult.length !== 0 &&
              searchResult.map((user) => (
                <Box
                  onClick={() => handleGroup(user)}
                  cursor="pointer"
                  bg="#E8E8E8"
                  _hover={{
                    background: "#38B2AC",
                    color: "white",
                  }}
                  w="100%"
                  d="flex"
                  alignItems="center"
                  color="black"
                  px={3}
                  py={2}
                  mb={2}
                  key={user.userId}
                  borderRadius="lg"
                >
                  <Box>
                    <Text>{user.username}</Text>
                    <Text fontSize="xs">
                      <b>Email : </b>
                      {user.email}
                    </Text>
                  </Box>
                </Box>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                handleCreategroup();
              }}
              colorScheme="blue"
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
