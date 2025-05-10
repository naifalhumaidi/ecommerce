"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useState } from "react";
import { addProduct } from "../../_actions/products";

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>(0);
  return (
    <>
      <form action={addProduct} className=" my-8 space-y-5">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" required />
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <Label htmlFor="priceInCents">PriceInCents</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
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
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
        </div>

        {/* Image Input */}
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" />
        </div>

        {/* File Input */}
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" />
        </div>

        {/* Submit Button */}
        <Button type="submit">Save</Button>
      </form>
    </>
  );
};

export default ProductForm;
