# Phase-4-project
## Description
This is a blogging webiste that users can use to read and create blogs. My blogging website has severaal tables that all have a relationship and work together to interact with the database and make my app run. I have a users table that has many posts,  which has many comments and post_tags(the join table). Through this, each post can have many tags and each tag can have many posts through the join table. With these relations set up, I can get all the info i need to make my app run.

## Getting started
Before getting started i generated all the resources I needed via rails generate, then setup the tables and relationships i needed. For this app I used react js for my frontend and ruby on rails for the backend.  My frontend will need to send request to the backend and use the responses, which will be users information, posts, tags, and comments. It then renders all of that via the react components.
Using rails to handle my backend is efficient because rails has a lot of methods designed to make interacting with databases via active record simple.

## Goals
My idea for this app was that a user creates can read blogs without needing to have an account or be logged in. If a user wants to write a blog, they have to make an account and log in with that account and can then write blogs. I want the user to stay logged in even after they refresh the page and I will handle that with rails session. I also want users to be able to add tags to each posts and a search function for users to search for other users, tags or blogs.

## Final product and Installation
My final product has a create account page for users to make an account, which is required to write blogs but not required to view other blogs . After a user creates an account and signs in succefully with that account they can then write blogs and also comment on other blogs. A user can also edit their blogs and delete them if they want. Users can aslo add tags to posts and I want to recommend some blogs to the user based of blogs they have read. 
To install begin by running bundle install then rails db:seed to seed the data in the seeds file. Finally, run ra server in one terminal and in another, after navigating to the react file, run npm start for the frontend server.