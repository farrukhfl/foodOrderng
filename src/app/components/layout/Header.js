"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user
  let userName = userData?.name || userData?.email
  const {cartProducts} = useContext(CartContext)
  if(userName && userName.includes(' ')){
userName= userName.split(' ')[0]
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link href="" className="text-primary font-semibold text-2xl ">
          {" "}
          ST PIZZA
        </Link>

        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'#about'}>About</Link>
        <Link href={'#contact'}>Contact</Link>
      </nav>

      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
          <Link href={'/profile'}>{userName}</Link>
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2"
          >
            Log out
          </button>
          </>

        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Register
            </Link>
          </>
        )}
          <Link href={'/cart'}>Cart ({cartProducts.length}) </Link>
        
      </nav>
    </header>
  );
}
