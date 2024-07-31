"use client";

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app, db, storage } from '@/Firebase/FirebaseConfig';
import { Customer } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faHome,
  faPhone,
  faBirthdayCake,
  faCity,
  faMapPin,
  faGlobe,
  faFlag
} from '@fortawesome/free-solid-svg-icons';

const Page: React.FC = () => {
  const [user, loadingAuth] = useAuthState(getAuth(app));
  const [formData, setFormData] = useState<Customer | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

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
        toast.success('Customer data updated successfully!');
      } catch (error) {
        toast.error('Failed to update customer data');
        console.error("Error updating customer data:", error);
      }
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-semibold">Loading...</p>
    </div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-semibold">No user is logged in</p>
    </div>;
  }

  if (!formData) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-semibold">No data available</p>
    </div>;
  }

  return (
    <div className="min-h-scree flex flex-col items-center ">
      <h1 className="text-4xl font-bold text-colorOne mb-8">Edit Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="fullName">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                name="FullName"
                type="text"
                value={formData.FullName || ''}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="Email"
                type="email"
                value={formData.Email || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="address">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                name="Address"
                type="text"
                value={formData.Address || ''}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                name="Phone"
                type="text"
                value={formData.Phone || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="dateOfBirth">
                <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                Date of Birth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="dateOfBirth"
                name="DateOfBirth"
                type="date"
                value={formData.DateOfBirth || ''}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="city">
                <FontAwesomeIcon icon={faCity} className="mr-2" />
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="City"
                type="text"
                value={formData.City || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="state">
                <FontAwesomeIcon icon={faMapPin} className="mr-2" />
                State
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                name="State"
                type="text"
                value={formData.State || ''}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="country">
                <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                Country
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                name="Country"
                type="text"
                value={formData.Country || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="pinCode">
                <FontAwesomeIcon icon={faFlag} className="mr-2" />
                Pin Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-colorTwo leading-tight focus:outline-none focus:shadow-outline"
                id="pinCode"
                name="PinCode"
                type="text"
                value={formData.PinCode || ''}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-colorTwo text-sm font-bold mb-2" htmlFor="photoUrl">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-white py-2 pl-2.5 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-colorTwo hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-colorOne/80 hover:bg-colorOne text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;