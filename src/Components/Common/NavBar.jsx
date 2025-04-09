import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import logoDark from '../../assets/Logo/Logo-Full-Dark.png'
import {NavbarLinks} from '../../data/navbar-links'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { setLogOut } from '../../Services.jsx/Operations/authAPI';
import { CiSettings } from "react-icons/ci";
import { RiDashboard2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { GetAllCategories } from '../../Services.jsx/Operations/DashBoard';
import { useEffect } from 'react';


const NavBar = () => {


  

 const {token} = useSelector((state)=>state.auth)
 const {user} = useSelector((state)=>state.profile)
 const location = useLocation();

 const conditionFormNavBarWholeStyle = location.pathname.split("/").includes("EnrolledCourses") || location.pathname.split("/").includes("course" && "section" && "subSection")



 const dispatch = useDispatch()
 const navigate = useNavigate()

//  console.log(token , " I Am NAVBAR Token")
//  console.log(user , " I Am NAVBAR user")


 function mathroute(route){
  return matchPath({path:route} , location.pathname)
 }


// console.log("FUCkkkkkkkkkkkkkkk",user)

  // const categoryList =[
  //   {
  //     id:1,
  //     title:'Python',
  //     link:"/category/python"
  //   },
  //   {
  //     id:2,
  //     title:'Web-Dev',
  //     link:"/category/web-dev"
  //   }
  // ]
    const {category} = useSelector(state=>state.Category)

    useEffect(()=>{
       const getAllCategories = async()=>{
           try{
              dispatch(GetAllCategories(token))
           }catch(error){
              console.log(error)
           }
       }
       getAllCategories()
    },[])

  return (
    <div className={`${ conditionFormNavBarWholeStyle  ? " w-full h-[8%]  border-b border-richblack-700 bg-white  backdrop-blur-md   fixed z-50" : "w-full h-[8%] shadow-lg  bg-richblack-900 shadow-blue-900/30 backdrop-blur-md   fixed z-50"}`}>

      <div className=' flex justify-between items-center w-11/12  mx-auto h-full px-10'>
        
       <Link to={"/"}>
       <img src={conditionFormNavBarWholeStyle ? logoDark : logo} className='w-[9rem]'/>
       </Link>

 {/* middle part */}
            <ul className='flex gap-x-5'>
                { 
                  NavbarLinks.map((link , index)=>(
                    <li className={`${ conditionFormNavBarWholeStyle  ? " text-richblack-900" : " text-white"}`} key={index}>{
                        link?.title === 'Catalog' ? (<Link to={link?.path} className=' group'>
                            <div className='relative '>
                                <div className='flex gap-x-1 items-baseline '>
                                    <p className=''>{link.title}</p>
                                    <MdKeyboardArrowDown className=' translate-y-1' />
                                </div>
                                <div className='w-48 text-black bg-white absolute top-9 rounded-md  opacity-0 group-hover:opacity-100 z-20 flex flex-col gap-y-1 p-1 '>{
                                  category.map((cat , index)=>(
                                     <div key={index} className='p-1 flex justify-center items-center text-richblack-600 font-semibold rounded-md bg-richblack-25 w-[98%] mx-auto hover:bg-richblack-50'>
                                     <Link to={`/catalog/${cat.name.split(" ").join("-").toLowerCase()}/${cat._id}`} key={cat.id} >{cat.name}</Link>
                                     </div>
                                  ))
                                }</div>
                                <div className='h-5 w-5 bg-white  absolute rotate-45 top-7 left-14 opacity-0 group-hover:opacity-100 '></div>
                            </div>
                        </Link>) : (
                            <Link to={link?.path} className={` ${mathroute(link?.path) ? "text-yellow-25" : conditionFormNavBarWholeStyle  ? " text-richblack-900" : " text-white"}`}>{link.title}</Link>
                        )
                    }</li>
                  ))
                }
            </ul>

{/* right part */}
      <div className='flex gap-x-6 items-baseline  '>


        {
          <div>
          <CiSearch fill={conditionFormNavBarWholeStyle  ? "black" : "white"} size={25}/>
          </div>
        }

        {
          token === null  && 
          <div>
             <Link to={"/login"} className={`${conditionFormNavBarWholeStyle  ? " py-2 px-3   text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-md border-r-[2px] border-b-[2px] border-white/20" : " py-2 px-3   text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-md border-r-[2px] border-b-[2px] border-white/20"}`}>Login</Link>
         </div>

        }
   
        {
          token === null  && 
          <div>
             <Link to={"/signup"} className='py-2 px-3   text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-md border-r-[2px] border-b-[2px] border-white/20'>SignUp</Link>
         </div>

        }


        {
          user !== null && user.accountType !== "Instructor" && 
          <Link to={"/dashboard/wishlist"}>
          <div className=' relative flex flex-col gap-x-1'>
          <MdOutlineShoppingCart fill={conditionFormNavBarWholeStyle  ? "black" : "white"} size={23} />
          <span className={` justify-center items-center flex  font-inter font-semibold ${conditionFormNavBarWholeStyle  ? "absolute h-4 w-4  bg-richblack-900 text-white right-[-.9rem] top-[-.5rem] rounded-full animate-bounce" : "absolute h-4 w-4 bg-white right-[-.9rem] top-[-.5rem] rounded-full animate-bounce "}`}>{user.cart.length}</span>
          </div>
          </Link> 
        }

        {
            user && token !== null  && <div className=' h-[2.1rem] w-[2.1rem] rounded-full group'>
            <img src={user?.imageUrl}   className='h-[2.1rem] w-[2.1rem] rounded-full'/>
             <div className=' absolute opacity-0 group-hover:opacity-100 bg-richblack-500 gap-y-1  top-14 py-1 rounded-md flex flex-col'>
                  <button onClick={()=>(navigate("/dashboard/my-profile"))} className=' bg-richblack-800 border hover:bg-richblack-700 w-[95%] rounded-md py-1 mx-auto flex justify-evenly items-center gap-x-1 px-[.3rem] '>
                    <RiDashboard2Line fill='#c5c7d4' size={25}/>
                    <p className=' text-richblack-50 text-sm'>DashBoard</p>
                  </button>
                  <button  onClick={()=>dispatch(setLogOut(navigate))}  className=' bg-richblack-800 border w-[95%] rounded-md hover:bg-richblack-700 py-1 mx-auto flex  items-center gap-x-1 px-1 justify-evenly'  >
                    <IoLogOutOutline color='c5c7d4' size={25} />
                    <p className=' text-richblack-50 text-sm'>LogOut</p>
                  </button>
             </div>
          </div>      
        }


      </div>

      </div>

    </div>
  )
}

export default NavBar

 