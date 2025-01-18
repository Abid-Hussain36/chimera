import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const LoginScreen = () => {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async() => {
        const result = await axios.post(`http://localhost:5050/user/${email}/${password}`);
        if(result.data._id == null || result.data._id == undefined){
            console.log("Invalid Login Details");
        } else{
            setUser(result.data);
            navigate("/home");
        }
    }

    return(
        <>
            <input 
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </>
    );
}

export default LoginScreen;