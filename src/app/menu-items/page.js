'use client'
import Link from "next/link";
import { UseProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";
import Right from "../components/Icons/Right";
import Image from "next/image";

export default function MenuItemsPage(){
const [menuitems, setmenuitems] = useState([])
const {loading, data} = UseProfile()

useEffect(() => {
  fetch('/api/menu-items').then(res => {
    res.json().then(menuitems=>{
      setmenuitems(menuitems)
    })
  })

}, [])


if(loading){
  return 'Loading User info'
}
if(!data.admin){
  return 'Not admin'
}




  return(
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button" href={'./menu-items/new'}>
          Create new Menu item
          <Right />
        </Link>
      </div>

    <div>
      <h2 className="text-sm text-gray-200 mt-8">Edit Menu items:</h2>
      <div className="grid grid-cols-3 gap-2">
    {menuitems?.length > 0 && menuitems.map(item=> (
      <Link href={'/menu-items/edit/'+item._id} className="bg-gray-200 rounded-lg p-4 ">
        <div className="relative">
      <Image src={item.image} className="rounded-md" alt={''} width={200} height={200}/>
        </div>
        <div className="text-center">
{item.name}
        </div>
      </Link>

    ))}



      </div>
    </div>

    </section>
  )
}