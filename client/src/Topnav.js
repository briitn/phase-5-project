import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"


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
    const showSearch= theme.allTags?.filter(item=>{
        return item.name.includes(theme.findBlog)
      })
      const showSearch2= theme.allUsers?.filter(item=>{
        return item.username.includes(theme.findBlog)
      })
   return( 
   <header>
   <div className="topnav">

    <span id="channel"><strong onClick={()=>{history.push('/')}} >Channel🌐 </strong></span>
<span className='dropdown'>  
<form onSubmit={(e)=>{
e.preventDefault()
    if(theme.findBlog){
fetch('/posts/search',
{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(
{
title: theme.findBlog
}
)

})
.then((res)=>{
if (res.ok){
res.json().then((res)=>{
theme.setFilteredBlogs(res)
theme.setUserSearched(theme.findBlog)
theme.setFindblog()

history.push('/search')
})
}
else {
res.json().then((err) => {
   console.log(err)
alert(err.errors)})
}
})


}}}>
<input type="text" placeholder=" 🔍 Search.."
value={theme.findBlog}
id='search'
onChange={(e)=>{

theme.setFindblog(e.target.value)
}} 
/>
</form>

</span>

<span>
{theme.isLoggedIn?   <span><a href="/createBlogs" id='write'>✍️ Write</a> 
<button id='logout' onClick={(e)=>{

if (window.confirm("Are you sure you want to logout?")){
fetch("/logout",
{
method: "DELETE"
})
theme.setIsLoggedIn(false)}
history.push('/')
}}>Logout</button> 
{mapUserStuff}</span>
: <span><span id='signIn'><b onClick={(e)=>history.push('/login')}>Sign in</b></span>
 <span id='signUp'><b onClick={(e)=>history.push('/signup')}>Sign up</b></span> </span>}
</span>


</div>

<div className='dropdown-content'>{theme.findBlog? <span >
  
<p>Topics</p>
<div>
{showSearch.map(item=>
{

return(<div key={item.id} > 

<small onClick={(e)=>{  fetch('/filtered',
           {
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify(
                  {
                  name:item.name
                  }
              )
           
           })
        .then(res=>res.json())
        .then(res=>{
            theme.setUserSearched(item.name)
           theme.setFilteredBlogs(res)  
           theme.setFindblog()
          history.push('/search') 
             })}}>
<i class="fas fa-tag"></i>{item.name}
</small>

</div>)
}) } 
</div>
<div><p>People</p></div>

{showSearch2.map(item=>{
return(

   <div key={item.id} onClick={(e)=>{
          fetch(`/users/${item.id}`)
          .then(res=>res.json())
          .then(res=>{
          
              console.log(res)
              theme.setFindblog('')
              theme.setAUser([item])
                  
                          history.push('/author')
                       })
   }}>
   <img src={item.image_url} className='profilePic' alt="user profile"/>
     <small>{item.username}</small>  

   </div>

)
})}</span>
:<div></div>}</div>



 </header>)
}




export default Topnav