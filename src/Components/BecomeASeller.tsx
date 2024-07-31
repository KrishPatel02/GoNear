"use client";
import { Button, TextField, Container, Typography, Box, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db, storage } from '@/Firebase/FirebaseConfig'; // Ensure this import is correct
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Seller, Customer } from '@/types';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/UI/PrimaryButton';

const BecomeASellerForm = () => {

    const router = useRouter();
    const [OwnerName, setOwnerName] = useState("");
    const [ShopName, setShopName] = useState("");
    const [gstno, setGstno] = useState("");
    const [ShopAddress, setShopAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Phone, setPhone] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [Country, setCountry] = useState("");
    const [PinCode, setPinCode] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [Photo, setPhoto] = useState(null); // State for the photo file

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Get the selected file
    };

    // Check the User is logged in or not from localstorage
    const loggedInUser = localStorage.getItem("User") ?? "{}";
    useEffect(() => {
        const parsedLoggedInUser: Customer = JSON.parse(loggedInUser);

        if (parsedLoggedInUser != null) {
            console.log("loggedInUser", parsedLoggedInUser);
            // Setting basic details from the logged in user
            setPhone(parsedLoggedInUser.Phone);
            setCity(parsedLoggedInUser.City);
            setCountry(parsedLoggedInUser.Country);
            setOwnerName(parsedLoggedInUser.FullName);
            setPinCode(parsedLoggedInUser.PinCode);
            setDateOfBirth(parsedLoggedInUser.DateOfBirth)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = null;
        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            user = userCredential.user; //Updating the user

            // Upload the photo to Firebase Storage
            let photoUrl = "";
            if (Photo) {
                const photoRef = ref(storage, `UserImages/${user.uid}/${Photo.name}`);
                await uploadBytes(photoRef, Photo);
                photoUrl = await getDownloadURL(photoRef);
            }

            // Create a seller document in Firestore
            const sellerData: Seller = {
                FullName: OwnerName,
                SellerEmail: Email,
                ShopName: ShopName,
                ShopAddress: ShopAddress,
                GSTNO: gstno,
                PhotoUrl: photoUrl || "",
                Phone: Phone,
                City: City,
                State: State,
                Country: Country,
                uid: user.uid,
                PinCode: PinCode,
                DateOfBirth: DateOfBirth,
            };

            await setDoc(doc(db, "SellerData", sellerData.uid), sellerData);

            toast.success("You are now a seller!!");
            toast.success("Please Login with new credentials!!");

            router.push("/Logout");

            // Clear form fields
            setShopName("");
            setShopAddress("");
            setEmail("");
            setPassword("");
            setPhone("");
            setCity("");
            setState("");
            setCountry("");
            setPinCode("");
            setDateOfBirth("");
            setPhoto(null); // Clear photo
        } catch (error) { //Check for any error
            console.error("Error creating user or adding to Firestore: ", error);
            toast.error("Error: " + error.message);

            //If there is an error while creating Seller Data
            //  then Delete user from FireBase Authorization
            if (user) {
                await deleteUser(user);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 4,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Become a Seller
                </Typography>

                <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    required
                    type="name"
                    value={OwnerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    label="Shop Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={ShopName}
                    onChange={(e) => setShopName(e.target.value)}
                />
                <TextField
                    label="Gst Number"
                    variant="outlined"
                    fullWidth
                    required
                    value={gstno}
                    onChange={(e) => setGstno(e.target.value)}
                />

                <TextField
                    label="Shop Address"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={ShopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                />

                <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    required
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    required
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                />

                <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    required
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                />

                <TextField
                    label="Country"
                    variant="outlined"
                    fullWidth
                    required
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <TextField
                    label="Pin Code"
                    variant="outlined"
                    fullWidth
                    required
                    value={PinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                />

                <TextField
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    required
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={DateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <Input
                    type="file"
                    onChange={handlePhotoChange}
                    required
                />

                <PrimaryButton
                    value={"Become a Seller"}
                />
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default BecomeASellerForm;