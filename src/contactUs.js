import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
    callOutline,
    mailOutline,
    locationOutline,
    logoFacebook,
    logoTwitter,
    logoLinkedin,
    logoInstagram,
} from "ionicons/icons";

function Contact() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            email: email,
            message: message,
        };

        axios
            .post("https://kasifzisan.pythonanywhere.com/mail/", formData)
            .then((response) => {
                console.log("Message sent successfully:", response.data);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    };

    return (
        <body className="antialiased bg-gray-100 ">
            <div className="flex w-full min-h-screen justify-center items-center">
                <div className="flex flex-col md:flex-row md:space-x-6 md:space-y-0 space-y-6 bg-[#498C60] w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden">
                    <div className="flex flex-col space-y-8 justify-between">
                        <div>
                            <h1 className="font-bold text-4xl tracking-wide">
                                Contact Us
                            </h1>
                            <p className="pt-2 text-[#bde2cab0] text-sm">
                                Got a question, feedback, or need assistance?
                                We're here to help!{" "}
                            </p>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <div className="inline-flex space-x-2 items-center">
                                <IonIcon
                                    icon={callOutline}
                                    className="text-[#05F26C] text-xl"
                                />
                                <span>(+880) 14567890</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <IonIcon
                                    icon={mailOutline}
                                    className="text-[#05F26C] text-xl"
                                />
                                <span>webapp1714@gmail.com</span>
                            </div>
                            <div className="inline-flex space-x-2 items-center">
                                <IonIcon
                                    icon={locationOutline}
                                    className="text-[#05F26C] text-xl"
                                />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-lg">
                            <a href="#">
                                <IonIcon
                                    icon={logoFacebook}
                                    className="text-white"
                                />
                            </a>
                            <a href="#">
                                <IonIcon
                                    icon={logoTwitter}
                                    className="text-white"
                                />
                            </a>
                            <a href="#">
                                <IonIcon
                                    icon={logoLinkedin}
                                    className="text-white"
                                />
                            </a>
                            <a href="#">
                                <IonIcon
                                    icon={logoInstagram}
                                    className="text-white"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-4"
                            >
                                <div>
                                    <label htmlFor="">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Message</label>
                                    <textarea
                                        placeholder="Message"
                                        rows="4"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-[#05F26C]"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="inline-block self-end bg-[#498C60] hover:bg-[#7ED98B] hover:text-gray-600 hover:scale-105 duration-300 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
export default Contact;
