import {NavLink} from "react-router-dom"
function NavBar(){
    return(
        <div className="topnav">
           
           <div><NavLink to ="/"
            exact>Home</NavLink></div>
            
            <div><NavLink to ="/login" exact>Login</NavLink></div>
            <div><NavLink to ="/signup" exact>Sign up</NavLink></div>
           
        </div>
    )
}


export default NavBar