'use client'

import Image from "next/image"
import { useState } from "react"
import {signIn} from 'next-auth/react'

export default function LoginPage(){

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loginProgress, setloginProgress] = useState(false)

async function handleFormSubmit(ev){
  ev.preventDefault()
  setloginProgress(true)

  await signIn('credentials',{email, password, callbackUrl:'/'})
  // const {ok} = await fetch('/api/login', {
    
    // body: JSON.stringify({email, password}),
    // headers: {'Content-Type': 'Application/json'},
    // method: 'POST',
// })
setloginProgress(false)
}
// if(ok){

// }else{

// }
// setloginProgress(false)
// }
  return(
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
      <input type="email" disabled={loginProgress} placeholder="email" value={email} onChange={ev=> setemail(ev.target.value)}/>
  <input type="password" disabled={loginProgress} placeholder="password" value={password} onChange={ev=> setpassword(ev.target.value)}/>
<button type="submit" disabled={loginProgress}>Login</button>

<div className="my-4 text-center text-gray-500">
      or login with provider
  </div>
  <button type="button" onClick={()=> signIn('google', {callbackUrl:'/'})}  className="flex gap-4 justify-center">
    <Image src={'/google.png'} height={24} width={24} />
    Login with Google
    </button>

      </form>

    </section>
  )
}