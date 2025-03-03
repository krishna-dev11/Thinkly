import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { Link, matchPath } from 'react-router-dom'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";


const NavBar = () => {

 const {token} = useSelector((state)=>state.auth)
 const {user} = useSelector((state)=>state.profile)
 const location = useLocation();

 function mathroute(route){
  return matchPath({path:route} , location.pathname)
 }

// console.log("FUCkkkkkkkkkkkkkkk",user)

  const categoryList =[
    {
      id:1,
      title:'Python',
      link:"/category/python"
    },
    {
      id:2,
      title:'Web-Dev',
      link:"/category/web-dev"
    }
  ]

  return (
    <div className=" w-full h-14 shadow-lg bg-richblack-800 shadow-blue-900/30 backdrop-blur-md  border-b-[1px] border-white/20 ">

      <div className=' flex justify-between items-center w-11/12  mx-auto h-full px-10'>
        
       <Link to={"/"}>
       <img src={logo} className='w-[9rem]'/>
       </Link>

 {/* middle part */}
            <ul className='flex gap-x-5'>
                { 
                  NavbarLinks.map((link , index)=>(
                    <li className='text-white ' key={index}>{
                        link?.title === 'Catalog' ? (<Link to={link?.path}>
                            <div className='relative group'>
                                <div className='flex gap-x-1 items-baseline '>
                                    <p className=''>{link.title}</p>
                                    <MdKeyboardArrowDown className=' translate-y-1'/>
                                </div>
                                <div className='w-48 text-black bg-white absolute top-9 rounded-md opacity-0 group-hover:opacity-100 z-20 flex flex-col gap-y-1 p-1 '>{
                                  categoryList.map((category)=>(
                                     <div className='p-1 flex justify-center items-center text-richblack-600 font-semibold rounded-md bg-richblack-25 w-[98%] mx-auto hover:bg-richblack-50'>
                                     <Link to={category.link} key={category.id} >{category.title}</Link>
                                     </div>
                                  ))
                                }</div>
                                <div className='h-5 w-5 bg-white  absolute rotate-45 top-7 left-14 opacity-0 group-hover:opacity-100 '></div>
                            </div>
                        </Link>) : (
                            <Link to={link?.path} className={` ${mathroute(link?.path) ? "text-yellow-25" : "text-white"}`}>{link.title}</Link>
                        )
                    }</li>
                  ))
                }
            </ul>

{/* right part */}
      <div className='flex gap-x-6'>


        {
          <div>
          <CiSearch fill="white" size={25}/>
          </div>
        }

        {
          (token == null)  && <div>
             <Link to={"/login"} className='py-2 px-3   text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-md border-r-[2px] border-b-[2px] border-white/20'>Login</Link>
         </div>

        }

        {
          (token == null)  && <div>
             <Link to={"/signup"} className='py-2 px-3   text-white shadow-lg shadow-blue-900/30 backdrop-blur-md rounded-md border-r-[2px] border-b-[2px] border-white/20'>SignUp</Link>
         </div>

        }


        {
          user && user.accountType !== "Instructor" && 
          <Link to={"/dashboard/cart"}>
          <div className=' relative flex flex-col gap-x-1'>
          <MdOutlineShoppingCart fill='white' size={23} />
          <span className='absolute h-4 w-4 bg-white right-[-.9rem] top-[-.5rem] rounded-full animate-bounce '></span>
          </div>
          </Link> 
        }

        {
          (token !== null) && <div className=' h-8 w-8 bg-richblack-700 rounded-full'></div>      
        }


      </div>

      </div>

    </div>
  )
}

export default NavBar

 