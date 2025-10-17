import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CenteredCard from "./CustomMuiComp";
import { useOrdersItem } from "../(store)/useOrdersStores";
import { CartItems, Item } from "../types/types";
import { useMutation } from "@tanstack/react-query";
const AddProductComp = ({ item }: { item: Item }) => {
  const addProduct = useMutation({
    // mutationKey: ["products"],
    mutationFn: async (item: Item) => {
      const resP = await fetch("http://localhost:5000/api/products/" + item.id);
      if (!resP.ok) {
        throw new Error("Failed to fetch product details");
      }
      const productDetails = await resP.json();
      if (productDetails.stock <= 0) {
        alert("Product is out of stock");
        return;
      }
      const resO = await fetch("http://localhost:5000/api/orders/" + item.id);

      if (resO.status == 404) {
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...item, count: 1, id: item.id }),
        });
        const data = await res.json();
        return data;
      } else {
        const existingOrder = await resO.json();
        const updatedOrder = {
          ...existingOrder,
          count: existingOrder.count + 1,
        };
        const res = await fetch("http://localhost:5000/api/orders/" + item.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });
        const data = await res.json();
        return data;
      }
    },
    onSuccess: () => {
      increaseItem();
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
    },
  });

  const decreaseProduct = useMutation({
    mutationFn: async (item: Item) => {
      const resO = await fetch("http://localhost:5000/api/orders/" + item.id);

      // If the product is not found in orders
      if (resO.status === 404) {
        alert("This item is not in your cart");
        return;
      }

      const existingOrder = await resO.json();

      if (existingOrder.count > 1) {
        // Decrease count
        const updatedOrder = {
          ...existingOrder,
          count: existingOrder.count - 1,
        };
        const res = await fetch("http://localhost:5000/api/orders/" + item.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });
        const data = await res.json();
        return data;
      } else {
        // Remove the product entirely
        await fetch("http://localhost:5000/api/orders/" + item.id, {
          method: "DELETE",
        });
        return { deleted: true };
      }
    },
    onSuccess: () => {
      decreaseItem(); // update UI store (like Zustand or context)
    },
    onError: (error) => {
      console.error("Error decreasing product count:", error);
    },
  });

  const { orders, increaseOrderedItem, decreaseOrderedItem } = useOrdersItem();
  // const [count, setCount] = useState(
  //   orders.find((ord) => ord.id === item.id)?.count || 0
  // );
  const increaseItem = async () => {
    increaseOrderedItem(item);
    // setCount(count + 1);
  };

  const decreaseItem = () => {
    decreaseOrderedItem(item);
    // setCount(count - 1);
  };
  console.log(orders.find((ord) => ord.id === item.id)?.count);
  return (
    <div>
      {!orders.find((ord) => ord.id === item.id) ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addProduct.mutate(item);
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <CenteredCard sx={{ gap: "10px" }}>
          <Button
            sx={{ minWidth: "30px", padding: "0px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              decreaseProduct.mutate(item);
            }}
          >
            -
          </Button>
          <Typography>
            {orders.find((ord) => ord.id === item.id)?.count}
          </Typography>
          <Button
            sx={{ minWidth: "30px", padding: "0px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              addProduct.mutate(item);
            }}
          >
            +
          </Button>
        </CenteredCard>
      )}
    </div>
  );
};

export default AddProductComp;
