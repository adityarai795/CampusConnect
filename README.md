# CampusConnect

Campus Connect is a web-based platform designed to streamline academic collaboration and access to study resources across university campuses. Built with a student-first approach, it helps users find, filter, and download academic materials based on university, branch, year, semester, and subject.
frontend demo url("https://campusconnect-7xdq.onrender.com");

## 🚀 Features

- 🔍 **Smart Search**: Quickly find notes and resources with an intuitive search bar.
- 🎓 **Dynamic Filters**: Filter content by:
  - University
  - Branch
  - Year
  - Semester
- 📘 **Subject Input**: Fetch or upload resources based on specific subjects.
- 📱 **Responsive UI**: Seamless experience across devices (mobile-first approach).
- 🧠 **Future Additions (Planned)**:
  - Authentication (Student Login/Upload)

---

## 🧰 Tech Stack

- **Frontend**: React, Sass, React Router DOM, Axios, Leaflet, React Quill
- **Backend**: Node.js, Express, Prisma, MongoDB Atlas
- **Authentication**: Bcrypt, JSON Web Token (JWT), Cookie-Parser
- **Image Handling**: Upload Widget, Cloudinary
- **Others**: CORS

--- 

## Installation

### 1. Clone the Repository
      git clone ```https://github.com/adityarai795/campusConnect.git```


### 2. Go to api directory and install dependencies:

```    cd CampusConnect
       cd Backend
       npm install
 ```
      
### 3 .Go to client directory and install dependencies:

   ```   cd CampusConnect
         cd Frontend 
         npm install 
   ```

### 4. Create a .env file in the api directory and add the following:
```    DATABASE_URL=<Your MongoDB Atlas URL> 
     JWT_SECRET_KEY=<Your JWT Secret Key>   
     CLIENT_URL=<Your Client URL>
 ```

### 5. Set up Prisma:

 ```     cd backend  
      npm run dev
      Run the application:
```
### 6. Run the application:

-   **Start the client**
      ```  cd client 
            npm run dev 
      ```

      
-  **Start the API server**
``` cd api  
   npm run dev 
```