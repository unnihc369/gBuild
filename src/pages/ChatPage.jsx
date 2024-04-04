import Chatbox from "../components/Chatbox.jsx";
import GroupChatModal from "../components/GroupChatModal.jsx";
import MyChats from "../components/MyChats.jsx";
import SideDrawer from "../components/SideDrawer.jsx";

const ChatPage = () => {
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <div
        style={{
          width: "100%",
          height: "91.5vh",
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <MyChats />
        
        <Chatbox />
      </div>
    </div>
  );
};

export default ChatPage;
