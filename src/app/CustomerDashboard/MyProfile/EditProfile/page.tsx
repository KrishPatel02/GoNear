"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app, db, storage } from "@/Firebase/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { Customer } from "@/types";

import { TextField, Box, InputAdornment } from "@mui/material";
import CustomerDataSequence from "@/Utils/CustomerDataSequence";
import PrimaryButton from "@/UI/PrimaryButton";
import { FaUser, FaPhone, FaBirthdayCake, FaRegSave } from "react-icons/fa";
import { MdEmail, MdPin } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import { TiGlobe } from "react-icons/ti";
import { PiCityBold, PiMapPinAreaBold } from "react-icons/pi";
import Image from "next/image";

const iconClassName = "h-4 w-4";

const fieldIcons: { [key: string]: JSX.Element } = {
  FullName: <HiUser className={iconClassName} />,

  Email: <MdEmail className={iconClassName} />,

  Phone: <FaPhone className={iconClassName} />,

  DateOfBirth: <FaBirthdayCake className={iconClassName} />,

  Address: <IoHome className={iconClassName} />,

  PinCode: <MdPin className={iconClassName} />,

  City: <PiCityBold className={iconClassName} />,

  State: <PiMapPinAreaBold className={iconClassName} />,

  Country: <TiGlobe className={iconClassName} />,
};

const InputField: React.FC<{
  label: string;

  name: string;

  type: string;

  value: string;

  icon?: JSX.Element;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, type, value, onChange }) => (
  <Box className="w-full px-3 mb-4">
    <TextField
      variant="outlined"
      fullWidth
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      label={label}
      InputProps={{
        sx: {
          borderRadius: "8px",

          borderColor: "#e0e0e0",

          color: "#616161",
        },
      }}
      InputLabelProps={{
        shrink: true,

        style: {
          color: "#9e9e9e",

          fontWeight: "normal",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#c0c4cc",
          },

          "&:hover fieldset": {
            borderColor: "#c0c4cc",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },

        "& .MuiInputLabel-root": {
          fontSize: "1rem",

          color: "#9e9e9e",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#1976d2",
        },
      }}
    />
  </Box>
);

const EditProfilePage: React.FC = () => {
  const [user, loadingAuth] = useAuthState(getAuth(app));

  const [formData, setFormData] = useState<Customer | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const customerDataOrder = CustomerDataSequence;

  const hiddenKeys = ["uid", "PhotoUrl"];

  const displayedUserData = formData
    ? Object.fromEntries(
      Object.entries(formData)

        .filter(([key]) => !hiddenKeys.includes(key))

        .sort(
          ([a], [b]) =>
            customerDataOrder.indexOf(a) - customerDataOrder.indexOf(b)
        )
    )
    : {};

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "CustomerData", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFormData(docSnap.data() as Customer);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };

    if (!loadingAuth) {
      fetchCustomerData();
    }
  }, [user, loadingAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData && user) {
      try {
        if (photoFile) {
          const storageRef = ref(storage, `photos/${photoFile.name}`);
          await uploadBytes(storageRef, photoFile);

          const photoUrl = await getDownloadURL(storageRef);

          formData.PhotoUrl = photoUrl;
        }

        const docRef = doc(db, "CustomerData", user.uid);

        await updateDoc(docRef, formData);

        toast.success("Customer data updated successfully!");
      } catch (error) {
        toast.error("Failed to update customer data");

        console.error("Error updating customer data:", error);
      }
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">No user is Logged in</p>

        <p className="text-2xl font-semibold">So, Please Login First</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">No data available</p>
      </div>
    );
  }

  return (
    <>
      <main className="col-span-4 row-span-4 w-full h-full">
        <div className=" rounded-lg  border border-gray-300  p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-wrap -mx-3 mb-6">
              {Object.entries(displayedUserData).map(([key, value]) => (
                <InputField
                  key={key}
                  label={key}
                  name={key as keyof Customer}
                  type={key === "DateOfBirth" ? "date" : "text"}
                  value={value as string}
                  icon={fieldIcons[key] || <FaUser className="mr-2" />}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2 ">
                  Profile Picture
                  <Image className='rounded-full' src={displayedUserData.PhotoUrl} width={50} height={50} alt='User' />
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <PrimaryButton
                value="Update Profile"
                type="submit"
                logo={<FaRegSave />}
                className=" py-2 bg-colorThree mt-4 "
              />
            </div>
          </form>
        </div>

        <ToastContainer />
      </main>
    </>
  );
};

export default EditProfilePage;
