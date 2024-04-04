
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

// this to get all the variables declared
export const ChatState = () => useContext(ChatContext);

const ChatProvider = (props) => {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [whichF, SetWhichF] = useState(null);
  const [blogFarm, SetblogFarm] = useState(null);
  const [curChat,setCurChat]=useState("");
  const [curMessage,setCurMessage]=useState("");
  const[LoadAll,setLoadAll]=useState(false);

  useEffect(() => {
   
  }, [load]);

  return (
    <ChatContext.Provider
      value={{
        setUser,
        setLoad,
        SetWhichF,
        SetblogFarm,
        curChat,
        setCurChat,
        setCurMessage,
        curMessage,
        setLoadAll,
        LoadAll
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
