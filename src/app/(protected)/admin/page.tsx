"use client";

import { Grid } from "@mui/material";
import React from "react";

import { useProductsItem } from "@/app/(store)/useProductsStore";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import EditProducts from "./(components)/EditProducts";

const ShowItems = () => {
  return <EditProducts />;
};

export default ShowItems;
