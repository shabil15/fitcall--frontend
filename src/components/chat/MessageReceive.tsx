import { VscTriangleDown } from "react-icons/vsc";


export function MessageReceived () {
    return (
        <div className="">
            <div className=" w-fit max-w-[400px] px-3 py-2 rounded-md bg-[#ccad77] relative text-white ml-14"
            style={{overflowWrap:'break-word'}}
            >
                <VscTriangleDown className="absolute text-[30px] top-[-9.258px] left-[-14px] text-[#ccad77]"/>
                hello
            </div>
            <p className="text-[10px] pl-14 pt-2">11:30 pm</p>
        </div>
    )
}