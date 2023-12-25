'use client'

import Left from "@/app/components/Icons/Left"
import { UseProfile } from "@/app/components/UseProfile"
import MenuItemForm from "@/app/components/layout/MenuItemForm"
import { redirect, useParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function EditMenuPage(){
  const {id} = useParams()
const [menuItem, setmenuItem] = useState(null)
  const [redirectToItem, setredirectToItem] = useState(false)
  const {loading, data} = UseProfile()

  useEffect(() => {
    fetch('/api/menu-items').then(res=>{
      res.json().then(items=>{
const item = items.find(i => i._id=== id)
setmenuItem(item)
      })
    })
  }, [])
  
async function handleformSubmit(ev, data){
ev.preventDefault()
data = {...data, _id: id}
const savingPromise = new Promise(async(resolve,reject)=>{
  const response = await fetch('/api/menu-items', {
    method:'PUT',
    body: JSON.stringify(data),
    headers: {'Content-Type':'application/json'}
  })
  if(response.ok){
    resolve()
  }else{
    reject()
  }
})

await toast.promise(savingPromise,{
  loading:'Saving this tast item',
  success: 'Saved',
  error: 'Error'
})
setredirectToItem(true)
}

async function handleDelete(){
const promise = new Promise(async(resolve,reject)=> {
  const res = await fetch('/api/menuitems?_id='+id, {
    method: 'DELETE'
  })
  if(res.ok){
    resolve()
  }else{

    reject()
  }
})
await toast.promise(promise, {
  loading:'Deleting..',
  success: 'Deleted!',
  error: 'Error'
})
setredirectToItem(true)

}

if(redirectToItem){
  return redirect('/menu-items')
}
if(loading){
  return 'Loading...'
}
if(!data.admin){
  return 'Not admin'
}

return(
  <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
      <Link className="button" href={'/menu-items'}>
        <Left/>
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleformSubmit}/>
      <div  className="max-w-md mx-auto mt-4">
      <button onClick={handleDelete}> Delete this menu item</button>

      </div>
      </section>
)


}