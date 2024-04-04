import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// axios
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import axios, { isCancel } from "axios";
import { useState } from "react";



function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
   const [userSearch, setuserSearch] = useState('');
  //  const [isOpen,setisOpen]=useState(false);
   const [searchedUsers, setsearchedUsers] = useState([]);
  //  console.log(userSearch);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  };
  // console.log(headers);

   const handlerUserSearch=async(e)=>{
       e.preventDefault();
      //  console.log("hi");
      const data = await axios.get("http://127.0.0.1:8000/chat/findUser", {
        headers: headers,
        params: { name: userSearch },
      });
     
        setsearchedUsers(data.data.data);
    

   }
   const handlerChatcreating=async(user)=>{
       
         const {data} = await axios.post(
           "http://127.0.0.1:8000/chat/create",
           {
             chatname: user.username,
             userId: user.userId,
             isGroupChat: false,
           },
          {
            headers:headers
          }
         );

       if(data){
         
        onClose();
       }
  
       
   }
  //  console.log(searchedUsers);

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        // mb={2}
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="solid" onClick={onOpen}>
            search
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          study with friends
        </Text>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Search by username"
              onChange={(e) => setuserSearch(e.target.value)}
            />
            <Button backgroundColor={"lightblue"} onClick={handlerUserSearch}>
              search
            </Button>

            {searchedUsers &&
              searchedUsers.length !== 0 &&
              searchedUsers.map((user, index) => (
                <Box
                  key={user.userId} // Make sure to provide a unique key for each rendered element
                  border={"1px solid black"}
                  padding={"10px"}
                  borderRadius={"10px"}
                  onClick={(e)=>{
                    e.preventDefault();
                    handlerChatcreating(user)}}
                >
                  <h2>{user.username}</h2>{" "}
                  <p>{user.email}</p>{" "}
                 
                </Box>
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
