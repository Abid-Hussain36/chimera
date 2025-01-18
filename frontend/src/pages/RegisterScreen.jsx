import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const RegisterScreen = () => {
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const products = [];
    const shoppingList = [];
    const favVendors = [];

    const handleSubmit = async() => {
        const newUser = {
            userName: userName,
            email: email,
            password: password,
            streetAddress: streetAddress,
            city: city,
            state: state,
            country: country,
            products: products,
            shoppingList: shoppingList,
            favVendors: favVendors
        };
        const submission = await axios.post("http://localhost:5050/user", newUser, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(submission.data){
            const result = await axios.post(`http://localhost:5050/user/${email}/${password}`);
            if(result.data._id == null || result.data._id == undefined){
                console.log("Invalid Login Details");
            } else{
                setUser(result.data);
                navigate("/home");
            }
        } else{
            console.log("Error Registering User");
        }
    }

    return(
        <>
            <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
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
            <input
                type="text"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
            />
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
            />
            <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default RegisterScreen;