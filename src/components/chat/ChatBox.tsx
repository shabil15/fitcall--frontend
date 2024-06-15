import {useState} from 'react';
import {ChatBoxHeader} from './ChatBoxHeader';
import {ChatInput} from './ChatInput';
import {MessageContainer} from './MessageContainer';
import {Message} from '../../@types/message';


interface ChatBoxProps {
    currentChat: Message
}

export function ChatBox({currentChat}: ChatBoxProps) {
    const [message,setMessage] = useState<string[]>([]);
    
    function handleSendMessage(value:string) {
        if(!value.trim()){
            return;
        }
        setMessage([...message,value]);
    }
    return (
        <div className="chat-box w-[70%]">
            <div className="chat-box-header">
                <ChatBoxHeader/>
                <MessageContainer message={message}/>
                <ChatInput handleSendMessage= {handleSendMessage} />
            </div>
        </div>
    )
}