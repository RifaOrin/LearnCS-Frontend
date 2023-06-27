import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/jwt/create/";
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const logindata = (e) => {
        e.preventDefault();
        axios
            .post(Url, {
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);
                window.localStorage.setItem(
                    "accessToken",
                    response.data.access
                );
                navigate("");
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    alert("Please Input Your Credentials Correctly");
                }
            });
    };
    return (
        <body>
            <div>
                <h1> Login </h1>
                <form>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span></span>
                        <label>Email</label>
                    </div>

                    <div>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span></span>
                        <label>Password</label>
                    </div>

                    <button onClick={logindata}>Login</button>

                    <div>
                        Don't Have An Account? <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </body>
    );
}

export default LoginPage;
