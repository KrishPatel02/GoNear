import React from "react";
import { Product } from "@/types/index";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import tailwindConfig from "../../tailwind.config";
import PrimaryIconButton from "@/UI/PrimaryIconButton";
import { FaEdit } from "react-icons/fa";
import { Typography } from "@mui/material";


const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  description,
  category,
  price,
  productImage,
  Page,
}) => {
  const pathname = usePathname();

  const productDetails = [
    { label: "Description", value: description },
    { label: "category", value: category },
    { label: "Price", value: `$${price}` },
  ];

  return (
    <Card
      sx={{
        width: 250,
        height: 400,
        border: "1px solid #e2e8f0",
        boxShadow: "none",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 225,
          width: "100%",
          objectFit: "cover",
        }}
        image={productImage}
      />
      <CardContent className="p-4">
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            color: tailwindConfig.theme.extend.colors.colorTwo,
          }}
          className="mb-1"
        >
          {productName}
        </Typography>
        {productDetails.map((detail, index) => (
          <Typography key={index} sx={{ color: "#4b5563" }} className="text-md">
            {detail.value}
          </Typography>
        ))}

        {pathname === "/SellerDashboard/Products/ManageProducts" ? (
          <CardActions className="p-4 flex justify-end">
            <PrimaryIconButton
              label="Edit"
              icon={<FaEdit />}
              color={tailwindConfig.theme.extend.colors.colorTwo}
              sx={{ borderRadius: 4, padding: "6px 12px" }}
            />
            <PrimaryIconButton
              label="Delete"
              icon={<MdDelete />}
              color="#ef4444"
              sx={{ borderRadius: 4, padding: "6px 12px" }}
            />
          </CardActions>
        ) : null}
      </CardContent>
    </Card>

  );
};

export default ProductCard;
