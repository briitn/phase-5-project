
import './App.css';
import CreateBlogs from './CreateBlogs';
import Home from './Home';
import Search from './Search';
import Blog from './Blog';
import Signup from './Signup';
import Login from './Login';
import Author from './Author';

import {Route, Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect, Fragment} from 'react';
import { ThemeContext } from 'styled-components';
function App() {
let l

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


const [aiTags, setAiTags]=useState([])

const [showAiTags, setShowAiTags]=useState(false)
  const [allBlogs, setAllBlogs]=useState([])
  const [readBlog, setReadBlog]=useState([])
  const [editBlog, setEditBlog]=useState()
  const [recommendedStuff, setRecommendedStuff]=useState([])
  const [userSearched,setUserSearched]=useState('')
  const [userStuff, setUserStuff]=useState([])
  const [findBlog, setFindblog]=useState('')
const [refresh, setRefresh]=useState(false)
  const [id, setId]=useState('')
  const [currentUser, setCurrentUser]=useState()
  const [allAuthors, setAllAuthors]=useState([])
  const [tagName, setTagName]=useState()
  const [allTags, setAllTags]=useState([])
const[fromAblog, setFromAblog]=useState(false)
const [isLoggedIn, setIsLoggedIn]=useState(false)
const [filteredBlogs, setFilteredBlogs]=useState([])
const [aUser, setAUser]=useState([])


useEffect(()=>{
  fetch("/loggedin")
  .then((res)=>{
      if (res.ok){
          res.json().then((res)=>{
        
              setUserStuff([res])
              setId(res.id)
              setCurrentUser(res.username)
        setIsLoggedIn(true)
          })
      }
      else {
          res.json().then((err) => {
        
              setIsLoggedIn(false)
              })
  }
  }) },[])

    useEffect(()=>{
      fetch("/users/")
      .then(res=>res.json())
      .then(res=>{
  
        setAllAuthors(res)
      })},[])
 
useEffect(()=>{
    fetch("/posts")
.then(res=>res.json())
.then(res=>{




  setAllBlogs(shuffleArray(res))
 

    })
}, [])

useEffect(()=>{
  fetch("/tags")
.then(res=>res.json())
.then(res=>{  setAllTags(res)
  

  })
}, [])





  return (
  <ThemeContext.Provider value={{setRefresh:setRefresh, setAUser:setAUser, aUser:aUser,setFilteredBlogs:setFilteredBlogs, findBlog:findBlog, isLoggedIn:isLoggedIn, userStuff:userStuff,setFindblog:setFindblog, setIsLoggedIn:setIsLoggedIn, refresh:refresh,readBlog:readBlog,
  setUserStuff:setUserStuff, userId:id, allBlogs:allBlogs,
  setAllBlogs:setAllBlogs, setReadBlog:setReadBlog, setId:setId, setTagName:setTagName, tagName:tagName,fromAblog:fromAblog, filteredBlogs:filteredBlogs,allTags:allTags, setFromAblog:setFromAblog,recommendedStuff:recommendedStuff, setRecommendedStuff:setRecommendedStuff, allUsers:allAuthors, setEditBlog:setEditBlog, editBlog:editBlog, currentUser:currentUser, userSearched: userSearched, setUserSearched:setUserSearched ,setCurrentUser:setCurrentUser, aiTags:aiTags, setAiTags:setAiTags, setShowAiTags:setShowAiTags, showAiTags:showAiTags}}> <Fragment>
         
  
    <BrowserRouter>
    <Switch>
     <Route exact path='/signup'>
      
<Signup/>
     </Route>
     <Route exact path='/author'>
      
       <Author/>
     </Route>
     <Route exact path='/login'>
     
     <Login  />
   </Route>
   <Route exact path='/search'>
     
     <Search/>
   </Route>
   <Route exact path='/blog'>
     
     <Blog />
   </Route>
   <Route exact path='/createBlogs'>
     
   <CreateBlogs/>
   </Route>
   <Route exact path='/'>
      
       <Home />
     </Route>
     
     </Switch>
     </BrowserRouter>
     </Fragment></ThemeContext.Provider>
  );
}

export default App;
