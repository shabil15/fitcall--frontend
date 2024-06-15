

export function ChatBoxHeader(){
    return (
        <div 
            className="w-full bg-primary h-20 flex items-center px-8"
            style={{boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"}}
        >
            <div 
                className="h-[4rem] w-[4rem] rounded-full"
                // style={{backgroundImage: "url('../src/assets/images/businesswoman-posing.jpg')",backgroundSize: "cover"}}
            ></div>
            <div>
                <h1 className="text-[18px] pl-5 font-[500]">Username</h1>
            </div>
        </div>
    )
}