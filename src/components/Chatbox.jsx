import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { messages } from "../data/message";
import "./style.css";
import { Avatar, Button, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../context/ChatContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Chatbox = () => {
  const [content,setcontent]=useState('');
   const { curChat, setCurChat ,curMessage,setCurMessage} = ChatState();
  //  console.log(curChat);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
// console.log(curChat);
const getallMessage = async (chatId) => {

  if (!chatId) {
    console.log("please provide chat id");
    return;
  }
  const { data } = await axios.get("http://127.0.0.1:8000/message/getAll", {
    params: { chatId: chatId },
    headers: headers,
  });
  if (data) {
    setCurMessage(data.data);
  }
};

const handleSubmit=async(e)=>{
  e.preventDefault();
  const userId=JSON.parse(localStorage.getItem('user')).id;
  if(!curChat.id||!content||!userId){
     window.alert("please provide all document");
     return;
  }
  const { data } = await axios.post("http://127.0.0.1:8000/message/sendMsg", {
    chatId: curChat.id,
    content: content,
  },
  {
    headers:headers
  });

  if(data){
    getallMessage(curChat.id);
  }
  setcontent('');

}

  // useEffect(() => {
  //       getallMessage();
    
  // }, [curChat])
  

  return (
    <Box
      d="flex"
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w="68%"
      height={"600px"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="3xl" pb={3} fontFamily="Work sans">
        {curChat.chatname}
      </Text>
      <Box
        d="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="450px"
        borderRadius="lg"
        overflowY="scroll"
      >
        {curMessage &&
          curMessage.map((m, i) => (
            <div className="messages" style={{"margin":"2px"}}>
              {m.sender !== JSON.parse(localStorage.getItem("user")).id && (
                <Tooltip label={m.sender} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    // src={m.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  marginLeft: `${
                    m.sender === JSON.parse(localStorage.getItem("user")).id
                      ? `auto`
                      : `0`
                  }`,
                  backgroundColor: `${
                    m.sender === JSON.parse(localStorage.getItem("user")).id
                      ? "#BEE3F8"
                      : "#B9F5D0"
                  }`,
                  // marginLeft: isSameSenderMargin(m, i),
                  // marginTop: isSameUser(m, i) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "8px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
          
      </Box>
      <FormControl id="first-name" isRequired mt={3}>
        <Input width={"85%"}  marginRight={"5px"} variant="filled" bg="#E0E0E0" placeholder="Enter a message.." onChange={(e)=>setcontent(e.target.value)} />
        <Button onClick={(e)=>{handleSubmit(e)}}>send</Button>
      </FormControl>
    </Box>
  );
};

export default Chatbox;
