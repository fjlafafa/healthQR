# Project 2022 Summer

This is the code repository for project of the course *Type-safe Modern System Practice*. 

### How to add a new page

#### Frontend
1. Create a new page under ```src/Pages/``` which provides the function you want to implement to client. (Implementation delayed)
2. Define a new message class under ```src/Messages/```. (Implementation delayed)
3. Register the page in ```src/App.tsx``` and add navigation to it in some existing page. 

#### Backend
1. Define a new message class under ```src/main/scala/Impl/Messages/```. (Implementation delayed)
2. Register the message handler in ```src/main/scala/Impl/Messages/TSMSPMessage.scala```. 
3. Add functions in ```Tables/*Table``` if used. 