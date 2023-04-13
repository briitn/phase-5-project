import { useHistory } from "react-router-dom"
import { Fragment, useContext, useEffect} from "react"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
const Search = () => {
    const theme = useContext(ThemeContext);
    const userSearched = localStorage.getItem("search");
  
    useEffect(() => {
      fetch("/searched")
        .then((res) => res.json())
        .then((res) => {
          theme.setFilteredBlogs(res);
        });
    }, []);
  
    const history = useHistory();
  
    const mapBlogs = theme.filteredBlogs?.map((item) => {
      return (
        <div key={item.id}>
          <hr />
          <img src={item.user.image_url} alt="userImage" className="profilePic" />
          <div>
            <b>{item.user.username}</b>
          </div>
          <span>
            <i>{item.title}</i>
          </span>
          <p>{`${item.blog.slice(0, item.blog.length * 0.1)}...`}</p>
          <p>👁{item.views}</p>
          <p
            onClick={() => {
              theme.setReadBlog([item]);
              console.log(item.id);
              console.log(item);
              fetch("/views", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: item.id,
                  views: true,
                }),
              });
              history.push("/blog");
            }}
          >
            read more
          </p>
        </div>
      );
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
  
    useEffect(() => {
      const hiddenElements = document.querySelectorAll(".container");
      hiddenElements.forEach((el) => {
        observer.observe(el);
      });
  
      return () => {
        hiddenElements.forEach((el) => {
          observer.unobserve(el);
        });
      };
    }, [observer]);
  
    return (
      <Fragment>
        <Topnav />
        <div className="container">
          <h1>{userSearched}</h1>
          {mapBlogs}
        </div>
      </Fragment>
    );
  };
  
  export default Search;
  