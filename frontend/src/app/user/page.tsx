import React from 'react'
import Navbar from "@/components/Navbar/Navbar";


export default function page() {
  return (
 <>
 <Navbar/>
  <div className='min-h-screen grid grid-cols-3 gap-4 col-span-2 bg-blue-100'>
    <div className="min-h-screen bg-slate-400">05
      <div className="box-content shadow-lg h-96 w-72 p-4 border-4 ml-12 mt-10">
      <img 
              src="/path-to-your-profile-pic.jpg" 
              alt="Profile Picture" 
              className="w-40 h-40 ml-16 rounded-full object-cover bg-blue-200"
            />
      </div>
    </div>

    <div className="col-span-2 bg-slate-400">04
      <div>

      </div>
    
    
    </div>
    
    <div className="min-h-screen grid grid-rows-3 grid-flow-col gap-4 bg-blue-300">
    
      <div className="row-span-4 bg-white m-20 ">
        
            <div>
                <p className="m-32 text-lg font-semibold">John Doe</p>
            </div>
            
      
      </div>
      <div className="col-span-2 bg-white m-10">
        
        02
      </div>
      <div className="col-span-2 bg-white m-10 ">
        03
        
      </div>
      <div className="col-span-2 bg-white m-10 ">
        04
        
      </div>



    </div>
  </div>
</>
  )
}
