import { useState, useContext, Fragment } from "react"
import FormField from "./styles/FormField"
import { useHistory  } from "react-router-dom"
import { ThemeContext } from "styled-components"
function Login(){
    document.title= 'Channel/login'
const theme=useContext(ThemeContext)
    const history= useHistory()
    const fromBlog= localStorage.getItem('fromBlog')
    const [username, setUsername]=useState('')
    const [loading, setLoading]=useState(false)
    const [password, setPassword]=useState('')

    function changeSubmit(e){
        e.preventDefault()
        setLoading(true)
        fetch("users/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            }
            )
        })
        .then((res)=>{
            if (res.ok){
                res.json().then((res)=>{theme.setUserStuff([res])
                    theme.setIsLoggedIn(true)
                   
                    fromBlog?history.push('/blog'):history.push('/')
                localStorage.clear()
                 
                })
            }
            else {
                res.json().then((err) => {
                alert(err.errors)})
            }

        })

       
    }

    function changePass(e){

        setPassword(e.target.value)
    
    }

    function changeUser(e){

        setUsername(e.target.value)
      
    }
    return (
        <Fragment>
             <header><h1 onClick={()=>{
                        localStorage.clear()
                history.push('/')}}>Channel🌐</h1></header>


        <div className='fox'>
       
   
   
    
       <p className="sign" align="center">Sign in</p>
        <form onSubmit={changeSubmit} className="form">
            <FormField>
            
            <input type='text'
            name="username"
            placeholder="Username"
            className="username"
            value={username}
            onChange={changeUser}
            />
            </FormField>
            <FormField>
      
            <input type='text'
            name="password"
            className="username"
             placeholder="Password"
            value={password}
            onChange={changePass}/>
     </FormField>
           {loading?<button className="sumbit">Signing you in...</button>:<button className="submit" >
            Sign in</button>}
            <p  className='sc'> <a  href='./signup'>Create an account</a> </p>
           </form> 
     
      
        </div>
        </Fragment>
    )
}








export default Login