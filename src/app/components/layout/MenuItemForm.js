import MenuItemPriceProps from "./MenuItemPriceProps"

export default function MenuItemForm({onSubmit, menuItem}){

  const [image, setImage] = useState(menuItem?.image || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [description, setdescription] = useState(menuItem?.description || '')
  const [basePrice, setbasePrice] = useState(menuItem?.basePrice || '')
  const [sizes, setsizes] = useState(menuItem?.sizes || [])
  const [extraIngridientPrices, setextraIngridientPrices] = useState(menuItem?.extraIngridientPrices || [])
  const [category, setcategory] = useState([])
  const [categories, setcategories] = useStateuseState(menuItem?.categories || '')


useEffect(() => {
  fetch('/api/categories').then(res=>{
    res.json().then((category)=> {
setcategory(category)
    })
  })
}, [])


  return(
    <form onSubmit={ev => onSubmit(ev, {image,name, description, basePrice, sizes, extraIngridientPrices, categories })} className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
           <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setdescription(ev.target.value)}
          />
            <label>Category</label>
          <select value={categories} onChange={ev => setcategories(ev.target.value)}>
            {category?.length > 0 && category.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setbasePrice(ev.target.value)}
          />

          <MenuItemPriceProps addlabel={'Add item size'} name={'Sizes'} props={sizes} setprops={setsizes}/>
          <MenuItemPriceProps name={'Extra Ingridents'} 
            addlabel={'Add ingrident prices'}
            props={extraIngridientPrices}
            setprops={setextraIngridientPrices}
          />

<button type="submit">Save</button>
        </div>
      </div>
    </form>
  )
}