import { Link } from "react-router-dom";
import Chat from "./chat";
import { IonIcon } from "@ionic/react";
import { chatbubbles } from "ionicons/icons";

function Chaticon(){
    return(
        <Link to = "./chat">
            <button class="fixed right-4 bottom-4 px-4 py-3 bg-[#05F26C] rounded-full text-lg font-bold shadow mr-2"> <IonIcon icon={chatbubbles} className="text-[#011C26] text-4xl"></IonIcon></button>
        </Link>
    );
}
export default Chaticon;