import { Nav, NavLink } from "@/components/Nav";
export const dynamic = "force-dynamic";
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Orders</NavLink>
      </Nav>
      <div className="my-9 mx-6 sm:mx-auto sm:container">{children}</div>
    </>
  }