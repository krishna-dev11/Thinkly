import React, { useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { setLogOut } from '../../../../../Services.jsx/Operations/authAPI';
import { DeleteAccountPermanentaly } from '../../../../../Services.jsx/Operations/DashBoard';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import {useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

  const [deleteModal , setDeleteAccountModelActiveData] = useState(null)
  const {user} = useSelector(state=>state.profile)
  const {token} = useSelector(state=>state.auth)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <button className=" flex py-4 rounded-md shadow-md  hover:shadow-pink-200 px-5 w-full bg-pink-900  opacity-50  gap-x-3 items-center border border-richblack-700"
      onClick={()=>setDeleteAccountModelActiveData({
                            heading : "Please Rethink again ?",
                            text1 : "You are on the way of Deleting your account Permanentaly .",
                            button1Text : "Delete",
                            button2Text : "Cancel",
                            btn1Onclick : ()=>(dispatch(DeleteAccountPermanentaly(token , user.id , navigate ))),
                            btn2Onclick : ()=>(setDeleteAccountModelActiveData(null))
      })}
      >

         <div className=' px-5 py-5 justify-center  self-start rounded-full bg-pink-700'>
            <RiDeleteBinLine fill='white'/>
         </div>
         <div className=' flex flex-col gap-y-2    items-start'>
            <p className=' text-richblack-5 font-inter text-lg font-semibold'>Delete Account</p>
            <p className=' text-richblack-50 font-inter'>Would you like to delete account?</p>
            <p className=' text-richblack-50 self-start '>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            <p className=' text-pink-400'>I want to delete my account.</p>
         </div>


    </button>

    { deleteModal && <ConfirmationModal data={deleteModal}/>}
    </>
  )
}

export default DeleteAccount