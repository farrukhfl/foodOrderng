
export default function MenuItemPriceProps({name, addlabel, props, setprops}){


  function addProp(){
    setprops(oldProps=>{
      return[...oldProps, {name:'', price:0}]
    })
      }
    
    function editProp(ev, index, prop){
      const newValue = ev.target.value
      setprops(prevSize=>{
        const newSizes = [...prevSize]
        newSizes[index][prop] = newValue
        return newSizes
      })
    }
    function removeProp(indexToRemove){
    setprops(prev=>prev.filter((v,index)=>index !== indexToRemove))
    }


return(
  <div className="bg-gray-200 p-2 rounded-md mb-2">
              <label >{name}</label>
              {props?.length > 0 && props.map((size, index)=>(
                <div className="flex items-end gap-2">
                  <div>
                    <label>Size name</label>
                    <input type="text" placeholder="Size name" value={size.name} onChange={ev=>editProp(ev, index,'name')} />
                  </div>
                  <div>
                  <label>Extra Prices</label>
                  <input type="text" placeholder="Extra Price" value={size.price} onChange={ev=>editProp(ev, index,'price')} />

                  </div>

                  <div>
                    <button onClick={()=> removeProp(index)} type="button" className="bg-white mb-2">X</button>
                  </div>
                </div>
              ))}




              <button type="button" className="bg-white" onClick={addProp}>{addlabel}</button>
            
          </div>
)

}