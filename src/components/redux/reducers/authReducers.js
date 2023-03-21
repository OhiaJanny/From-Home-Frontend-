const authReducer = (state = true, action)=>{
    switch (action.type) {
        case "LOGGED_IN":
          return (state = action.payload);
        default:
          return state;
      }

}

export default authReducer;