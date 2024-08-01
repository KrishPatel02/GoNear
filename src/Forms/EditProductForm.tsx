"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEditProduct } from '@/Context/ProductDataContext';
import { Product } from '@/types/index';
import { auth } from "@/Firebase/FirebaseConfig";

interface EditProductFormProps {
  ProductData: Product;
  productId: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ ProductData, productId }) => {

  const { state, editProduct } = useEditProduct();
  const [userUID, setUserUID] = useState<string | null>(null);

    useEffect(() => {
        const fetchSellerID = () => {
            const user = auth.currentUser;
            console.log("user from add edit form",user);
            if (user) {
                setUserUID(user.uid);
            }
        };

        fetchSellerID();
    }, []);

    // console.log("userUID",userUID)
    // console.log("ProductData.sellerID",ProductData.sellerID)

    if (userUID !== ProductData.sellerID) {
      toast.error("Sorry, you cannot update this product");
    }

  const [productName, setProductName] = useState(ProductData?.productName);
  const [productDescription, setProductDescription] = useState(ProductData?.description);
  const [productPrice, setProductPrice] = useState(ProductData?.price);
  const [productCategory, setProductCategory] = useState(ProductData?.category);
  const [productImage, setProductImage] = useState<string | null>(ProductData?.productImage);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProductData = {
      productName,
      description: productDescription,
      category: productCategory,
      productImage,
      price: productPrice,
    };
    await editProduct(productId, updatedProductData, imageFile);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 w-[70%] mx-auto border border-2 p-5">
      <div>
        <input
          type="text"
          value={productName ?? ""}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div>
        <textarea
          value={productDescription ?? ""}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Description"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div>
        <input
          type="text"
          value={productCategory ?? ""}
          onChange={(e) => setProductCategory(e.target.value)}
          placeholder="Category"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div>
        <input
          type="number"
          value={productPrice ?? ""}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      {productImage && (
        <div>
          <img src={productImage} alt={productName} className="w-96 h-96 mx-auto" />
        </div>
      )}
      <div>
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
      >
        Update Product
      </button>
      <ToastContainer />
    </form>
  );
};

export default EditProductForm;

// "use client";

// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useEditProduct } from '@/Context/ProductDataContext';
// import { Product } from '@/app/types';
// import { auth } from "@/Firebase/FirebaseConfig";

// interface EditProductFormProps {
//   ProductData: Product;
//   productId: string;
// }

// const EditProductForm: React.FC<EditProductFormProps> = ({ ProductData, productId }) => {
//   const { state, editProduct } = useEditProduct();
//   const [user, setUser] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSellerID = () => {
//       const user = auth.currentUser;
//       console.log("user from add product form", user);
//       if (user) {
//         setUser(user.uid);
//       }
//     };

//     fetchSellerID();
//   }, []);

//   const [productName, setProductName] = useState(ProductData?.productName);
//   const [productDescription, setProductDescription] = useState(ProductData?.description);
//   const [productPrice, setProductPrice] = useState(ProductData?.price);
//   const [productCategory, setProductCategory] = useState(ProductData?.category);
//   const [productImage, setProductImage] = useState<string | null>(ProductData?.productImage);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setImageFile(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProductImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedProductData = {
//       productName,
//       description: productDescription,
//       category: productCategory,
//       productImage,
//       price: productPrice,
//     };
//     await editProduct(productId, updatedProductData, imageFile);
//   };

//   // Move the conditional check here, after the hooks
//   if (user !== ProductData.sellerID) {
//     return <div className="text-red-500 font-extrabold text-2xl">Sorry, you cannot update this product</div>;
//   }

//   return (
//     <form onSubmit={handleFormSubmit} className="space-y-4 w-[70%] mx-auto border border-2 p-5">
//       <div>
//         <input
//           type="text"
//           value={productName ?? ""}
//           onChange={(e) => setProductName(e.target.value)}
//           placeholder="Product Name"
//           className="w-full border border-gray-300 p-2 rounded"
//         />
//       </div>
//       <div>
//         <textarea
//           value={productDescription ?? ""}
//           onChange={(e) => setProductDescription(e.target.value)}
//           placeholder="Description"
//           className="w-full border border-gray-300 p-2 rounded"
//         />
//       </div>
//       <div>
//         <input
//           type="text"
//           value={productCategory ?? ""}
//           onChange={(e) => setProductCategory(e.target.value)}
//           placeholder="Category"
//           className="w-full border border-gray-300 p-2 rounded"
//         />
//       </div>
//       <div>
//         <input
//           type="number"
//           value={productPrice ?? ""}
//           onChange={(e) => setProductPrice(Number(e.target.value))}
//           placeholder="Price"
//           className="w-full border border-gray-300 p-2 rounded"
//         />
//       </div>
//       {productImage && (
//         <div>
//           <img src={productImage} alt={productName} className="w-96 h-96 mx-auto" />
//         </div>
//       )}
//       <div>
//         <input
//           type="file"
//           onChange={handleImageChange}
//           className="border border-gray-300 p-2 rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
//       >
//         Update Product
//       </button>
//       <ToastContainer />
//     </form>
//   );
// };

// export default EditProductForm;
