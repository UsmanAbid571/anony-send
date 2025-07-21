'use client'
import Link from "next/link"
import { useSession,signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "./ui/button"

const Navbar = () => {
    const { data:session } = useSession()
    const user:User = session?.user


  return (
    <nav className="p-4 md:p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link className='text-xl font-bold mb-4 md:mb-0 ' href='/'>Anony Send</Link>
            {
                session? (
                    <>
                    <span className="mr-4">Welcome, {user.username || user.email}</span>
                    <Button className="w-full md:w-auto" onClick={() => signOut()}>Logout</Button>
                    </>
                ) : (
                    <>
                    <div>
                    <Link href='/sign-in'><Button className="w-full md:w-auto mr-2 mb-1">Login</Button></Link>
                    <Link href='/sign-up'><Button className="w-full md:w-auto">Sign Up</Button></Link>
                    </div>
                    </>
                )
            }
        </div>
      
    </nav>
  )
}

export default Navbar
