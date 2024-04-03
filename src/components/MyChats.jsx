import { Box, Text } from "@chakra-ui/layout";
import GroupChatModal from "./GroupChatModal";
// import ProfileModal from "./ProfileModal";

const MyChats = () => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="31%"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" fontFamily="Work sans">
        My Chats
        <GroupChatModal />
        {/* <ProfileModal/> */}
      </Text>
    </Box>
  );
};

export default MyChats;
