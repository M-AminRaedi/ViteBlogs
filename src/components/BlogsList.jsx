// --- import ---
import { Link, useNavigate } from "react-router-dom";
import { ShowAuthor, ShowTime } from "./Servise";
import ReactionButtons from "./ReactionButtons.jsx";
import Spinner from "./Spinner/spinner";
import { useMemo } from "react";
import { useGetBlogsQuery } from "../Api/ApiSlice.js";
import CreatePost from './CreatPost/CreatePost';

let Blog = ({ blog }) => {
    return (
        <article className="blog-excerpt">
            <h3>{blog.title}</h3>

            <div style={{ marginTop: "10px", marginRight: "20px" }}>
                <ShowTime timestamp={blog.date} />
                <ShowAuthor userId={blog.user} />
            </div>

            <p className="blog-content">
                {blog.content.substring(0, 100)}
            </p>

            <ReactionButtons blog={blog} />

            <Link to={`/blogs/${blog.id}`} className="button muted-button">
                دیدن کامل پست
            </Link>
        </article>
    );
};

const BlogsList = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetBlogsQuery();

    const navigate = useNavigate();

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a, b) => b.date.localeCompare(a.date));
        return sortedBlogs;
    }, [blogs]);

    let content;

    if (isLoading) {
        content = <Spinner text="بارگذاری ..." />;
    } else if (isSuccess) {
        content = sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
        ));
    } else if (isError) {
        content = <div>{error}</div>;
    }

    return (
        <section className="blog-list">
            <button
                className="full-button accent-button"
                style={{ marginTop: "1em" }}
                onClick={() => navigate("/blogs/CreatePost")}
            >
                ساخت پست جدید
            </button>

            <h2>تمامی پست‌ها</h2>

            {content}
        </section>
    );
};

export default BlogsList;
 