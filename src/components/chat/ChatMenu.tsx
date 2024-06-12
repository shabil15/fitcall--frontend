// import { SearchBox } from "../searchbox/searchBox";
import { ChatMenuItems } from "./ChatMenuItems";


export function ChatMenu() {
    // const [search, setSearch] = useState("")
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
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
                <ChatMenuItems/>
            </div>
        </div>
    );
}