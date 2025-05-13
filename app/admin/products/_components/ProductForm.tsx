"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useActionState, useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>(0);
  const [error, action]= useActionState(addProduct, {})
  return (
    <>
      <form action={action} className=" my-8 space-y-5">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <Label htmlFor="priceInCents">PriceInCents</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            value={priceInCents}
            required
            onKeyDown={(event) => {
              if (
                event.key === "e" ||
                event.key === "E" ||
                event.key === "+" ||
                event.key === "-"
              )
                event.preventDefault();
            }}
            onFocus={(event) => {
              event.target.value === "0" ? event.target.value = "" : event.target.value;
            }}
            onChange={(event) => setPriceInCents(Number(event.target.value))}
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
          {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required/>
          {error.description && <div className="text-destructive">{error.description}</div>}
        </div>

        {/* Image Input */}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required/>
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>

        {/* File Input */}
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required/>
          {error.file && <div className="text-destructive">{error.file}</div>}
        </div>

        {/* Submit Button */}
        <SubmitButton/>
      </form>
    </>
  );
};

const SubmitButton = () =>{
  const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled ={pending}> { pending? "Saving" : "Save" }</Button>
  )
}
export default ProductForm;
