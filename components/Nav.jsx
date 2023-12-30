"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const {data : session } = useSession() ;

  const[providers, setProviders] = useState(null); 
  const [toggleDropDown, setToggleDropdown] = useState(false);

  useEffect(() =>{
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className = "flex-between w-full mb-16 pt-3">
      <Link href = "/" className = "flex gap-2 flex-center">
        <Image src = "/assets/images/logo.svg" alt = "Logo" width = {30} height = {30} className = "object-contain" />
        <p className = "logo_text">Forum</p>
      </Link>

      <div className = "sm:flex hidden">
        {session?.user ?(  
          <div className = "flex gap-3 md:gap-5">
            <Link href="/create-event" className = "black_btn">
              Create Event!
            </Link>

            <button type = "button" onClick={() => {
              signOut({ redirect: false }).then(() => {
              router.push("/"); // Redirect to the dashboard page after signing out
              });
              }} className = "outline_btn"> 
                Sign Out
            </button>

            <Link href ="/profile">
              <Image src ={session?.user.image} width = {37} height = {37} className = "rounded-full" alt = "profile">
              
              </Image>
            </Link>
          </div>
        ): (
          <>
          {providers && Object.values(providers).map((provider) =>(
            <button type = "button" key = {provider.name} onClick = {() => signIn(provider.id)} className = "black_btn">
              Sign In
            </button>
          ))}
          </>
        )}
      </div>

      {/*Mobile Navigation */}
      <div className = "sm:hidden flex relative">
        {session?.user ? (
          <div className = "flex">
            <Image src = {session?.user.image} width = {37} height = {37} className = "rounded-full" alt = "profile" onClick = {() => setToggleDropdown((prev) => !prev)}>

            </Image>

            {toggleDropDown && (
              <div className = "dropdown">
                <Link href = "/profile" className = "dropdown_link" onClick = {() => setToggleDropdown (false)}>
                  My Profile
                </Link>
                <Link href = "/create-event" className = "dropdown_link" onClick = {() => setToggleDropdown (false)}>
                  Create Event!
                </Link>
                <button type = "button" onClick = {() => {
                  setToggleDropdown (false); signOut(); router.push("/");
                }} className = "mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider) =>(
            <button type = "button" key = {provider.name} onClick = {() => signIn(provider.id)} className = "black_btn">
              Sign In
            </button>
          ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav