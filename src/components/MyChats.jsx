import { Box, Text } from "@chakra-ui/layout";
import GroupChatModal from "./GroupChatModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatContext";
import { Button } from "@chakra-ui/react";
// import ProfileModal from "./ProfileModal";

const MyChats = () => {
   const { curChat, LoadAll, setCurChat, curMessage, setCurMessage } =
     ChatState();
  // console.log(curMessage);
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  const [allChat, setallChat] = useState([]);

  const alllchathanlder = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/chat/getAll", {
      headers: headers,
    });
    if (data) {
      setallChat(data.data);
    }
  };
  const getallMessage = async (chatId) => {
    // console.log(chatId);
    if(!chatId){
      console.log("please provide chat id");
      return ;
    }
    const { data } = await axios.get("http://127.0.0.1:8000/message/getAll", {
      params: { chatId: chatId },
      headers: headers,
    });
    if(data){
      setCurMessage(data.data);
    }
  };
  const handlergetMessages = async (chatId) => {
   setCurChat(chatId);
   getallMessage(chatId.id);
  };

  const praveen=(is)=>{
     is();
  }

  useEffect(() => {
    alllchathanlder();
  }, [LoadAll]);

  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="31%"
      borderRadius="lg"
      borderWidth="1px"
      height={"602px"}
    >
      <u>
        {" "}
        <Text fontSize="28px" fontFamily="Work sans">
          my chats
        </Text>
        {/* <Button onClick={(e) => setGroup(!group)}>create group</Button> */}
        <GroupChatModal  />
      </u>
      <Box overflowY={"scroll"} height={"550px"}>
        {allChat &&
          allChat.length != 0 &&
          allChat.map((el, index) => (
            <Box
              key={el.id} // Make sure to provide a unique key for each rendered element
              border={"1px solid black"}
              padding={"10px"}
              borderRadius={"10px"}
              onClick={(e) => {
                e.preventDefault();
                handlergetMessages(el);
              }}
              margin={"4px"}
            >
              <h2>{el.chatname}</h2>{" "}
              <p>{!el.isGroupChat && el.users[1].email}</p>{" "}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default MyChats;
