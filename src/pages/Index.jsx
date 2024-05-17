import React, { useState, useEffect } from "react";
import { Box, Container, VStack, HStack, Input, Button, Text, Avatar, IconButton, Image } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const messagesData = [
  { id: 1, user: "Alice", text: "Hello!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhdmF0YXJ8ZW58MHx8fHwxNzE1OTc0Mjk2fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, user: "Bob", text: "Hi Alice!", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXZhdGFyfGVufDB8fHx8MTcxNTk3NDI5OHww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [messages, setMessages] = useState(messagesData);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (imageUrl = null) => {
    if (inputValue.trim() === "") return;

    const newMessage = imageUrl
      ? {
          id: messages.length + 1,
          user: "You",
          text: "",
          imageUrl,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx5b3VyJTIwYXZhdGFyfGVufDB8fHx8MTcxNTk3NDMwMHww&ixlib=rb-4.0.3&q=80&w=1080",
        }
      : {
          id: messages.length + 1,
          user: "You",
          text: inputValue,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx5b3VyJTIwYXZhdGFyfGVufDB8fHx8MTcxNTk3NDMwMHww&ixlib=rb-4.0.3&q=80&w=1080",
        };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSendMessage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box width="100%" height="70vh" overflowY="auto" border="1px solid lightgray" borderRadius="md" p={4}>
          {messages.map((message) => (
            <HStack key={message.id} alignSelf={message.user === "You" ? "flex-end" : "flex-start"} spacing={4} mb={4}>
              <Avatar src={message.avatar} />
              <VStack alignItems={message.user === "You" ? "flex-end" : "flex-start"}>
                <Text fontWeight="bold">{message.user}</Text>
                {message.text && <Text>{message.text}</Text>}
                {message.imageUrl && <Image src={message.imageUrl} maxH="200px" />}
              </VStack>
            </HStack>
          ))}
        </Box>
        <HStack width="100%">
          <Input type="file" accept="image/*" onChange={handleImageUpload} display="none" id="image-upload" />
          <Button as="label" htmlFor="image-upload">
            Upload Image
          </Button>
          <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
