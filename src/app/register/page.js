'use client'
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage(){
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [creatinguser, setcreatinguser] = useState(false)
const [userCreated, setuserCreated] = useState(false)
const [error, seterror] = useState(false)


async function handleFormSubmit(ev){
ev.preventDefault()
setcreatinguser(true)
seterror(false)
setuserCreated(false)


const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'Application/json'}
  })
  if(response.ok){
  setuserCreated(true)
  }
  else{
    seterror(true)
  }
  setcreatinguser(false)
}



return(
  <section className="mt-8">
    <h1 className="text-primary text-4xl text-center mb-4"> Register</h1>
{userCreated && (
  <div className="my-4 text-center">
    User creater <br />
    Now you can {''}
    <Link href={'/login'}>Login</Link>
  </div>

)}

{error && (
  <div className="my-4 text-center">
  Error <br />
  Please try again later
  </div>
)}

    <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
  <input type="email" disabled={creatinguser} placeholder="email" value={email} onChange={ev=> setemail(ev.target.value)}/>
  <input type="password" disabled={creatinguser} placeholder="password" value={password} onChange={ev=> setpassword(ev.target.value)}/>
  <button type="submit" disabled={creatinguser}>Register</button>

  <div className="my-4 text-center text-gray-500">
      or login with provider
  </div>
  <button onClick={()=> signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center">
    <Image src={'/google.png'} height={24} width={24} />
    Login with Google
    </button>

  <div className="text-center my-4 text-gray-500">
  Existing account?{''}
  <Link href={'/login'} className="underline">Login</Link>
  </div>

    </form>
  </section>
)
}