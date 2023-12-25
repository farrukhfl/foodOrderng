'use client'

import { useState } from "react";

export default function UserForm({user, onSave}){

  const [userName, setuserName] = useState(user?.name || "");
  const [phone, setphone] = useState(user?.phone || "");
  const [streetAddress, setstreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setpostalCode] = useState(user?.postalCode || "");
  const [city, setcity] = useState(user?.city || "");
  const [country, setcountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false)
  const {data:loggedInUserData} = useProfile()

  return(
    <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                width={250}
                height={250}
                alt={"avatar"}
              />
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={ev=> onSave(ev, {
            name:userName, Image, phone, streetAddress, city, country, postalCode, admin
          })}
          
          >
            <input
              type="text"
              placeholder="First and last Name"
              value={userName}
              onChange={(ev) => setuserName(ev.target.value)}
            />
            <input
              type="email"
              disabled={true}
              value={user.email}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(ev) => setphone(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setstreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="text"
                style={{ margin: "0" }}
                placeholder="Postal Code"
                value={postalCode}
                onChange={(ev) => setpostalCode(ev.target.value)}
              />

              <input
                type="text"
                style={{ margin: "0" }}
                placeholder="City"
                value={city}
                onChange={(ev) => setcity(ev.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setcountry(ev.target.value)}
            />

            {loggedInUserData.admin && (
              <div>
              <label htmlFor="adminCb" className="p-2 inline-flex items-center gap-2 mb-2">
              <input type="checkbox" id="adminCb" className="" value={'1'} checked={admin} onClick={ev=> setAdmin(ev.target.checked)}/>
              <span>Admin</span>
              </label>
            </div>
            )}
            
            <button type="submit">Save</button>
          </form>
        </div>


  )
}