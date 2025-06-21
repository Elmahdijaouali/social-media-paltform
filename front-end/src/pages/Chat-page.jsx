import { useState } from "react"
import ContactsSidebar from "@/components/chat/Contacts-sidebar"
import ChatBox from "@/components/chat/Chat-box"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const contacts = [
    {
      id: 1,
      name: "Jennifer Fritz",
      lastMessage: "I'm looking to work with a designer that...",
      time: "2:32 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
    {
      id: 2,
      name: "Laney Gray",
      lastMessage: "Wireframes and interactions need...",
      time: "4:15 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 3,
      name: "Oscar Thomson",
      lastMessage: "Networking",
      time: "11:15 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 4,
      name: "Kendra Lord",
      lastMessage: "See Slack posts while I was on campus",
      time: "21 Jan",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 5,
      name: "Gatlin Huber",
      lastMessage: "Working the way developers work",
      time: "20 Jan",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 6,
      name: "Fox Mccloud",
      lastMessage: "I saw in this outline optimized for engineers",
      time: "18 Jan",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 7,
      name: "Timothy Gunter",
      lastMessage: "Designers isolated from other designers...",
      time: "4:25 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
    {
      id: 8,
      name: "Jakill Kyle",
      lastMessage: "Career profile",
      time: "4:25 PM",
      avatar: "/placeholder.svg?height=40&width=40",
      active: false,
    },
  ]

  const messages = [
    {
      id: 1,
      text: "Your story continues on mobile: Build and edit decks. Give and receive feedback. Add content from any other app! 😊",
      time: "3:35 PM",
      sender: "other",
      avatar: "/placeholder.svg?height=32&width=32",
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
      avatar: "/placeholder.svg?height=32&width=32",
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
  ]

  const handleSendMessage = (messageText) => {
    // Handle sending message
    console.log("Sending message:", messageText)
    // In a real app, you would add the message to the messages array
    // and send it to your backend
  }

  const selectedContact = contacts[selectedChat] || null

  return (
    <div className="flex h-screen bg-gray-50">
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
