import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Searchbar from "./Searchbar"
import Dropdown from "./Dropdown"
function Topnav(){
    const theme=useContext(ThemeContext)
    const history=useHistory()
    const mapUserStuff=theme.userStuff.map(item=>{
        console.log(item.username)
        return(
            <span key={item.id} id='profile' onClick={
                (e)=>{
                    fetch(`/users/${item.id}`)
    .then(res=>res.json())
    .then(res=>{
    
        console.log(res)
       
    
    
                    theme.setAUser([res]) 
                 
                    history.push('/author')
                 })
            }}>
                <img src={item.image_url} 
                alt='user profile'
                className='profilePic'/>
               </span>
    )
    })
    console.log(theme.aUser)
  
   return( 
   <header>
   <div className="topnav">

    <span id="channel"><strong onClick={()=>{history.push('/')}} >Channel🌐 </strong></span>
<Searchbar/>
<span>
{theme.isLoggedIn?   <span><a onClick={(e)=>{history.push('/createBlogs')}} id='write'><i className="fa-solid fa-pen-to-square"></i> Write</a> 
<button id='logout' onClick={(e)=>{

if (window.confirm("Are you sure you want to logout?")){
fetch("/logout",
{
method: "DELETE"
})
theme.setIsLoggedIn(false)}
history.push('/login')
}}>Logout</button> 
{mapUserStuff}</span>
: <span><span id='signIn'><b onClick={(e)=>history.push('/login')}>Sign in</b></span>
 <span id='signUp'><b onClick={(e)=>history.push('/signup')}>Sign up</b></span> </span>}
</span>


</div>


<Dropdown/>

 </header>)
}




export default Topnav