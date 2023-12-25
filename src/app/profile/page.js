"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Infobox from "../components/layout/Infobox";
import Successbox from "../components/layout/Successbox";
import toast from "react-hot-toast";
import { resolve } from "styled-jsx/css";
import { data } from "autoprefixer";
import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import UserForm from "../components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const [user, setuser] = useState(null)
  const [isAdmin, setisAdmin] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) =>
        response.json().then((data) => {
          setuser(data)
          setisAdmin(data.isAdmin);
          
        })
      );
    }
  }, [status, session]);

  async function handProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving",
      success: "Profile saved",
      error: "Error",
    });
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleFileChange(ev) {
    const files = ev.files;
    if (files?.length > 0) {
      const data = new FormData();
      data.set("files", files);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }

  const userImage = session.data.user.image;

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}/>

      <div className="max-w-2xl mx-auto">
        <UserForm user={user} onSave={handProfileInfoUpdate}/>
      </div>
    </section>
  );
}
