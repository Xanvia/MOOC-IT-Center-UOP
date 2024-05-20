"use client";
import React from "react";
import GoogleIcon from "@/icons/GoogleIcon";


interface CourseCardProps {
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
  return (
    <div className="flex justify-center w-[430px] h-[300px]">
      {/* <h2>{title}</h2>
      <p>{description}</p> */}

      <div className="flex flex-col max-w-[370px] w-full shadow-[0_5px_10px_rgba(0,0,0,0.1)] relative rounded-[12px] bg-[#fff] " >
          <svg>
              <image xlinkHref="images/Profile.jpg"  className="profile-img" />
          </svg>
          <div className="flex space-x-2 relative ml-[250px] mt-[100px] h-[30px] w-[70px] bg-[#072569] mb-2.5 p-[3px] rounded-[25px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-[5px]">
                  <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              <p className="text-[#fff] text-sm mr-[5px]">4.9</p>
          </div>
          <div className="flex flex-col  p-[10px_25px] text-[#333]">
              <span className="text-[20px] font-medium">{title}</span>
              <span className="text-[15px] font-normal">{description}</span>
          </div>

          {/* <div className="media-buttons">
              <a href="#" style={background:#316ff6} className="link">
                  <i className='bx bxl-facebook'></i>
              </a>
              <a href="#" style={"background: #e1306c"} className="link">
                  <i className='bx bxl-instagram'></i>
              </a>
              <a href="#" style="background: #cd201f" className="link">
                  <i className='bx bxl-youtube'></i>
              </a>
          </div> */}

          {/* <div className="buttons">
              <button className="button">Subscribe</button>
              <button className="button">Message</button>
          </div> */}

          <div className="flex justify-center text-[15px] items-center p-[25px_25px]">
              <div className="flex items-center  text-[#333] px-3 py-0 border-r-2 border-r-[#e7e7e7] border-solid">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-[12px]">6,2 Jam</span>
              </div>
              <div className="flex items-center text-[#333] px-3 py-0 border-r-2 border-r-[#e7e7e7] border-solid">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>
                    <span className="text-[12px]">32 Video</span>
              </div>
              <div className="flex items-center text-[#333] px-3 py-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span className="flex text-[12px]">930 Siswa</span>
              </div>
          </div>
      </div>

    </div>

  );
};

export default CourseCard;
