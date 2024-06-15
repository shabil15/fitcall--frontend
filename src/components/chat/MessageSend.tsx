import { VscTriangleDown } from "react-icons/vsc";

export function MessageSend() {
    return (
        <div className="flex flex-col items-end">
            <div
                className="px-3 py-2 max-w-[400px] rounded-md bg-primary relative text-secondary font-bold mr-14"
                style={{ overflowWrap: 'break-word' }}
            >
                <VscTriangleDown className="absolute text-[30px] top-[-9px] right-[-14px] text-primary" />
                {/* {message} */} 
                Helloo 
            </div>
            <p className="text-[10px] pt-2 mr-14 text-white">11:30 pm</p>
        </div>
    );
}
