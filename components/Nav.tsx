"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export const Nav = ({ children }: { children: ReactNode }) => {
    return <nav className="flex justify-center px-4 bg-primary text-primary-foreground">{children}</nav>
}

//? Explain this line
export const NavLink = (props: Omit<ComponentProps<typeof Link>, "class">) => {
    const pathName = usePathname();
    return <Link {...props}
        className={cn(
            `p-5 hover:bg-secondary hover:text-secondary-foreground 
            focus-visible:bg-secondary focus:text-secondary-foreground`,
            pathName == props.href && "bg-background text-foreground"
        )}></Link>
}

