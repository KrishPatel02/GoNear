"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '@/types';
import { db } from '@/Firebase/FirebaseConfig';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const productId = id as string;
  console.log("productId",productId)

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        toast.error('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'Products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data() as Product);
        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
        toast.error('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='mt-20 mx-auto w-fit'>
      <h1 className='text-2xl font-bold mb-4'>{product.productName}</h1>
      {product.productImage && (
        <img src={product.productImage} alt={product.productName} className='w-96 h-96 mb-4' />
      )}
      <p className='text-lg mb-2'><strong>Description:</strong> {product.description}</p>
      <p className='text-lg mb-2'><strong>Category:</strong> {product.category}</p>
      <p className='text-lg mb-2'><strong>Price:</strong> ${product.price}</p>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;


// "use client";

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { doc, getDoc } from 'firebase/firestore';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Product } from '@/types';
// import { db } from '@/Firebase/FirebaseConfig';

// const ProductDetails: React.FC = () => {
//   const { id } = useParams();
//   const productId = id as string;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!productId) {
//         toast.error('Product ID is missing');
//         setLoading(false);
//         return;
//       }

//       try {
//         const docRef = doc(db, 'Products', productId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setProduct(docSnap.data() as Product);
//         } else {
//           toast.error('Product not found');
//         }
//       } catch (error) {
//         console.error('Error fetching product: ', error);
//         toast.error('Error fetching product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-2xl font-semibold text-gray-700">Product not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="md:flex">
//           <div className="md:flex-shrink-0">
//             {product.productImage && (
//               <img
//                 className="h-full w-full object-cover md:w-96"
//                 src={product.productImage}
//                 alt={product.productName}
//               />
//             )}
//           </div>
//           <div className="p-8">
//             <h1 className="mt-1 text-4xl font-bold text-gray-900 leading-tight">
//               {product.productName}
//             </h1>
//             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
//               {product.category}
//             </div>
//             <p className="mt-2 text-gray-600">{product.description}</p>
//             <div className="mt-4">
//               <span className="text-3xl font-bold text-gray-900">${product.price}</span>
//             </div>
//             <div className="mt-6">
//               <button className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 transition duration-200">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductDetails;