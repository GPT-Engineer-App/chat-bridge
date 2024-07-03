import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, MessageSquare } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const Layout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar />
          <div className="w-full flex-1">{/* Add nav bar content here! */}</div>
          <UserDropdown />
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    // Clear chat logic
    const event = new CustomEvent("clearChat");
    window.dispatchEvent(event);
  };

  const chatItems = [
    { name: "John Doe", lastMessage: "Hey, how are you?" },
    { name: "Jane Smith", lastMessage: "Let's catch up later." },
    { name: "Alice Johnson", lastMessage: "Meeting at 3 PM." },
    { name: "Bob Brown", lastMessage: "Got the documents." },
  ];

  const filteredChatItems = chatItems.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" onClick={() => handleNavClick("/")}>
            <MessageSquare className="h-6 w-6" />
            <span>Chat App</span>
          </NavLink>
        </div>
        <div className="flex-1 p-4">
          <Input
            placeholder="Search chats"
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-4">
            {filteredChatItems.map((chat, index) => (
              <ChatItem key={index} name={chat.name} lastMessage={chat.lastMessage} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    // Clear chat logic
    const event = new CustomEvent("clearChat");
    window.dispatchEvent(event);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <NavLink to="/" onClick={() => handleNavClick("/")}>
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Chat App</span>
          </NavLink>
          <div className="p-4">
            <Input placeholder="Search chats" className="mb-4" />
            <div className="space-y-4">
              {/* Example chat items */}
              <ChatItem name="John Doe" lastMessage="Hey, how are you?" />
              <ChatItem name="Jane Smith" lastMessage="Let's catch up later." />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const UserDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ChatItem = ({ name, lastMessage }) => (
  <div className="flex items-center space-x-4 p-2 hover:bg-muted cursor-pointer rounded-lg">
    <Avatar>
      <AvatarImage src="https://via.placeholder.com/40" alt={name} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-muted-foreground">{lastMessage}</div>
    </div>
  </div>
);

export default Layout;