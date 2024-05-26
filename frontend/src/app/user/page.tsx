import Navbar from '@/components/Navbar/Navbar'
import React from 'react'


export default function page() {
  return (
    <>
        <Navbar/>
        <div className="grid grid-cols-3 h-full ">
            <div className="bg-red-400">
                <div className="grid grid-rows-3 grid-flow-col h-full">
                    <div className="row-start-1 row-end-4 bg-white m-10 ">03</div>
                </div>
                
                05
            
            </div>



            <div className="col-span-2 bg-sky-100">
                <div className="flex flex-col h-full">

                    <div className="bg-sky-200 h-full basis-3/5">
                        
                        <div className="flex flex-col h-full">

                            <h1 className='font-bold text-2xl mx-10'>work</h1>

                            <div className='bg-white h-32 m-10'>
                                01
                            </div>

                            <div className='bg-white h-32 m-10'>
                                02
                            </div>
                        </div>   
                    </div>

                    <div className="bg-sky-400 h-full basis-2/5">

                        <h1 className='font-bold text-2xl mx-10'>Education</h1>

                        <div className="flex flex-col h-full">

                            <div className='bg-white h-32 m-10'>
                                01
                            </div>

                        </div> 
                        01   
                    </div>
                    
                </div>


                
                04
                
            </div>


        </div>


    
    </>
  )
}
