"use client";

import { Grid } from "@mui/material";
import React from "react";
import ItemComp from "./ItemComp";
import { useProductsItem } from "../(store)/useProductsStore";
import { useQuery } from "@tanstack/react-query";
import { useOrdersItem } from "../(store)/useOrdersStores";

const ShowItems = () => {
  const { setProducts, products, filteredProducts, setFilteredProducts } =
    useProductsItem();
  const { setOrders } = useOrdersItem();

  const { data: receivedProducts, pLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      return data;
    },
  });
  const { data: orders, oLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
      return data;
    },
  });
  return (
    <Grid container>
      {filteredProducts?.map((item) => (
        <ItemComp key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default ShowItems;
