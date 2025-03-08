import React from 'react'
import UpdateProfilePicture from './UpdateProfilePicture';
import UpdateProfile from './UpdateProfile';
import PasswordUpdate from './PasswordUpdate';
import DeleteAccount from './DeleteAccount';

const SettingIndex = () => {

  return (
    <div className="h-full w-full">
      <p className=" text-richblack-5 text-2xl font-semibold px-4 py-5">
        My Profile
      </p>

      <div className=" w-[80%]  mx-auto flex flex-col gap-y-4 mt-4 ">

         <UpdateProfilePicture/>

         <UpdateProfile/>

         <PasswordUpdate/>

         <DeleteAccount/>
      </div>
    </div>
  );

}

export default SettingIndex