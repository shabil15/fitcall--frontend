// import {useState} from 'react';
import {ChatBoxHeader} from './ChatBoxHeader';
import {ChatInput} from './ChatInput';
import {MessageContainer} from './MessageContainer';


export function ChatBox() {
    // const [message,setMessage] = useState<string[]>([]);
    
    return (
        <div className="chat-box w-[70%]">
            <div className="chat-box-header">
                <ChatBoxHeader/>
                <MessageContainer />
                <ChatInput />
            </div>
        </div>
    )
}