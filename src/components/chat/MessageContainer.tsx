import { MessageSend } from "./MessageSend";
import {MessageReceived} from './MessageReceive'

// interface MessageContainerProps {
//   message: string[];
// }

export function MessageContainer() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-end gap-5 py-10 ">
        
      {/* {message.map((message) => ( */}
      <MessageReceived/>

        <MessageSend  />
      {/* ))} */}
    </div>
  );
}