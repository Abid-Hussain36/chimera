import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import imageCompression from "browser-image-compression";

const NewProductsScreen = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const {user} = useContext(UserContext);
    const userName = user.userName;
    //Keeps track of the uploaded image
    const [file, setFile] = useState(null);

    //Updates file state in response to user uploads
    const handleFileChange = async(e) => {
        const currFile = e.target.files[0];
        const options = {
            maxSize: 1,
            maxWidthOrHeight: 1024
        };
        try{
            const compressedFile = await imageCompression(currFile, options);
            setFile(compressedFile);
        } catch(err){
            console.log(err);
        }
    }


    //Sends file as base64
    const handleSubmit = async() => {
        const base64Image = await convertToBase64(file);
        const newProduct = {
            productName: productName,
            price: price,
            userName: userName,
            imageBase64: base64Image
        }
        const result = await axios.post("http://localhost:5050/product", newProduct);
        console.log(result);
    }

    //Converts a file into base64 asynchronously
    const convertToBase64 = (currFile) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(currFile);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = () => {
                reject(error);
            }
        });
    }

    return(
        <>
            <p>New Products Screen</p>
            <input
                type="text"
                value={productName}
                onChange={e => setProductName(e.target.value)}
            />
            <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpeg, .png, .jpg"
            />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}

export default NewProductsScreen;