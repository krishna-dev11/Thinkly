import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartCoursesIds : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}
 


  const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers : {
         setCartCoursesIds(state , action){
            state.cartCoursesIds = action.payload
            // console.log(state.cartCoursesIds)
            
         }
      }
      })

  export const { setCartCoursesIds } = CartSlice.actions
  export default CartSlice.reducer