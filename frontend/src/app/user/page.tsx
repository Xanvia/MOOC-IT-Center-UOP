import Navbar from '@/components/Navbar/Navbar'
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
                  <div className="bg-slate-300 mt-10 top-10 center h-60 w-60 rounded-full ">
                  </div>
                  <h1 className="text text-black text-3xl pt-3">
                    John Doe
                  </h1>
                </center>
              </div>
            </div>
          </div>
          <div className="relative w-full h-11/12 bg-white md:rounded-r-lg md:basis-7/12 pt-10 pl-12 pr-10">
            <h1 className="ps-5 py-1 lg:py-4 text-3xl text-primary font-bold mb-4">
                Take the First Step!
            </h1>
          </div>
        </div>
 
        
    </>
  )
}
