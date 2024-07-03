import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "me" }]);
      setInputValue("");
    }
  };

  return (
    <div className="flex h-full">
      <ChatWindow
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

const ChatWindow = ({ messages, inputValue, setInputValue, handleSendMessage }) => (
  <div className="flex-1 flex flex-col">
    <div className="flex items-center p-4 border-b">
      <Avatar>
        <AvatarImage src="https://via.placeholder.com/40" alt="Chat Avatar" />
        <AvatarFallback>CA</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <div className="font-semibold">Chat Name</div>
        <div className="text-sm text-muted-foreground">Online</div>
      </div>
    </div>
    <ScrollArea className="flex-1 p-4 space-y-4">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
    </ScrollArea>
    <div className="p-4 border-t flex items-center space-x-4">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type a message"
        className="flex-1"
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  </div>
);

const MessageBubble = ({ message }) => (
  <div
    className={`p-2 rounded-lg max-w-xs mb-4 ${
      message.sender === "me" ? "bg-primary text-primary-foreground self-end" : "bg-muted"
    }`}
  >
    {message.text}
  </div>
);

export default Index;