import {useEffect,useState} from 'react';
// import { SearchBox } from "../searchbox/searchBox";
import { ChatMenuItems } from "./ChatMenuItems";
import {useGetMessageMutation } from '../../slices/chatApiSlice';
import {Conversation} from '../../@types/conversation';
import { RootState } from "../../app/store";
import {useSelector} from 'react-redux';

interface ChatMenuProps {
    handleMenuItemClick: (conversationId: string) => void;
}
export function ChatMenu({handleMenuItemClick}:ChatMenuProps) {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    // const [search, setSearch] = useState("")
    const [conversation,setConversation ] = useState<convesation[]>([]);
    const userId = userInfo?._id; 
    const [getMessage] = useGetMessageMutation();

    useEffect(()=> {
        async function fetchConversation(){
            const response = await getMessage(userId?userId:"").unwrap();
            setConversation(response)
        }
        fetchConversation();
    },[getMessage,userId]);

    // function handleSearch(){

    // }
    
    return (
        <div className="chat-list w-[30%] bg-[#F5F2EC] overflow-scroll no-scrollbar">
            <div className="sticky top-0 bg-[#F5F2EC] pb-5">
                <h2 className="text-[25px] pl-10 font-bold py-5">Chat</h2>
                <div className="w-full flex justify-center">
                    {/* <SearchBox handleSearch={handleSearch} search={search} setSearch={setSearch}/>   */}
                </div>
            </div>

            <div className="pt-5 flex flex-col gap-0 mb-40">
            {
                    conversation.length > 0 ? (conversation.map((conversation, index) => (
                        <div 
                        onClick={() => handleMenuItemClick(conversation._id || "")}
                            key={index}
                        >
                            <ChatMenuItems conversation={conversation} userId={userId || ""}/>
                        </div>
                    ))) : (
                        <div className="w-full flex items-center justify-center text-[13px] text-gray-400">No Chat yet !</div>
                    )
                }
            </div>
        </div>
    );
}