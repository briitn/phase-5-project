import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"



function Searchbar(){
    const theme=useContext(ThemeContext)
    const history=useHistory()
    async function searchBlog() {
        try {
          const response = await fetch('/posts/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: theme.findBlog,
            }),
          });
      
          if (response.ok) {
            const res = await response.json();
            theme.setFilteredBlogs(res);
            console.log(res)
            theme.setFindblog('');
            history.push('/search');
          } else {
            const err = await response.json();
            console.log(err);
            alert(err.errors);
          }
        } catch (error) {
          console.log(error);
        }
      }
      
    return(
        
<span className='dropdown'>  
<form onSubmit={(e)=>{
e.preventDefault()
localStorage.setItem('search', (theme.findBlog))

    if(theme.findBlog){
searchBlog()

}}}>
<input type="text" placeholder=" 🔍 Search.."
value={theme.findBlog}
id='search'
onChange={(e)=>{
console.log(e.target.value)
theme.setFindblog(e.target.value)
}} 
/>
</form>

</span>
    )

}


export default Searchbar