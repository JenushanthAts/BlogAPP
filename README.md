# BlogAPP Documentaion <br/>

This web app was developed using ReactJs , NodeJs, ExpressJs and Mysql.

#To Start
1.Clone this project with branch name webDev

2.Create database as "blogdb" and insert the attached dump file.Database configuration are like user:root, password:root,host:localhost,db:blogdb

3.Switch into server directory and typ "npm i" then "npm run server"

4.Switch into client directory and type "npm i" then "npm start".

5.Main Features are

 -- User Can login
 
 -- Anyone can view all blogs
 
 -- users can post theri blogs on website
 
 -- user can delete their post only
 
 -- user can update their post
 
 6.Back-End<br/> 
  6.1. Create folder structure as following controller , middleware , model(db configuration), routes and main js file(index.js)<br/>.
  6.2. Create a env file which contains Port number, db configurations and jwt secret key.
  6.3. Create end points for user and blog (create post, updat epost, Delete post ,read post) in index.js file<br/>.
  6.4. Create controller for authentication (Register , SignIn and check whether user exists or not) and Crud operation controller for blog<br/>
  6.5. Create route files for authentication and blog crud operations<br/>.
  6.6  Create middleware and place it into index.js file for handling crud operations (Delete and Update) of blogs.
