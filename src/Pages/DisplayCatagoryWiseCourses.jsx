import React, { useEffect, useState } from "react";
import Fotter from "../Components/Common/Fotter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetCategoryWiseCoursesData } from "../Services.jsx/Operations/CoursesAPI";
import CategoryWiseCoursesPageTopPart from "../Components/Core/Catalog/CategoryWiseCoursesPageTopPart";

const DisplayCategoryWiseCourses = () => {
  const { categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryCourses = async () => {
      try {
        await dispatch(GetCategoryWiseCoursesData(categoryId));
        // console.log("krishna");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCategoryCourses();
  }, [ categoryId , categoryName ]);

  // Jab tak data load ho raha hai, ek loading state dikhao
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[calc(100%-6%)] translate-y-7 bg-richblack-900">
      <CategoryWiseCoursesPageTopPart />
      <Fotter />
    </div>
  );
};

export default DisplayCategoryWiseCourses;
