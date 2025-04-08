import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Tr } from "react-super-responsive-table";
import { RiDeleteBin5Line } from "react-icons/ri";
import { buyCourse } from "../../../../Services.jsx/Operations/PaymentAPI";
import { useNavigate } from "react-router-dom";
import { EmtingCartAfterBuying, RemovedCousefromTheCart } from "../../../../Services.jsx/Operations/CartAPI";

const WishList = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ totalAmount , setTotalAmount ] = useState(0)
  const [courseIds , setCourseIds] = useState([])

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = user.cart.reduce((acc, course) => acc + Number(course.price), 0);
      setTotalAmount(total); 

      const ids = user.cart.map(course => course._id);
      setCourseIds(ids);      

    };
  
    calculateTotalAmount();
  }, [user.cart]); 


  const handleBuyCartCourses = async()=>{
    try{
      console.log("jnsksddsnfdsks")
       if(token){
        // await dispatch(buyCourse( token , [ courseIds ] ,  totalAmount , user    , navigate , dispatch ))
        buyCourse( token , [ courseIds ] ,  totalAmount , user    , navigate , dispatch )
        // await dispatch(EmtingCartAfterBuying(user._id , token ))
        EmtingCartAfterBuying(user._id , token )
        return
       }
    }catch(error){
        console.log(error)
    }
  }

  const  handleRemoveCourseFromCart = (RemovecourseId)=>{
    try{
    dispatch(RemovedCousefromTheCart(RemovecourseId , user._id , token ))
    }catch(error){
      console.log("error in Removing Course to data")
    }
}
  
  

  console.log(totalAmount , courseIds)

  return (
    <div className=" flex flex-col gap-y-3 translate-y-7">

      <div className=" flex flex-col gap-y-4 px-10">
        <div className=" flex flex-col gap-y-2">
          <p className=" text-richblack-5">
            Home / DashBoard / <span className=" text-yellow-50">Wishlist</span>
          </p>
          <p className=" text-3xl font-inter font-semibold text-richblack-5">My Whishlist</p>
        </div>
        <p className=" text-richblack-400 ">{`${user.cart.length} Courses in Wishlist`}</p>
      </div>

      <div className="h-[1px] w-[90%] mx-auto bg-richblack-300"></div>

      <div className=" flex gap-x-4 px-8  justify-evenly">
        {/* table */}
         <Table className=" w-[60%]">
           <Tbody className="">
              {
                user.cart.map(course=>(
                  <Tr key={course._id} className=" h-[12rem] justify-center items-center flex  border border-b-richblack-700 gap-x-3  ">
                     <Td>
                        <img src={course.thumbnail} className=" w-[480px]  h-[100px] rounded-md"/>
                     </Td>
                     <Td className=" flex flex-col gap-y-1 text-white py-4">
                       <p className=" text-richblack-5 font-semibold font-inter">{course.courseName}</p>
                       <p className=" italic text-xs  text-richblack-300 ">{course.courseDescription}</p>
                       <p className=" lowercase">{course.instructor.firstName} {course.instructor.lastName}</p>
                       <div>

                       </div>
                       <ul className="flex gap-x-2">
                         <li>Total Courses</li>
                         <li>Lesson</li>
                         <li>Beginner</li>
                       </ul>
                     </Td>
                     <Td className=" flex flex-col gap-y-3">
                      <button className=" flex justify-center items-center px-3 py-2 rounded-md border border-richblack-700 bg-richblack-800 gap-x-1 "
                      onClick={()=>handleRemoveCourseFromCart(course._id)}>
                        <RiDeleteBin5Line fill="#ef476f"/>
                        <p className="text-pink-200">Remove</p>
                      </button>
                      <p className=" text-2xl text-yellow-50 font-semibold">{`Rs. ${course.price}`}</p>
                     </Td>
                  </Tr>
                ))
              }
           </Tbody>
         </Table>

        {/* Total pay */}
        <div className=" flex flex-col gap-y-2 font-inter bg-richblack-800 w-[30%] h-[17rem] rounded-md px-5 py-5 ">
          <p className=" text-richblack-300 ">Total : </p>
          <p className=" text-2xl text-yellow-50 font-semibold">{`Rs. ${totalAmount}`}</p>
          <p className="  text-richblack-600 line-through">{`Rs. ${totalAmount + 256}`}</p>
          <button className=" w-[full] py-2 rounded-md bg-yellow-50 text-richblack-900 justify-center flex items-center"
          onClick={()=>handleBuyCartCourses()}>
             Pay Now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default WishList;
