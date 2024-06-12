import { IoSendSharp } from "react-icons/io5";

export function ChatInput() {

    return (
        <div className="w-full h-20 bg-[#efe3cb] flex gap-4 items-center px-10">
            <input 
                type="text" 
                className="h-12 px-5 w-[98%] rounded-md outline-none"
                placeholder="Message..."
                // value={inputData}
                // onChange={(e) => {setInputData(e.target.value)}}
                />
            <button>
                <IoSendSharp 
                    className="text-3xl text-[#121211]"
                    // onClick={handleSendClick}
                />
            </button>
        </div>
    )
}