import { MessageSend } from "./MessageSend";

// interface MessageContainerProps {
//   message: string[];
// }

export function MessageContainer() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-end gap-5 py-10">
        
      {/* {message.map((message) => ( */}
        <MessageSend  />
      {/* ))} */}
    </div>
  );
}