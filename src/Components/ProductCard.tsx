import React from 'react';
import { Product } from '@/types/index';
import { CardBody, CardContainer, CardItem } from '@/Components/3d-card';
import Image from 'next/image';
import Link from "next/link";

interface ProductCardProps extends Product {
  Page: 'home' | 'product';
}


const ProductCard: React.FC<Product> = ({
  productName,
  description,
  category,
  price,
  id,
  productImage,
  Page,
}) => {
  return (
    <CardContainer className="inter-var">
    <CardBody className="bg-colorThree relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-72 h-auto rounded-xl p-4 border">
      <CardItem
        translateZ="50"
        className="text-lg font-bold text-colorOne dark:text-white"
      >
        {productName}
      </CardItem>
      {Page === 'product' && (
        <>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
          >
            Category: {category}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 underine text-sm mt-2 dark:text-neutral-300"
          >
            Price: ${price}
          </CardItem>
        </>
      )}
      <CardItem translateZ="100" className="w-full mt-4">
        <Image
          src={productImage}
          height="500"
          width="500"
          className="h-40 w-full object-contain rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <div className="flex justify-between items-center mt-4">
        {Page === 'home' ? (
          <CardItem
            translateZ={20}
            as={Link}
            href={`/SellerDashboard/Products/${id}`}
            className="mx-auto py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            View more →
          </CardItem>
        ) : (
          <>
            <CardItem
              translateZ={20}
              as={Link}
              href=""
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Buy now →
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href={`/SellerDashboard/Products/Edit/${id}`}
              className="px-4 py-2 rounded-xl bg-colorOne dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Edit
            </CardItem>
          </>
        )}
      </div>
    </CardBody>
  </CardContainer>
  );
};

export default ProductCard;
