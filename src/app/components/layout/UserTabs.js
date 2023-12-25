'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}){
  const pathname = usePathname()
  return(
    <div className="flex mx-auto justify-center gap-2 tabs">
        <Link className={pathname === '/profile'? 'active': ''} href={"/profile"}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link className={pathname === '/categories'? 'active': ''} href={"/categories"}>Categories</Link>
            <Link className={pathname.includes('menu-items') ? 'active': ''} href={"/menu-items"}>Menu Items</Link>
            <Link className={pathname === '/users'? 'active': ''} href={"/users"}>Users</Link>
            <Link className={pathname === '/orders'? 'active': ''} href={"/orders"}>Orders</Link>
          </>
        )}
      </div>
  )
}