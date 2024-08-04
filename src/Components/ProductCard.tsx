import React from 'react';
import { Product } from '@/types/index';
import Image from 'next/image';
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from '@/UI/3DCard';

interface ProductCardProps extends Product {
  Page: 'home' | 'product';
  quantity?: number;
}


const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  description,
  category,
  price,
  id,
  productImage,
  Page,
  quantity,
}) => {
  return (
    <CardContainer className="inter-var">
    <CardBody className="bg-colorFour relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-72 h-auto rounded-xl p-4 border">
      <CardItem
        translateZ="50"
        className="text-lg font-bold text-colorOne"
      >
        {productName}
      </CardItem>
      {Page === 'product' && (
        <>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm mt-2 "
          >
            Category: {category}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 underine text-sm mt-2"
          >
            Price: ${price}
          </CardItem>
          {quantity !== undefined && (
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm mt-2"
              >
                Quantity: {quantity}
              </CardItem>
            )}
        </>
      )}
      <CardItem translateZ="100" className="w-full mt-4">
        <Image
          src={productImage}
          height="500"
          width="500"
          className="h-52 w-52 object-contain rounded-xl mx-auto"
          alt="thumbnail"
        />
      </CardItem>
      <div className="flex justify-between items-center mt-4">
        {Page === 'home' ? (
          <CardItem
            translateZ={20}
            as={Link}
            href={`/Products/${id}`}
            className="mx-auto py-2 px-20 rounded-xl bg-colorOne text-white w-full text-center text-xs font-normal "
          >
            View More →
          </CardItem>
        ) : (
          <>
            <CardItem
              translateZ={20}
              as={Link}
              href=""
              className="py-2 rounded-xl text-xs w-full font-normal text-center mx-5 bg-colorOne text-white "
            >
              Buy now →
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href={`/SellerDashboard/Products/Edit/${id}`}
              className="py-2 rounded-xl bg-colorOne text-white w-full mx-1 text-center text-xs font-bold"
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
