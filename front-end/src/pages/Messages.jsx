import { useState } from "react"
import ContactsSidebar from "@/components/chat/Contacts-sidebar"
import ChatBox from "@/components/chat/Chat-box"
import avatar0 from "../imgs/user.png"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const contacts = [
    {
      id: 1,
      name: "Jennifer Fritz",
      lastMessage: "I'm looking to work with a designer that...",
      time: "2:32 PM",
      avatar: avatar0,
      active: true,
    },
    {
      id: 2,
      name: "Laney Gray",
      lastMessage: "Wireframes and interactions need...",
      time: "4:15 PM",
      avatar: avatar0,
      active: false,
    },
    {
      id: 3,
      name: "Oscar Thomson",
      lastMessage: "Networking",
      time: "11:15 PM",
      avatar: avatar0,
      active: false,
    },
    {
      id: 4,
      name: "Kendra Lord",
      lastMessage: "See Slack posts while I was on campus",
      time: "21 Jan",
      avatar: avatar0,
      active: false,
    },
    {
      id: 5,
      name: "Gatlin Huber",
      lastMessage: "Working the way developers work",
      time: "20 Jan",
      avatar: avatar0,
      active: false,
    },
    {
      id: 6,
      name: "Fox Mccloud",
      lastMessage: "I saw in this outline optimized for engineers",
      time: "18 Jan",
      avatar: avatar0,
      active: false,
    },
    {
      id: 7,
      name: "Timothy Gunter",
      lastMessage: "Designers isolated from other designers...",
      time: "4:25 PM",
      avatar: avatar0,
      active: false,
    },
    {
      id: 8,
      name: "Jakill Kyle",
      lastMessage: "Career profile",
      time: "4:25 PM",
      avatar: avatar0,
      active: false,
    },
  ]

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Your story continues on mobile: Build and edit decks. Give and receive feedback. Add content from any other app! 😊",
      time: "3:35 PM",
      sender: "other",
      avatar: avatar0,
    },
    {
      id: 2,
      text: "I've always been on the fringe of people in the design community.",
      time: "3:38 PM",
      sender: "me",
    },
    {
      id: 3,
      text: "Can you Send the file of Loura United Group ?",
      time: "4:21 PM",
      sender: "other",
      avatar: avatar0,
    },
    {
      id: 4,
      text: "Yeah Sure, Here it is.",
      time: "4:25 PM",
      sender: "me",
    },
    {
      id: 5,
      text: "Loura United logo.AI",
      time: "4:25 PM",
      sender: "me",
      isFile: true,
    },
  ])

  const handleSendMessage = (messageText, uploadedFiles = []) => {
    // Handle sending message
    console.log("Sending message:", messageText)
    console.log("Uploaded files:", uploadedFiles)
    
    // Create new message with files
    const newMessage = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me",
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined
    }
    
    // Add the new message to the messages array
    setMessages(prevMessages => [...prevMessages, newMessage])
    
    // In a real app, you would also send it to your backend
    console.log("New message object:", newMessage)
  }

  const selectedContact = contacts[selectedChat] || null

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gray-50">
      <ContactsSidebar
        contacts={contacts}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ChatBox selectedContact={selectedContact} messages={messages} onSendMessage={handleSendMessage} />
    </div>
  )
}
