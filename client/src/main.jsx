import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import Pages from './routes/Pages.jsx'
import CreatePost from './routes/CreatePost.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './style/index.css'
import Article from './routes/Article.jsx'
import Login from './routes/Login.jsx'
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "pages/:handle",
    element: <Pages/>
  },
  {
    path: "create",
    element: <CreatePost/>
  },
  {
    path: "article",
    element: <Article/>
  },
  {
    path: "login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);