# BlogAPP Documentaion <br/>

This web app was developed using ReactJs , NodeJs, ExpressJs and Mysql with Jwt authentication and authorization. Client app is connected to server via REST Api.  <br/>
Project folder structure be like
```
📦client
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┃ ┃ ┗ 📂Components
 ┃ ┃ ┗ 📂context
 ┃ ┃ ┗ 📂Pages
 ┣ 📜App.js
 ┣ 📜config.js
 ┣ 📜index.css
 ┗ 📜index.js
 
 📦server
 ┣ 📂contoller
 ┣ 📂node_modules
 ┣ 📂middleware
 ┣ 📂model
 ┣ 📂routes
 ┗ 📜index.js

```
# To Start
1.Clone this project with branch name webDev.<br/>
2.Create database as "blogdb" and insert the attached dump file.Database configuration are like user:root, password:root,host:localhost,db:blogdb.<br/>
3.Switch into server directory and type "npm i" then "npm run server".<br/>
4.Switch into client directory and type "npm i" then "npm start".<br/>

 # Frond End
  We know very well everything in react is component. Here Bootstrap and custom styles were used for resonsiveness.<br/>
  1. After installing npm modules delete the unnecessary files like App.css and change the app title which shows in browser tab.<br/>
  2. Create components folder.<br/>
  3. Create Topbar, Post and DeleteModal components inside the components folder. Topbar contains nav bar contents (logo, nav link), Post component contains main js      file(Posts.js) which fetch the all the blogs from db  and send it to child components called Post via props finally Deletmodal component is used to show up a model when clicking delete button.</br>
  4. Create a context folder which explains us about context api to storing user credentials in local storage ,enable login and logout functionalities.And utilize it whereever we want. </br>
  5. Create a pages folder which contains all the necessary pages.<br/>
  6. Create general routes and protected routes inside the app.js file. To access context api hook , Wrap the entire routes into contextProvider.<br/>
  
 #  Back-End<br/> 
  1. Create a env file which contains Port number, db configurations and jwt secret key.<br/>
  2. Create end points for user and blog (create post, updat epost, Delete post ,read post) in index.js file.<br/>
  3. Create controller for authentication (Register , SignIn and check whether user exists or not) and Crud operation controller for blog.<br/>
  4. Create route files for authentication and blog crud operations.<br/>
  5. Create middleware and place it into index.js file for handling crud operations (Delete and Update) of blogs.

# Main Features are
  User Can register and login<br/>
  Anyone can view all blogs <br/>
  Users can post theri blogs on website <br/>
  User can delete their post only <br/>
  User can update their post <br/>
