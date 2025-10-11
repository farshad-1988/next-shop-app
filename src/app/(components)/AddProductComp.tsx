import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CenteredCard from "./CustomMuiComp";
import { useCounterItem } from "../(store)/useCounterItem";
import { Item } from "../types.ts/types";
const AddProductComp = ({ item }: { item: Item }) => {
  const { cartsItem, increaseCounterItem, decreaseCounterItem } =
    useCounterItem();
  const [count, setCount] = useState(cartsItem[item.id]?.count || 0);
  console.log(cartsItem);
  const increaseItem = () => {
    increaseCounterItem(item);
    setCount(count + 1);
  };

  const decreaseItem = () => {
    decreaseCounterItem(item);
    setCount(count - 1);
  };

  return (
    <div>
      {count === 0 ? (
        <Button variant="contained" color="primary" onClick={increaseItem}>
          Add to Cart
        </Button>
      ) : (
        <CenteredCard sx={{ gap: "10px" }}>
          <Button
            sx={{ minWidth: "30px", padding: "0px" }}
            variant="contained"
            color="primary"
            onClick={decreaseItem}
          >
            -
          </Button>
          <Typography>{count}</Typography>
          <Button
            sx={{ minWidth: "30px", padding: "0px" }}
            variant="contained"
            color="primary"
            onClick={() => setCount(count + 1)}
          >
            +
          </Button>
        </CenteredCard>
      )}
    </div>
  );
};

export default AddProductComp;
