'use client'

import { UseProfile } from "@/app/components/UseProfile";
import UserForm from "@/app/components/layout/UserForm";
import UserTabs from "@/app/components/layout/UserTabs";
import { useParams } from "next/navigation";

export default function EditUserPage(){
  const [user, setuser] = useState(null)
  const {loading, data} = UseProfile();
  const {id} = useParams()

useEffect(() => {
  fetch('/api/pofile?_id='+id).then(res=>{
    res.json().then(user=>{
      setuser(user)
    })
  })
}, [])


function handleSaveButtonClick(ev, data){
ev.preventDefault()
fetch('/api/profile', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({...data,_id:id})
}
)}


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
        <UserForm user={user} onSave={handleSaveButtonClick}/>
    </div>  
    </section>
)


}