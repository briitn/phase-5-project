
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

  localStorage.setItem('l', 'o')
const test=localStorage.getItem('l')
console.log(test)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}




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
const [aUser, setAUser]=useState()

useEffect(() => {
  async function checkLoggedInStatus() {
    try {
      const res = await fetch("/loggedin");
      if (res.ok) {
        const { id, username } = await res.json();
        setUserStuff([{ id, username }]);
        setId(id);
        setCurrentUser(username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  }

  checkLoggedInStatus();
}, []);

// Fetch all authors
useEffect(() => {
  async function fetchAuthors() {
    const res = await fetch("/users/");
    const authors = await res.json();
    setAllAuthors(authors);
  }

  fetchAuthors();
}, []);

// Fetch all blogs and shuffle them
useEffect(() => {
  async function fetchBlogs() {
    const res = await fetch("/posts");
    const blogs = await res.json();
    setAllBlogs(shuffleArray(blogs));
  }

  fetchBlogs();
}, [userStuff]);

// Fetch all tags
useEffect(() => {
  async function fetchTags() {
    const res = await fetch("/tags");
    const tags = await res.json();
    setAllTags(tags);
  }

  fetchTags();
}, [userStuff]);

// Fetch recommended content based on tag name
useEffect(() => {
  async function fetchRecommended() {
    const res = await fetch("/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: tagName }),
    });
    const recommended = await res.json();
    setRecommendedStuff(recommended);
  }

  fetchRecommended();
}, [tagName]);


  return (
  <ThemeContext.Provider value={{setRefresh:setRefresh, setAUser:setAUser, aUser:aUser,setFilteredBlogs:setFilteredBlogs, findBlog:findBlog, isLoggedIn:isLoggedIn, userStuff:userStuff,setFindblog:setFindblog, setIsLoggedIn:setIsLoggedIn, refresh:refresh,readBlog:readBlog,
  setUserStuff:setUserStuff, userId:id, allBlogs:allBlogs,
  setAllBlogs:setAllBlogs, setReadBlog:setReadBlog, setId:setId, setTagName:setTagName, tagName:tagName,fromAblog:fromAblog, filteredBlogs:filteredBlogs,allTags:allTags, setFromAblog:setFromAblog,recommendedStuff:recommendedStuff, allUsers:allAuthors, setEditBlog:setEditBlog, editBlog:editBlog, currentUser:currentUser, userSearched: userSearched, setUserSearched:setUserSearched}}> <Fragment>
         
  
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
