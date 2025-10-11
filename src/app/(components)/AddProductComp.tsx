import { Button, Typography } from "@mui/material";
import { useState } from "react";
import CenteredCard from "./CustomMuiComp";

const AddProductComp = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count === 0 ? (
        <Button variant="contained" color="primary" onClick={() => setCount(1)}>
          Add to Cart
        </Button>
      ) : (
        <CenteredCard sx={{ gap: "10px" }}>
          <Button
            sx={{ minWidth: "30px", padding: "0px" }}
            variant="contained"
            color="primary"
            onClick={() => setCount(count - 1)}
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
