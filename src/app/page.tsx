"use client";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
// feature/: For developing new features,
// bugfix/: To fix bugs in the code. Often created associated to an issue.
// hotfix/: To fix critical bugs in the production.
// release/: To prepare a new release, typically used to do tasks such as last touches and revisions.
// docs/: Used to write, modify or correct documentation.
// For example, feature/new-feature or release/version-1.0.0.
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import shopItems from "./(data)/mockData";
import Image from "next/image";
import ImageComp from "./(components)/ImageComp";

// <type>[optional scope]: <description>
//[optional body]
//[optional footer(s)]
// fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
// feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
// BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
// types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
// footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

export default function Home() {
  // const HeaderBar = styled(AppBar)``;

  return (
    <>
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
            <Button variant="contained">
              {" "}
              <Badge badgeContent={0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Button>

            <Button
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
          </Card>
        </Card>
      </AppBar>
      <Grid container>
        {shopItems.map((item) => (
          <Box key={item.id} sx={{ width: 400, padding: "20px" }}>
            <Card
              sx={{
                padding: "20px",
                gap: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ImageComp item={item} />
              <Typography variant={"h6"}>{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "none",
                  width: "100%",
                }}
              >
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
                <Typography variant={"h6"}>${item.price.toFixed(2)}</Typography>
              </Card>
            </Card>
          </Box>
        ))}
      </Grid>
      <footer>
        <p>&copy; {new Date().getFullYear()} SHOP APP</p>
      </footer>
    </>
  );
}
