"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { UpdateDocument } from '@/Utils/EditData';
import { auth, db } from '@/Firebase/FirebaseConfig';
import { Customer } from '@/types';


interface State {
    customer: Customer | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: State = {
    customer: null,
    loading: false,
    error: null,
    success: false,
};

type Action =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Customer }
    | { type: 'FETCH_FAILURE'; payload: string }
    | { type: 'EDIT_START' }
    | { type: 'EDIT_SUCCESS'; payload: Customer }
    | { type: 'EDIT_FAILURE'; payload: string }
    | { type: 'LOGOUT' };

const customerDataReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null, success: false };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, customer: action.payload, success: true };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'LOGOUT':
            return { ...state, customer: null, success: false };
        case 'EDIT_START':
            return { ...state, loading: true, error: null, success: false };
        case 'EDIT_SUCCESS':
            return { ...state, customer: action.payload, loading: false, success: true };
        case 'EDIT_FAILURE':
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    fetchCustomerData: (customer: Customer) => Promise<void>;
    logoutUser: () => Promise<void>;
    editCustomer: (updatedData: Partial<Customer>) => Promise<void>;
}

const CustomerDataContext = createContext<ContextProps | undefined>(undefined);

export const useCustomerData = (): ContextProps => {
    const context = useContext(CustomerDataContext);
    if (!context) {
        throw new Error('useCustomerData must be used within a CustomerDataProvider');
    }
    return context;
};

interface UserDataProviderProps {
    children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(customerDataReducer, initialState);
  
    const fetchCustomerData = async (customer: any) => {
      dispatch({ type: 'FETCH_START' });
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
          };
          await setDoc(customerDocRef, customerData);
        }
  
        dispatch({ type: 'FETCH_SUCCESS', payload: customerData });
        localStorage.setItem("User", JSON.stringify(customerData));
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error instanceof Error ? error.message : 'Error fetching customer data' });
        toast.error('Failed to fetch customer data');
      }
    };
  
    const logoutUser = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("User");
        dispatch({ type: 'LOGOUT' });
      } catch (error) {
        toast.error('Failed to logout');
      }
    };
  
    const editCustomer = async (updatedData: any) => {
      try {
        if (!state.customer) throw new Error('No customer to update');
  
        dispatch({ type: 'EDIT_START' });
  
        // Update data in Firestore
        const customerDocRef = doc(db, "CustomerData", state.customer.Email);
        await setDoc(customerDocRef, updatedData, { merge: true });
  
        // Update local state and storage
        const updatedCustomer = { ...state.customer, ...updatedData };
        dispatch({ type: 'EDIT_SUCCESS', payload: updatedCustomer });
        localStorage.setItem('User', JSON.stringify(updatedCustomer));
      } catch (error) {
        dispatch({ type: 'EDIT_FAILURE', payload: error instanceof Error ? error.message : 'Failed to update profile' });
      }
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (customer) => {
        if (customer) {
          fetchCustomerData(customer);
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <UserDataContext.Provider value={{ state, fetchCustomerData, logoutUser, editCustomer }}>
        {children}
      </UserDataContext.Provider>
    );
  };
