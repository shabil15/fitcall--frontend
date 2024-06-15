import {useEffect,useState} from 'react';
import {ChatBox} from '../../../components/chat/ChatBox';
import {ChatMenu} from '../../../components/chat/ChatMenu'
import {
    useGetMessageMutation,
    useSendMessageMutation,
} from '../../../slices/chatApiSlice';
import {Message} from '../../../@types/message';
import {Conversation} from '../../../@types/conversation';
import { RootState } from "../../../app/store";
import {useSelector } from "react-redux";
 export default function Chat() {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [currentChat,setCurrentChat] = useState<Message[]>([]);
    const [isChatSelected,setIsChatSelected] = useState(false);
    const [conversationId,setConversationId] = useState<string>("");
    const [conversations,setConverations] = useState<Conversation[]>([]);
    const [arrivalMessage,setArrivalMessage] = useState<Message>({} as Message);
    const [sendMessage] = useSendMessageMutation();
    const [getMessage] = useGetMessageMutation();


    const userId = userInfo?._id;

    // useEffect(()=> {
    //     async function fetchConversations() {
    //         const response = await getMessage(userId).unwrap();
    //         console.log(response);
    //         setConverations(response);
    //     }
    //     fetchConversations();
    // },[conversationId,userId,getMessage]);

    async function handleMenuItemClick(conversationId:string) {
        const response = await getMessage(conversationId).unwrap();
        setCurrentChat(response.data);
    }

    return (
        <div className="h-[100vh] w-[100vw] flex overflow-hidden ">
            <ChatMenu handleMenuItemClick = {handleMenuItemClick}/>
            <ChatBox currentChat={currentChat}/>
        </div>
    )
} 