import {ChatBox} from '../../../components/chat/ChatBox';
import {ChatMenu} from '../../../components/chat/ChatMenu'
export default function Chat() {
    return (
        <div className="h-[100vh] w-[100vw] flex overflow-hidden">
            <ChatMenu/>
            <ChatBox/>
        </div>
    )
} 