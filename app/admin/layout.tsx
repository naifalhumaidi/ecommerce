import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";
export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
      <Nav>
        <NavLink href="/admin">Dashbaord</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
        <NavLink href="/admin/charts">Charts</NavLink>
      </Nav>
      <div className="my-9 mx-6 sm:mx-auto sm:container">{children}</div>
    </>
  }