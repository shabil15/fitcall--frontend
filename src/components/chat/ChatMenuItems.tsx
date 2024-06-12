
export function ChatMenuItems () {
    return(
        <div className="h-20 px-5 my-2 flex items-center gap-5 hover:bg-[#e0e2e5] cursor-pointer">
        <div 
            className="h-[4rem] w-[5rem] rounded-full"
            style={{backgroundImage: "url('../src/assets/images/businesswoman-posing.jpg')",backgroundSize: "cover"}}
        ></div>
        <div className="flex justify-between w-full items-center border-b-[1px] h-full">
            <div>
                <h1 className="text-[18px] font-[500]">Username</h1>
                <p className="text-[14px]">last message</p>
            </div>
            
            <p className="text-[14px]">yesterday</p>
        </div>
    </div>
    )
}