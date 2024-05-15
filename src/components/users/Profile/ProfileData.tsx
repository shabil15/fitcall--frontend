import { useState } from "react";
import { MdIosShare, MdModeEdit } from "react-icons/md";
import { MdOutlineMail,MdOutlineDriveFileRenameOutline  } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";



const ProfileData: React.FC = () => {


  

  return (
    <>
      <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start shadow-xl text-white rounded-3xl">
        <div className="my-auto">
          <div className="max-sm:w-[100px] my-auto max-sm:h-[100px] w-[150px] h-[150px] relative bg-black rounded-full overflow-hidden">
            <img className="object-cover h-full w-full"  alt="" />
          </div>
          <div
            
            className="cursor-pointer sm:w-[30px] w-[23px] h-[23px] sm:h-[30px] ml-20 -mt-10  rounded-full sm:ml-28 sm:-mt-10   bg-slate-800 flex  justify-center items-center absolute"
          >
            <MdModeEdit color="white" />
          </div>
        </div>
        <div className="flex-grow w-full sm:w-[80%] p-4 ">
          <div className="flex space-y-4 justify-between space-x-1 flex-wrap w-full max-sm:mx-auto items-end mb-2">
            <p className="text-3xl truncate max-sm:text-xl font-bold">
              Jennifer_Lopez
            </p>
          </div>
          
          <p className="text-xs md:text-sm">
            mohammedshabil15@gmail.com
          </p>
        </div>
        
      </div>      
    </>
  );
};

export default ProfileData;