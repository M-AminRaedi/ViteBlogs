import {createBrowserRouter} from "react-router-dom";

import App from "../App";
import MainLayout from "../layouts/MainLayout";
import SingleBlogPage from "../components/SingleBlogPage.jsx";
import CreatePost from "../components/CreatPost/CreatePost";
import EditBlogForm from "../components/EditBlogForm.jsx";
import UsersList from "../components/UsersList.jsx";
import UserPage from "../components/UserPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: (
            <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
        ),
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/blogs/:blogId",
                element: <SingleBlogPage/>,
            },
            {
                path: "/editBlog/:blogId",
                element: <EditBlogForm/>,
            },
            {
                path: "/users",
                element: <UsersList/>,
            },
            {
                path: "/users/:userId",
                element: <UserPage/>,
            },
            {
                path: "/blogs/CreatePost",
                element: <CreatePost/>,
            }
        ],
    },
]);
