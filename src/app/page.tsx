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
import { AppBar, Badge, Box, Button, Card, Grid } from "@mui/material";
import shopItems from "./(data)/mockData";
import Image from "next/image";
import ImageComp from "./(components)/ImageComp";
import AddProductComp from "./(components)/AddProductComp";
import ItemComp from "./(components)/ItemComp";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useProductsItem } from "./(store)/useProductsStore";
import ShowItems from "./(components)/ShowItems";

// <type>[optional scope]: <description>
//[optional body]
//[optional footer(s)]
// fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
// feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
// BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
// types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
// footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ShowItems />
      </QueryClientProvider>
    </>
  );
}
