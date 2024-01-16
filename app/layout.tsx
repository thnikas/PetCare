import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from "react";
import { ContextCr } from "./context/contextCr"
import Loader from "./loading";

export const metadata = {
  title: 'PetCare',
  description: 'Find where to leave your pet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ContextCr>{/**the global values that can be used in the whole site */}
      <Suspense fallback={<Loader/>}>
        <Navbar/>{/**the navbar that exists in every page */}
       
        <main>
          {children}
        </main>
        
        
        <Footer/>  {/**the footer that exists in every page */}
        </Suspense>
      </ContextCr>  
     
      </body>
    </html>
  )
}
