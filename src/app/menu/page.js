'use client'

import SectionHeader from "../components/layout/SectionHeader"

export default function MenuPage(){

  const [categories, setcategories] = useState([])
  const [menuitems, setmenuitems] = useState([])
 
 useEffect(() => {
  fetch('/api/categories').then(res=>{
    res.json().then(categories => {
      setcategories(categories)
    })
  })

  fetch('/api/menu-items').then(res => {
    res.json().then(menuitems=> {
      setmenuitems(menuitems)
    })
  })
 }, [])
  
  
  
  return(
<section className="mt-8">
    {categories?.length > 0 && categories.map((c)=> {
      <div>
        <div className="text-center">
      <SectionHeader mainHeader={c.name} />
        </div>
      </div>
    })}
</section>
  )
}