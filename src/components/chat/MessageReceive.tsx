import { VscTriangleDown } from "react-icons/vsc";


export function MessageReceived () {
    return (
        <div className="">
            <div className=" w-fit max-w-[400px] px-3 py-2 rounded-md bg-primary relative text-secondary font-bold ml-14"
            style={{overflowWrap:'break-word'}}
            >
                <VscTriangleDown className="absolute text-[30px] top-[-9.258px] left-[-14px] text-primary "/>
                hello
            </div>
            <p className="text-[10px] pl-14 pt-2 text-white">11:30 pm</p>
        </div>
    )
}