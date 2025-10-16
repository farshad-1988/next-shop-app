import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import dayjs from "dayjs";

export default function HandleItemPage({
  params,
}: {
  params: { id?: string };
}) {
  const id = params.id;
  const addProduct = useMutation({
    mutationFn: async (data: any) => {
      if (params.id) {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return res.json();
      } else {
        const res = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return res.json();
      }
    },
    onSuccess: () => {
      alert("Product saved successfully");
      //add product to local state
    },
    onError: () => {
      alert("Error saving product");
    },
  });

  const handleSubmit = async (data: any) => {
    await addProduct.mutate(data);
  };

  const item = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <FormContainer
      defaultValues={{
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      }}
      onSuccess={handleSubmit}
    >
      <TextFieldElement
        name="name"
        label="Name"
        defaultValue={item.data?.name}
        rules={{
          pattern: {
            value: /^[\p{L}\p{N}\p{Zs}\-_\.,]*$/gmu,
            message:
              "Only letters (from any language), numbers, spaces, dots, commas, dashes, and underscores are permitted.",
          },
        }}
        required
      />
      <TextFieldElement
        name="price"
        label="Price"
        defaultValue={item.data?.price}
      />
      <SelectElement
        name="category"
        label="Category"
        options={[
          { id: "electronics", label: "Electronics" },
          { id: "clothing", label: "Clothing" },
          { id: "books", label: "Books" },
          { id: "furniture", label: "Furniture" },
          { id: "toys", label: "Toys" },
          { id: "groceries", label: "Groceries" },
          { id: "beauty", label: "Beauty" },
          { id: "sports", label: "Sports" },
          { id: "automotive", label: "Automotive" },
          { id: "garden", label: "Garden" },
        ]}
        defaultValue={item.data?.category}
      />
      <TextFieldElement
        name={"price"}
        label="Price"
        defaultValue={item.data?.price}
      />
      <TextFieldElement
        name={"stock"}
        label="stock"
        defaultValue={item.data?.stock}
      />
      <TextFieldElement
        name={"description"}
        label="description"
        defaultValue={item.data?.description}
      />
      <TextFieldElement
        name={"imageUrl"}
        label="imageUrl"
        defaultValue={item.data?.imageUrl}
      />
      <Button
        variant="contained"
        type="submit"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Add Product
      </Button>
    </FormContainer>
  );
}
