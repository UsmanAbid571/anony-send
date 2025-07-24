'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";


export default function Home() {
   const { data:session } = useSession()
  return (
   <div>
     <Navbar/>
     <div className="mt-3 min-h-screen bg-gray-100">
      <div className=" min-h-screen w-full p-8 space-y-8 bg-white rounded lg shadow-md">
        <div className="flex flex-col items-center ">
          <h1 className="text-5xl lg:text-6xl tracking-tight font-extrabold my-4 ">
          A Whisper In The Dark
        </h1>
        <p className="tracking-tighter">Anony Send delivers it without a trace</p>
        {
          session ? (
            <Link href='/dashboard'>
            <Button className="mt-5">
            Dashboard
            </Button>
            </Link>
          ) : (
            <Link href='/sign-up'>
            <Button className="mt-5">
            Join Now
            </Button>
            </Link>
            )
        }
        </div>
         <Separator className="my-15 mt-24"/>
        <div>
          <h2 className="text-center text-3xl lg:text-4xl tracking-tight font-extrabold my-4 ">
            Features

          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Send Without a Name</CardTitle>
              <CardDescription>Let your words speak louder than your identity. Anyone can send you messages without revealing who they are.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Send Freely, No Sign-Up</CardTitle>
              <CardDescription>Anyone can send you a message without needing an account, it’s completely frictionless.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Link, Your Way</CardTitle>
              <CardDescription>Share your unique Anony Send link anywhere on Instagram, WhatsApp, or wherever your audience is.</CardDescription>
            </CardHeader>
          </Card>
          </div>
        </div>
        <div>
           <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl lg:text-4xl tracking-tight font-extrabold my-4">How It Works</CardTitle>
              <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Step 1</CardTitle>
              <CardDescription>Create a new account or login to an existiong account</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 2</CardTitle>
              <CardDescription>Share Your Link with everyone</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Step 3</CardTitle>
              <CardDescription>Receive anonymous messages right into your dashboard</CardDescription>
            </CardHeader>
          </Card>
          </div>

              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <Card>
        <div className="flex items-center justify-evenly  w-full">
          <h2 className="text-5xl lg:text-6xl tracking-tight font-extrabold my-4 ">Usage</h2>
          <Separator orientation="vertical" className=""/>
          <span className=" tracking-tight"><ul className="list-disc"><li>Get honest feedback</li><li>Fun with friends</li><li>Anonymous confessions</li></ul></span>
        </div>
        </Card>
        <Card className="px-5 mb-5">
          <CardTitle className="text-2xl lg:text-3xl tracking-tight font-extrabold my-4 ">Ready to hear what they really think?</CardTitle>
         <Link href="/sign-up"><Button className="mx-6">Signup Now</Button></Link> 
        </Card>

      </div>
     </div>
     <Footer/>

   </div>
  );
}
