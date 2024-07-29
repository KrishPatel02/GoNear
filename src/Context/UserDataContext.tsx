"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { UpdateDocument } from '@/Utils/EditData';
import { auth, db } from '@/Firebase/FirebaseConfig';
import { Customer, Seller } from '@/types';


interface State {
  customer: Customer | null;
  loading: boolean;
  seller: Seller | null;
  error: string | null;
  success: boolean;
}

const initialState: State = {
  customer: null,
  seller: null,
  loading: false,
  error: null,
  success: false,
};

// type Action =
//   | { type: 'FETCH_START' }
//   | { type: 'FETCH_SUCCESS'; payload: Customer }
//   | { type: 'FETCH_FAILURE'; payload: string }
//   | { type: 'EDIT_START' }
//   | { type: 'EDIT_SUCCESS'; payload: Customer }
//   | { type: 'EDIT_FAILURE'; payload: string }
//   | { type: 'LOGOUT' };

// Action Types for Seller and Customer
type Action =
  | { type: 'FETCH_CUSTOMER_START' }
  | { type: 'FETCH_CUSTOMER_SUCCESS'; payload: Customer }
  | { type: 'FETCH_CUSTOMER_FAILURE'; payload: string }
  | { type: 'EDIT_CUSTOMER_START' }
  | { type: 'EDIT_CUSTOMER_SUCCESS'; payload: Customer }
  | { type: 'EDIT_CUSTOMER_FAILURE'; payload: string }
  | { type: 'FETCH_SELLER_START' }
  | { type: 'FETCH_SELLER_SUCCESS'; payload: Seller }
  | { type: 'FETCH_SELLER_FAILURE'; payload: string }
  | { type: 'EDIT_SELLER_START' }
  | { type: 'EDIT_SELLER_SUCCESS'; payload: Seller }
  | { type: 'EDIT_SELLER_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Handling Actions of Customer and Seller
const UserDataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_CUSTOMER_START':
    case 'FETCH_SELLER_START':
      return { ...state, loading: true, error: null, success: false };

    case 'FETCH_CUSTOMER_SUCCESS':
      return { ...state, loading: false, customer: action.payload, success: true };

    case 'FETCH_SELLER_SUCCESS':
      return { ...state, loading: false, seller: action.payload, success: true };

    case 'FETCH_CUSTOMER_FAILURE':
    case 'FETCH_SELLER_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };

    case 'EDIT_CUSTOMER_START':
    case 'EDIT_SELLER_START':
      return { ...state, loading: true, error: null, success: false };

    case 'EDIT_CUSTOMER_SUCCESS':
      return { ...state, customer: action.payload, loading: false, success: true };

    case 'EDIT_SELLER_SUCCESS':
      return { ...state, seller: action.payload, loading: false, success: true };

    case 'EDIT_CUSTOMER_FAILURE':
    case 'EDIT_SELLER_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };

    case 'LOGOUT':
      return { ...state, customer: null, seller: null, success: false };

    default:
      return state;
  }
};

interface ContextProps {
  state: State;
  fetchCustomerData: (customer: Customer) => Promise<void>;
  fetchSellerData: (seller: Seller) => Promise<void>;
  editCustomer: (updatedData: Partial<Customer>) => Promise<void>;
  editSeller: (updatedData: Partial<Seller>) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const UserDataContext = createContext<ContextProps | undefined>(undefined);

export const useUserData = (): ContextProps => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a CustomerDataProvider');
  }
  return context;
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(UserDataReducer, initialState);

  const fetchCustomerData = async (customer: any) => {
    dispatch({ type: 'FETCH_CUSTOMER_START' });
    try {
      const customerDocRef = doc(db, 'CustomerData', customer.uid);
      const customerDoc = await getDoc(customerDocRef);

      let customerData;
      if (customerDoc.exists()) {
        customerData = customerDoc.data() as Customer;
      } else {
        customerData = {
          FullName: customer.displayName || "",
          Email: customer.email || "",
          Address: "",
          PinCode: "",
          DateOfBirth: "",
          City: "",
          State: "",
          Country: "",
          Phone: "",
          PhotoUrl: customer.photoURL || "",
          uid: customer.uid,
        };
        await setDoc(customerDocRef, customerData);
      }

      dispatch({ type: 'FETCH_CUSTOMER_SUCCESS', payload: customerData });
      localStorage.setItem("User", JSON.stringify(customerData));
    } catch (error) {
      dispatch({ type: 'FETCH_CUSTOMER_FAILURE', payload: error instanceof Error ? error.message : 'Error fetching customer data' });
      toast.error('Failed to fetch customer data');
    }
  };

  const fetchSellerData = async (seller: any) => {
    dispatch({ type: 'FETCH_SELLER_START' });
    try {
      const sellerDocRef = doc(db, 'SellerData', seller.uid);
      const sellerDoc = await getDoc(sellerDocRef);

      const sellerData = sellerDoc.data() as Seller;

      dispatch({ type: 'FETCH_SELLER_SUCCESS', payload: sellerData });
      localStorage.setItem("Seller", JSON.stringify(sellerData));
    } catch (error) {
      dispatch({ type: 'FETCH_SELLER_FAILURE', payload: error instanceof Error ? error.message : 'Error fetching seller data' });
      toast.error('Failed to fetch seller data');
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("User");
      localStorage.removeItem("Seller");
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const editCustomer = async (updatedData: Partial<Customer>) => {
    try {
      if (!state.customer) throw new Error('No customer to update');

      dispatch({ type: 'EDIT_CUSTOMER_START' });

      await UpdateDocument("CustomerData", state.customer.uid, updatedData);

      await updateProfile(auth.currentUser!, {
        displayName: updatedData.FullName,
        photoURL: updatedData.PhotoUrl,
      });

      const FinalUpdatedCustomer = { ...state.customer, ...updatedData };
      console.log("Updated customer: ", FinalUpdatedCustomer);
      dispatch({ type: 'EDIT_CUSTOMER_SUCCESS', payload: FinalUpdatedCustomer });

      localStorage.setItem('User', JSON.stringify(FinalUpdatedCustomer));
    } catch (error) {
      dispatch({ type: 'EDIT_CUSTOMER_FAILURE', payload: error instanceof Error ? error.message : 'Failed to update profile' });
    }
  };

  const editSeller = async (updatedData: Partial<Seller>) => {
    try {
      if (!state.seller) throw new Error('No seller to update');

      dispatch({ type: 'EDIT_SELLER_START' });

      await UpdateDocument("SellerData", state.seller.uid, updatedData);

      await updateProfile(auth.currentUser!, {
        displayName: updatedData.ShopOwnerName,
        photoURL: updatedData.PhotoUrl,
      });

      const FinalUpdatedSeller = { ...state.seller, ...updatedData };
      console.log("Updated seller: ", FinalUpdatedSeller);
      dispatch({ type: 'EDIT_SELLER_SUCCESS', payload: FinalUpdatedSeller });

      localStorage.setItem('Seller', JSON.stringify(FinalUpdatedSeller));
    } catch (error) {
      dispatch({ type: 'EDIT_SELLER_FAILURE', payload: error instanceof Error ? error.message : 'Failed to update profile' });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCustomerData(user);
        fetchSellerData(user);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserDataContext.Provider value={{ state, fetchCustomerData, fetchSellerData, logoutUser, editCustomer, editSeller }}>
      {children}
    </UserDataContext.Provider>
  );
};
