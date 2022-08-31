# Project 2022 Summer

This is the code repository for project of the course *Type-safe Modern System Practice*. 

### How to add a new page

#### Frontend
1. Create a new page under ```src/Pages/``` which provides the function you want to implement to client. (Implementation delayed)
2. Register the page in ```src/Pages/PageStack.tsx``` and add navigation to it in some existing page. 

### New Type
1. Define the type in ```Tpyes``` and its serilizer(only if it is an enum type) in backend.

2. Define the correspond type in ```Types``` in frontend.

## New Message
1. Define the Message in the backend, decide its reaction and reply.message type.
2. Register the message handler in ```src/main/scala/Impl/Messages/TSMSPMessage.scala```. 
3. Add functions in ```Tables/*Table``` if used. 

4. Define the corresponding Message in frontend, overide getReplyMessage if message type is not string(ref: AdminTestMessage)