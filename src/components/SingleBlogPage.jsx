// --- import ---
import {useParams, Link, useNavigate} from "react-router-dom";
import {
    selectBlogById,
    deleteApiBlog,
} from "../reducers/blogSlice";
import {useSelector, useDispatch} from "react-redux";
import ShowAuthor from "./Servise/ShowAuthor";
import ShowTime from "./Servise/ShowTime";
import ReactionButtons from "./ReactionButtons.jsx";

const SingleBlogPage = () => {
    const {blogId} = useParams();

    const blog = useSelector((state) => selectBlogById(state, blogId));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!blog) {
        return (
            <section>
                <h2>پستی که دنبالش میگردی وجود نداره دوست من 🤗</h2>
            </section>
        );
    }
    const handleDelete = () => {
        if (blog) {
            dispatch(deleteApiBlog(blog.id));
            // dispatch(blogDeleted({ id: blog.id }));
            navigate("/");
        }
    };
    return (
        <section>
            <article className="blog">
                <h2>{blog.title}</h2>

                <div style={{marginTop: "10px", marginRight: "20px"}}>
                    <ShowTime timestamp={blog.date}/>
                    <ShowAuthor userId={blog.user}/>
                </div>

                <p className="blog-content">{blog.content}</p>

                <ReactionButtons blog={blog}/>

                <Link to={`/editBlog/${blog.id}`} className="button">
                    ویرایش پست
                </Link>
                <button
                    className="muted-button"
                    style={{marginRight: "10px"}}
                    onClick={handleDelete}
                >
                    حذف پست
                </button>
            </article>
        </section>
    );
};

export default SingleBlogPage;
