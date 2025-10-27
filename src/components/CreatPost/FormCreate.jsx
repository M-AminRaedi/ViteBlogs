// --- import ---
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewBlog,  } from "../../reducers/blogSlice";
import { selectAllUsers } from "../../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
// --- React Component ---
const FormCreate = () => {
    // --- React state ---
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(" ");
    const navigate = useNavigate();
    // --- Redux dispatch ---
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers)
    const [requestStatus, setRequestStatus] = useState("idle");

    // Event handlers
    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);
    const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";


    const handleSubmitForm = async () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                await dispatch(addNewBlog({
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    user: userId,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0,
                    },
                })
                );
                setTitle("");
                setContent("");
                setUserId("");
                navigate("/")
            }
            catch (error) {
                console.error("Failed to save the blog", error);
            }
            finally {
                setRequestStatus("idle");
            }
        }
    }
    return (
        <>
            <form autoComplete="off">
                <label htmlFor="blogTitle">عنوان پست :</label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="blogAuthor">نویسنده : </label>
                <select id="blogAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="">
                        انتخاب نویسنده
                    </option>
                    {
                        users.map(
                            user => (
                                <option key={user.id} value={user.id}>
                                    {
                                        user.fullname
                                    }
                                </option>
                            )
                        )
                    }
                </select>
                <label htmlFor="blogContent">محتوای اصلی :</label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button" onClick={handleSubmitForm}
                    disabled={!canSave}>
                    ذخیره پست
                </button>
            </form>
        </>
    )
}

export default FormCreate;