"use client";

import toast from "react-hot-toast";
import { UseProfile } from "../components/UseProfile";
import UserTabs from "../components/layout/UserTabs";

export default function CategoriesPage() {
  const [newCategoryName, setnewCategoryName] = useState("");
  const { loading: profileLoading, data: profileData } = UseProfile();
  const [category, setcategory] = useState([]);
  const [editCategory, seteditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((category) => {
        setcategory(category);
      });
    });
  }

  function handleCategorySumit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: newCategoryName };
      if (editCategory) {
        data._id = editCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setnewCategoryName("");
      fetchCategories();
      seteditCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
      await toast.promise(creationPromise, {
        loading: editCategory ? "Updating category" : "Creating new category",
        success: editCategory ? "Category Updated" : "Category created",
        error: "Error, sorry",
      });
    });
    fetch("/api/categories");
  }

  async function handleDeleteClick(_id){
    const promise = new Promise(async (resolve, reject)=>{
      const response = await fetch('/api/categories?_id='+_id, {
        method: 'DELETE',
      })
      if(response.ok){
        resolve()
      }else{
        reject()
      }
  })
 await toast.promise(promise, {
    loading: 'Deleting',
    success: 'Deleted',
    error: 'Error'
  })
  fetchCategories()
}

  if (profileLoading) {
    return "Loading user info";
  }
  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySumit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editCategory ? "Update Category" : "New Category name"}
              {editCategory && (
                <>
                  : <b>{editCategory.name}</b>
                </>
              )}
            </label>

            <input
              type="text"
              value={newCategoryName}
              onChange={(ev) => setnewCategoryName(ev.target.value)}
            />
          </div>


          <div className="pb-2 flex gap-2">
            <button type="submit" className="border border-primary ">
              {editCategory ? "Update" : "Create"}
            </button>
            <button 
            type="button" 
            onClick={()=>{seteditCategory(null);             setnewCategoryName('')
          }}>
              Cancel
              </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Category</h2>

        {category?.length > 0 &&
          category.map((c) => (
            <div className="bg-gray-200 rounded-xl p-2 px-4 flex gap-1  mb-1">
              <div className="grow hover:underline cursor-pointer">
                {c.name}
              </div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    seteditCategory(c);
                    setnewCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <button onClick={()=>handleDeleteClick(c._id)} type="button">Delete</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
