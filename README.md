# Todo App Practice Application

We have prepared for you a base version of a todo app. The point of this is to show you how a NextJS application is structured, teach you a few things about making web applications, and give you some practice with web development.


## What is the state of the project

Currently, users can put in their username, see their todos and create new todos. Todos are persisted on a supabase database.

## What are you going to do?

You are going to read through the current codebase to get a feel for how to make these things. Then you will implement functionality for editing and deleting todos.

## Explanation of project structure

Before we get into this, it is important to explain the client-server paradigm. A client is most of the time the end user on a web browser. The server is a computer(could be more than one actually) that manages resources and provides them to the client. They are seperate machines and communicate by sending requests and responses between each other. 

Next is NextJS(lol). NextJS is a react framework we will be using that will aloow us to build the backend(server) and frontend(client) within the same codebase in a nice way. 
Check it out: https://nextjs.org/

React was made by facebook and allows us to build powerful web pages in a modular manner. We can make components that are dynamic and reusable. It makes for a good dev experience as opposd to using regular HTML, CSS, JS. We are also using Typescript which is a superset of javascript. It is just Javascript with types. 

Javascript, CSS and HTML power the web. HTML determines how things are structured on the page, CSS determines the design and Javascript does the stuff that makes things functional and non-static.

If you're feeling not  up to speed on some of these, you can ask a TL or read up on them shortly!

## General Flow
The frontend(client) displays the users todos based on their username. The frontend renders a web page on the users screen based on the user's todo data that it requested from the server. The server gets the todos for that user from the database and sends it to the client. Whenever the user creates a new todo, the client sends a request for the server to carry out that action. The server handles the action and the new todo can be seen on the screen on completion.

## Project Structure

### /app 
The app folder is the entry point for our application. Core page and layout components are stored in here. NextJS uses a folder structure to determine the page hierarchy. A page is identified by a file with the name page.tsx. So the file app/home/page.tsx is what determines what is shown on our websites: examplewebsitedomain.com/home page. Right now, we have no nested folders we just have app/page.tsx which means our websites / url.

There's also something called a layout file that helps define shared content(like sidebars) across various pages within the same folder. For example, we could have settings/profile/page.tsx and settings/preferences/page.tsx share a sidebar by defining a single layout file in settings/layout.tsx. You can read more on this but for now not important for this tutorial.

### /app/api 
This is a reserved folder that defines our API handlers for our backend. When the client makes a request to our server, they make a request to an api endpoint. If you're not familiar you could watch a quick video on it but generally api handlers are basically always on, waiting for client requests. There are different handlers for different operations. Just like the webpages, there is a special file name, route.ts for defining the api routes. Currently, we have api/todos/route.ts which defines api handlers for getting and creating todos.

### /components
We use the shadcn component library for a set of prestyled elements we can use on the frontend. Those components, when added are over here.

### /domains
We would like to keep the app folder clean so basically all the components and hooks we create are organized in this folder.

### /domains/api/managers
Whenever an api handler runs, it needs to carry out some logic to satisfy the users reqwuest. We abstract that logic to a manager. right now we have /domains/api/managers/todoManager. In this manager, we have logic to get and create todos. The manager is mainly an orchestrator, piecing together different operations and business logic.

### domains/api/dals
The DALs do the actual data fetching. DAL stands for data access layer. We have domains/api/dals/todoDAL. This DAL has logic for actually carrying out the create and get operations directly on our database. The manager uses this directly to achieve results. 

NOTE: This might seem redundant for this project but as for larger projects, this structure is very helpful to keep things organized and neat especially when the manager does more than just fetching data(maybe filetering, joining stuff, etc).

So the chain is like: User -> API Handler -> Manager -> DAL. And result is returned up to the user.

### Hooks
Hooks are basically frontend functions that abstract some logic for us. This is a bad definition but basically they are that. We use hooks to encapsulate the reuest making logic. We have domains/todo/hooks/useCreateTodo.ts and domains/todo/hooks/useGetTodos.ts hooks that cmake requests to create and get todos respectively. We use TanstackQuery(formerly known as react query) for the request mking and management stuff. You can search up their docs for more info.


## Bringing it all together
1. Uer opens the website. The client call the gettodos hook.
2. The gettodos hook sends a request to the server(api handler) to give us the todos for a given username.
3.  The api handler recieves the request and calls the todomanger's getTodo function.
4. The todomanager's gettodo calls the todoDal's getTodo
5. The dal gets the data from the databse and returns it to the manager which returns to the api handler which sends a response to the client.
6. This takes some small time but the response containing the users todos is recieved on the client and the client displays that data
7. All the todos are rendered as a TodoEntry component. Modularization and reusability!
8. The user wants to add a todo so the user clicks the add todo button(shadcn component but we define the logic for what happens when its clicked)
9. Modal opens up asking for the users todo details. The user types them in and hits save.
10. The createTodo hook is called and a request to create the given todo is made to the server api handler. 
11. API handler -> manager -> dal. It's created and the api handler sends a response to the client that the todo was created.
12. The client recieves the response and knows the current data is stale so it invalidates the data and rwact query fetches new data using getTodo hook. Now, we have fresh data and the new todo shows up!

This was a simplification of everything happening. Some things that might be helpful to read up on for more info:
- Supabse
- NextJS app router, api handlers
- Tanstack query useQuery and useMutation
- Tailwind CSS
- ReactJS: motivation for the project, what it is, components. Popular hooks: useState, useRef, useContext, useMemo

## What do you do now
Mainly, we want you to implement in similar ways, using this project structure, edit and delete todo functionality. TLs will be around to support you! Ask questions!

## Bonus stuff
- A webpage that is nice to look at(frontend)
- Authentication(signing in users instead of using username input)


## Setup and tips
Make a .env file and put this inside
```
NEXT_PUBLIC_SUPABASE_URL=https://bsnfzfjxlxvgyabxqcbd.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzbmZ6Zmp4bHh2Z3lhYnhxY2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDkwNDgsImV4cCI6MjA3NTEyNTA0OH0.CvvV4LI2UmTV33D0snd7hcSMzDEtIFrSdLqbUn6dmRc
```
You need those keys to give you access to the supabse db I made. You can also make one for yourself and just swap the keys if you want to learn more about supabse and how the configuration works. Otherwise, I have created a todos table with fields you can find in the codebase.

***Start server*** by running:
```
npm run dev
```
in terminal at the root folder.


