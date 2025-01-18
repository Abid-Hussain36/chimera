import { useContext } from "react";
import UserContext from "../contexts/UserContext.jsx";

const ProfileScreen = () => {
    const {user} = useContext(UserContext);

    return(
        <>
            <p>Profile Screen</p>
            <p>{user.userName}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>{user.streetAddress}</p>
            <p>{user.city}</p>
            <p>{user.state}</p>
            <p>{user.country}</p>
        </>
    );
}

export default ProfileScreen;