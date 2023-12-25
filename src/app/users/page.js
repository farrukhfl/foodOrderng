'use client'
import { useEffect } from "react";
import { UseProfile } from "../components/UseProfile"
import UserTabs from "../components/layout/UserTabs";
import Link from "next/link";

export default function UserPage(){

  const [users, setusers] = useState([])
const {loading, data} = UseProfile();

useEffect(() => {
 fetch('/api/users').then(res => {
  res.json().then(users => {
    setusers(users)
  })
 })
}, [])


  if(loading){
    return 'loading..';
  }
  if(!data.admin){
return 'Not an admin';
  }

  return(
    <section className="max-w-2xl mx-auto mt-8">
    <UserTabs isAdmin={true} />
    <div className="mt-8">
    {users.length > 0 && users.map((user)=> (
<div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
      <div className="grid grid-cols-2 gap-4 grow">
      <div className="text-gray-700">
      {!!user.name && ( <span>{user.name}</span> )}
      {!user.name && ( <span className="italic">No name</span> )}
      </div>
      <span className="text-gray-300">{user.email}</span>
      </div>
      <div>
        <Link className="button" href={'/users/'+user._id}>Edit</Link>
      </div>
</div>


    ))}
    </div>
    </section>
  )
}