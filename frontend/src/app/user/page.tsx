import Navbar from '@/components/Navbar/Navbar'
import XpCard from '@/components/XpCard/XpCard'
import React from 'react'


export default function page() {
  return (
    <>
        <Navbar/>
        
        <div className="flex md:rounded-lg md:shadow-2xl h-full w-full"> 
          <div className="md:flex relative basis-5/12"> 
            <div className="bg-sky-100 text-white py-4  rounded-l-lg absolute inset-0 flex px-10 ">
              <div className="box bg-white md:rounded-lg md:shadow-2xl border-2 py-4 h-full w-full">
                <center>
                  <div className="bg-slate-500 ml-auto mr-3 h-4 w-4 rounded-full ">
                  </div>
                  <div className="bg-gray-400 mt-6 top-10 center h-60 w-60 rounded-full ">
                  </div>
                  <h1 className="text text-primary text-3xl pt-3">
                    John Doe
                  </h1>
                  
                  <div className="">

                  </div>
                </center>
              </div>
            </div>
          </div>
          <div className="relative w-full h-11/12 bg-sky-100 md:rounded-r-lg md:basis-7/12 pt-10 pl-12 pr-10">
            <h1 className="ps-5 py-1 lg:py-4 text-3xl text-primary font-bold mb-2">
                Work
            </h1>
            <XpCard/>
            <XpCard/>
            <h1 className="ps-5 py-1 lg:py-4 text-3xl text-primary font-bold mb-2">
                Education
            </h1>
            <XpCard/>
          </div>
        </div>
 
        
    </>
  )
}