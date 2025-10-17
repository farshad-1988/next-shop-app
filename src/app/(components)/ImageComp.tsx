"use client";

import { Card, Skeleton } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { CenteredCard } from "./CustomMuiComp";
const ImageComp = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <CenteredCard>
      {loading && !error ? (
        <Skeleton variant="rectangular" width={200} height={200} />
      ) : error || !item.image || item.image === "" ? (
        <BrokenImageIcon color="disabled" sx={{ fontSize: "300px" }} />
      ) : (
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
          onLoadingComplete={() => {
            setLoading(true);
          }}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </CenteredCard>
  );
};

export default ImageComp;
