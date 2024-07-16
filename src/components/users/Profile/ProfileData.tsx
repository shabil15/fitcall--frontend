
import {  MdModeEdit } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5"
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";



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
          <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <div className=" shadow-xl p-3 flex rounded-lg ">
                <div className=" flex justify-center shadow-xl items-center w-12 h-12 rounded-lg">
                <IoPersonSharp  size={26} color="#3BE48B"/>
                </div>
                <div className="ml-5">
                    <p className="font-medium text-primary">Name</p>
                    <input
                      name="name"
                      // value={values.name}
                      // placeholder={userInfo?.name}
                      type="text"
                      // onChange={handleChange}
                      className="mt-1 w-full  bg-secondary  outline-none"
                      />
                        {/* {errors.name && touched.name && (
                        <div className="text-red-500">{errors.name}</div>
                      )} */}
                </div>
            </div>
            <div className=" shadow-xl p-3 flex rounded-lg">
                <div className="  shadow-xl flex justify-center items-center w-12 h-12 rounded-lg">
                <MdOutlineMail size={26} color="#3BE48B"/>
                </div>
                <div className="ml-5">
                    <p className="font-medium text-primary">Email Address</p>
                    <p className="mt-1 w-full  bg-secondary  outline-none">
                      {/* {userInfo?.email} */}
                      </p>
                </div>
            </div>
            <div className=" shadow-xl p-3 flex rounded-lg">
                <div className=" flex justify-center items-center w-12 h-12 rounded-lg">
                <FaMobileAlt size={26} color="#3BE48B"/>
                </div>
                <div className="ml-5">
                    <p className="font-medium text-primary">Mobile</p>
                    <input
                      name="mobile"
                      // value={values.mobile}
                      // placeholder={userInfo?.mobile}
                      // onChange={handleChange}
                      type="text"
                      className="mt-1 w-full  bg-secondary  focus:border-black outline-none"
                      />
                       {/* {errors.mobile && touched.mobile && (
                    <div className="text-red-500">{errors.mobile}</div>
                  )} */}
                </div>
            </div>
           </div>
        </div>
        
      </div>      
    </>
  );
};

export default ProfileData;