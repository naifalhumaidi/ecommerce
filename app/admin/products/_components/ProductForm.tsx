"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useState } from "react";
import { addProduct } from "../../_actions/products";

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>();
  return (
    <>
      <form action={addProduct} className=" my-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInCents">PriceInCents</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            onKeyDown={ event => {
              if(event.key === "e" || event.key === "E" || event.key === "+" || event.key === "-")
                event.preventDefault();
            }}
            onChange={ event =>
              setPriceInCents(Number(event.target.value) || undefined)
            }
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required/>
        </div>
         <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required/>
         </div>
         <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required/>
         </div>
         <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default ProductForm;
