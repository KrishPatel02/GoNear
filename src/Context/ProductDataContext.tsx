"use client";
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UpdateDocument } from '@/Utils/EditData';
import { toast } from 'react-toastify';
import { Product } from '@/types/index';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/FirebaseConfig';
// import { useUserData } from '../Usercontext/UserDataContext';
import { AddDataToFirestore } from '@/Utils/AddData';
import { useRouter } from 'next/navigation';

interface State {
  products: Product[] | null;
  productData: Product;
  file: File | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  products: [],
  productData: {
    productName: "",
    description: "",
    category: "",
    price: 0,
    productImage: "",
    sellerID: "",
  },
  file: null,
  loading: false,
  error: null,
};

type Action =
  | { type: 'EDIT_START' }
  | { type: 'EDIT_SUCCESS'; payload: Product }
  | { type: 'EDIT_FAILURE'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'ADD_START' }
  | { type: 'ADD_SUCCESS' }
  | { type: 'ADD_FAILURE'; payload: string }
  | { type: 'SET_FIELD'; fieldName: string; value: any }
  | { type: 'SET_FILE'; file: File | null };


interface ContextProps {
    state: State;
    editProduct: (productId: string, updatedData: Partial<Product>, imageFile: File | null) => Promise<void>;
    fetchProducts: () => Promise<void>;
    addProduct: (sellerID: string) => Promise<void>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }


// for the Edit Product
const editProductReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EDIT_START':
      return { ...state, loading: true, error: null };
    case 'EDIT_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'EDIT_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const EditProductContext = createContext<ContextProps | undefined>(undefined);

export const useEditProduct = (): ContextProps => {
  const context = useContext(EditProductContext);
  if (!context) {
    throw new Error('useEditProduct must be used within an EditProductProvider');
  }
  return context;
};

interface EditProductProviderProps {
  children: ReactNode;
}


// Edit Product Context
export const EditProductProvider: React.FC<EditProductProviderProps> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(editProductReducer, initialState);

  const editProduct = async (productId: string, updatedData: Partial<Product>, imageFile: File | null) => {
    dispatch({ type: 'EDIT_START' });
    try {
      let photoUrl = updatedData.productImage;
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/products/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        photoUrl = await getDownloadURL(storageRef);
        updatedData.productImage = photoUrl;
      }

      await UpdateDocument('Products', productId, updatedData);
      dispatch({ type: 'EDIT_SUCCESS', payload: { ...updatedData, id: productId } as Product });
      toast.success('Product data updated successfully!');
      setTimeout(() => {
        router.push("/SellerDashboard/Products")
      }, 2500);
    } catch (error) {
      dispatch({ type: 'EDIT_FAILURE', payload: 'Error while updating product data' });
      toast.error('Error while updating product data');
    }
  };

  return (
    <EditProductContext.Provider value={{ state, editProduct }}>
      {children}
    </EditProductContext.Provider>
  );
};


// for the Fetch Product
const fetchProductReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'FETCH_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, products: action.payload };
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

const FetchProductsContext = createContext<ContextProps | undefined>(undefined);

// Fetch Product Context
export const useFetchProducts = (): ContextProps => {
    const context = useContext(FetchProductsContext);
    if (!context) {
      throw new Error('useFetchProduct must be used within a FetchProductProvider');
    }
    return context;
  };
  
  interface FetchProductsProviderProps {
    children: ReactNode;
  }
  
  export const FetchProductsProvider: React.FC<FetchProductsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(fetchProductReducer, initialState);
  
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const productsRef = collection(db, 'Products');
        const querySnapshot = await getDocs(productsRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        dispatch({ type: 'FETCH_SUCCESS', payload: productsData });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error instanceof Error ? error.message : 'Error fetching products' });
        toast.error('Error fetching products data');
      }
    };

    useEffect(() => {
      fetchProducts();
    },[]);
  
    return (
        <FetchProductsContext.Provider value={{ state, fetchProducts }}>
         {children}
        </FetchProductsContext.Provider>
    );
  };


  // for the Add Product
  const addProductReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'ADD_START':
        return { ...state, loading: true, error: null };
      case 'ADD_SUCCESS':
        return { ...state, loading: false, error: null, productData: initialState.productData, file: null };
      case 'ADD_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'SET_FIELD':
        return { ...state, productData: { ...state.productData, [action.fieldName]: action.value } };
      case 'SET_FILE':
        return { ...state, file: action.file };
      default:
        return state;
    }
  };

  const AddProductContext = createContext<ContextProps | undefined>(undefined);

  export const useAddProduct = (): ContextProps => {
    const context = useContext(AddProductContext);
    if (!context) {
      throw new Error('useAddProduct must be used within an AddProductProvider');
    }
    return context;
  };

  interface AddProductProviderProps {
    children: ReactNode;
  }

  // Add Product Context
  export const AddProductProvider: React.FC<AddProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(addProductReducer, initialState);
    // const { state: userState } = useUserData();
    // const { user } = userState;
    const router = useRouter();

    const addProduct = async (sellerID: string) => {
      dispatch({ type: 'ADD_START' });
      try {
        let productImage = state.productData.productImage;
        if (state.file) {
          const storage = getStorage();
          const storageRef = ref(storage, `images/products/${state.file.name}`);
          await uploadBytes(storageRef, state.file);
          productImage = await getDownloadURL(storageRef);
        }

        const finalProductData = { ...state.productData, productImage, sellerID };
        await AddDataToFirestore('Products', finalProductData);

        dispatch({ type: 'ADD_SUCCESS' });
        toast.success('Product created successfully!');
        setTimeout(() => {
          router.push('/SellerDashboard/Products');
        }, 1000);
      } catch (error) {
        dispatch({ type: 'ADD_FAILURE', payload: error instanceof Error ? error.message : 'Error adding product' });
        toast.error('Error adding product');
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>) => {
      const { name, value } = e.target as HTMLInputElement;
      dispatch({ type: 'SET_FIELD', fieldName: name, value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        dispatch({ type: 'SET_FILE', file: e.target.files[0] });
      }
    };

    return (
      <AddProductContext.Provider value={{ state, addProduct, handleInputChange, handleFileChange }}>
        {children}
      </AddProductContext.Provider>
    );
  };