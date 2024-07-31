"use client";

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Assuming you are using this to get the current user
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, db, storage } from '@/Firebase/FirebaseConfig';
import { Seller } from '@/types';

const Page: React.FC = () => {
  const [user, loadingAuth] = useAuthState(getAuth(app));
  const [formData, setFormData] = useState<Seller | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (user) {
        console.log("user", user);
        try {
          const docRef = doc(db, "SellerData", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as Seller);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching seller data:", error);
        }
      }
    };

    if (!loadingAuth) {
      fetchSellerData();
    }
  }, [user]);

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
    if (formData) {
      try {
        if (photoFile) {
          const storageRef = ref(storage, `photos/${photoFile.name}`);
          await uploadBytes(storageRef, photoFile);
          const photoUrl = await getDownloadURL(storageRef);
          formData.PhotoUrl = photoUrl;
        }
        const docRef = doc(db, "SellerData", user.uid);
        await updateDoc(docRef, formData);
        toast.success('Seller data updated successfully!');
      } catch (error) {
        toast.error('Failed to update seller data');
        console.error("Error updating seller data:", error);
      }
    }
  };

  if (loadingAuth) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user is logged in</p>;
  }

  if (!formData) {
    return <p>No data available</p>;
  }

  return (
    <div className="h-screen flex flex-col items-center pt-20 gap-5 ">
      <h1 className="text-4xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ShopOwnerName">
            Shop Owner Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ShopOwnerName"
            name="ShopOwnerName"
            type="text"
            value={formData.FullName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="SellerEmail">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="SellerEmail"
            name="SellerEmail"
            type="SellerEmail"
            value={formData.SellerEmail || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ShopName">
            Shop Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ShopName"
            name="ShopName"
            type="text"
            value={formData.ShopName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ShopAddress">
            Shop Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ShopAddress"
            name="ShopAddress"
            type="text"
            value={formData.ShopAddress || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="GSTNO">
            GST Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="GSTNO"
            name="GSTNO"
            type="text"
            value={formData.GSTNO || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            name="City"
            type="text"
            value={formData.City || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            name="State"
            type="text"
            value={formData.State || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            name="Country"
            type="text"
            value={formData.Country || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pinCode">
            Pin Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pinCode"
            name="PinCode"
            type="text"
            value={formData.PinCode || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Phone"
            name="Phone"
            type="text"
            value={formData.Phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DateOfBirth">
            Date Of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="DateOfBirth"
            name="DateOfBirth"
            type="text"
            value={formData.DateOfBirth || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhotoUrl">
            Photo
          </label>
          <input
            className="mt-2"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-5 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Page;
