import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

interface MessageInputProps {
    handleSendMessage: (value: string) => void;
}
export function ChatInput({handleSendMessage}:MessageInputProps) {

    const [inputData,setInputData] = useState<string>("");

    function handleSendClick() {
        handleSendMessage(inputData);
        setInputData("");
    }
    return (
        <div className="w-full h-20 bg-primary flex gap-4 items-center px-10">
            <input 
                type="text" 
                className="h-12 px-5 w-[98%] rounded-md outline-none"
                placeholder="Message..."
                value={inputData}
                onChange={(e) => {setInputData(e.target.value)}}
                />
            <button>
                <IoSendSharp 
                    className="text-3xl text-secondary"
                    onClick={handleSendClick}
                />
            </button>
        </div>
    )
}