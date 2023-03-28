import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"



function Searchbar(){
    const theme=useContext(ThemeContext)
    const history=useHistory()
function searchBlog(){fetch('/posts/search',
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
}
    return(
        
<span className='dropdown'>  
<form onSubmit={(e)=>{
e.preventDefault()
localStorage.setItem('search', JSON.stringify(theme.findBlog))
const userSearched=localStorage.getItem('search')
console.log(userSearched)
console.log(theme.findBlog)
    if(theme.findBlog){
searchBlog()

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
    )

}


export default Searchbar