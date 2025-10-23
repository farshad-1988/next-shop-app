"use client";

import {
  AppBar,
  Badge,
  Button,
  Card,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { useOrdersItem } from "../(store)/useOrdersStores";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useProductsItem } from "../(store)/useProductsStore";
import { JSX, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

/**
 *
 *
 *
 *
 * @return {JSX.Element}
 */

const Header = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const logout = () => router.push("/");
  const login = () => router.push("/auth");
  const addNewProduct = () => router.push("/admin/handleItem");
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  const { orders } = useOrdersItem();
  const { products, setFilteredProducts } = useProductsItem();
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const searchProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    // console.log(query);
    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      {isAdmin ? (
        <AppBar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          position="static"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "1200px",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Button
              sx={{
                border: "1px solid #999",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
              onClick={addNewProduct}
            >
              Add New Product
            </Button>
            <Button
              onClick={() => signOut()}
              sx={{
                border: "1px solid #999",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              Log out <LogoutIcon />
            </Button>
          </Card>
        </AppBar>
      ) : (
        <AppBar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          position="static"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "1200px",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search For Products"
                inputProps={{ "aria-label": "search Products" }}
                onChange={searchProducts}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Card
              sx={{
                boxShadow: "none",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Button>
                {" "}
                <Badge badgeContent={orders.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </Button>

              {status === "loading" ? (
                "loading"
              ) : !session ? (
                <Button
                  onClick={login}
                  sx={{
                    border: "1px solid #999",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  Login <LoginIcon />
                </Button>
              ) : (
                <Button
                  onClick={() => signOut()}
                  sx={{
                    border: "1px solid #999",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  Logout <LogoutIcon />
                </Button>
              )}
            </Card>
          </Card>
        </AppBar>
      )}
    </>
  );
};

export default Header;
