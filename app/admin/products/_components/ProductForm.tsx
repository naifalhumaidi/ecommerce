import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductForm = () => (
   <form className="flex gap-3 space-y-8 my-8">
     <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required></Input>
     </div>
      <div className="flex gap-3 mt-5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required></Input>
     </div>
   </form>
 );
 
 export default ProductForm;