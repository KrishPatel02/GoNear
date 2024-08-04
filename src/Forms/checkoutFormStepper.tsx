"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, auth } from "@/Firebase/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { HiUser, HiMiniIdentification } from "react-icons/hi2";
import { TiGlobe } from "react-icons/ti";
import { PiCityBold, PiMapPinAreaBold } from "react-icons/pi";
import { MdEmail, MdPin, MdOutlinePassword, MdStore } from "react-icons/md";
import { FaMapLocationDot, FaSquarePhoneFlip } from "react-icons/fa6";
import { ImLocation } from "react-icons/im";
import PrimaryButton from "../UI/PrimaryButton";
import { v4 as uuidv4 } from "uuid";
import tailwindConfig from "../../tailwind.config";

const BecomeASellerStepperForm = () => {
  const steps = [
    "Product Information",

    "Shipping Address",

    "Payment Method",

    "Review Order",
  ];

  const [activeStep, setActiveStep] = useState(0);

  const [sellerData, setSellerData] = useState({
    
  });

  const iconStepperClassName = "h-5 w-5 mr-2 text-colorTwo";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !sellerData.FullName ||
        !sellerData.SellerEmail ||
        !sellerData.Phone
      ) {
        toast.error(
          "Please fill out all required fields in Personal Information."
        );

        return;
      }
    }

    if (activeStep === 1) {
      if (
        !sellerData.ShopName ||
        !sellerData.ShopAddress ||
        !sellerData.GSTNO
      ) {
        toast.error("Please fill out all required fields in Shop Information.");

        return;
      }
    }

    if (activeStep === 2) {
      if (
        !sellerData.City ||
        !sellerData.State ||
        !sellerData.Country ||
        !sellerData.PinCode
      ) {
        toast.error("Please fill out all required fields in Address Details.");

        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const uniqueId = uuidv4();

      sellerData.uid = uniqueId;

      const userCredential = await createUserWithEmailAndPassword(
        auth,

        sellerData.SellerEmail,

        sellerData.Password
      );

      const userId = userCredential.user.uid;

      sellerData.uid = userId;

      const { Password, ...dataToSave } = sellerData;

      await setDoc(doc(db, "SellerData", userId), dataToSave);

      toast.success("Seller data saved successfully!");

      console.log("Seller data:", dataToSave);

      setSellerData({
        FullName: "",

        SellerEmail: "",

        Phone: "",

        City: "",

        State: "",

        Country: "",

        PinCode: "",

        ShopName: "",

        ShopAddress: "",

        GSTNO: "",

        Password: "",

        uid: "",
      });

      setActiveStep(0);
    } catch (error) {
      console.error("Error storing seller data: ", error);

      toast.error("Failed to save seller data.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen pt-20">
      <div className="w-4/5 bg-white p-8 rounded-lg  border border-gray-300 shadow-sm">
        <h1 className="text-colorTwo text-2xl font-bold text-center">
          Become a Seller
        </h1>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-root .Mui-completed": {
              color: tailwindConfig.theme.extend.colors.colorOne,
            },

            "& .MuiStepLabel-root .Mui-active": {
              color: tailwindConfig.theme.extend.colors.colorTwo,
            },

            "& .MuiStepLabel-root .MuiStepIcon-root": {
              color: tailwindConfig.theme.extend.colors.colorThree,
            },

            "& .MuiStepIcon-root.Mui-active": {
              color: tailwindConfig.theme.extend.colors.colorTwo,
            },

            "& .MuiStepIcon-root.Mui-completed": {
              color: tailwindConfig.theme.extend.colors.colorOne,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <div>
            <div className="flex items-center mb-4">
              <HiUser className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Full Name"
                name="FullName"
                value={sellerData.FullName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <MdEmail className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Email"
                name="SellerEmail"
                value={sellerData.SellerEmail}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <MdOutlinePassword className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="Password"
                value={sellerData.Password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <FaSquarePhoneFlip className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Phone"
                name="Phone"
                value={sellerData.Phone}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <div className="flex items-center mb-4">
              <MdStore className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Shop Name"
                name="ShopName"
                value={sellerData.ShopName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <ImLocation className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Shop Address"
                name="ShopAddress"
                value={sellerData.ShopAddress}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <HiMiniIdentification className={iconStepperClassName} />

              <TextField
                fullWidth
                label="GST Number"
                name="GSTNO"
                value={sellerData.GSTNO}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div className="flex items-center mb-4">
              <PiCityBold className={iconStepperClassName} />

              <TextField
                fullWidth
                label="City"
                name="City"
                value={sellerData.City}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <FaMapLocationDot className={iconStepperClassName} />

              <TextField
                fullWidth
                label="State"
                name="State"
                value={sellerData.State}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <TiGlobe className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Country"
                name="Country"
                value={sellerData.Country}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <MdPin className={iconStepperClassName} />

              <TextField
                fullWidth
                label="Pin Code"
                name="PinCode"
                value={sellerData.PinCode}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Confirmation</h3>

            <ul className="list-disc pl-5">
              <li>Full Name: {sellerData.FullName}</li>

              <li>Email: {sellerData.SellerEmail}</li>

              <li>Phone: {sellerData.Phone}</li>

              <li>City: {sellerData.City}</li>

              <li>State: {sellerData.State}</li>

              <li>Country: {sellerData.Country}</li>

              <li>Pin Code: {sellerData.PinCode}</li>

              <li>Shop Name: {sellerData.ShopName}</li>

              <li>Shop Address: {sellerData.ShopAddress}</li>

              <li>GST Number: {sellerData.GSTNO}</li>
            </ul>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <PrimaryButton
            disabled={activeStep === 0}
            onClickFunc={handleBack}
            value="Back"
          />

          <PrimaryButton
            onClickFunc={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            value={activeStep === steps.length - 1 ? "Submit" : "Next"}
          />
        </div>

        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default BecomeASellerStepperForm;
