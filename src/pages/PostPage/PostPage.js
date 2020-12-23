import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { getPost, deletePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Post = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px auto;
  padding: 0 20px;
`;

const PostTitle = styled.h2`
  margin-bottom: 0;
`;

const PostCreatedAt = styled.p`
  align-self: flex-end;
  margin: 0;
`;

const PostContent = styled.p`
  margin: 20px 0;
`;

export default function PostPage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deletePost(id)).then((res) => {
      console.log("delete");
      history.push("/");
    });
  };

  return (
    <Post>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {user.id === post.user.id && (
            <div>
              <button onClick={handleDelete}>delete</button>
              <Link to={`/edit-post/${id}`}>
                <button>edit</button>
              </Link>
            </div>
          )}
          <PostTitle>{post.title}</PostTitle>
          <PostCreatedAt>
            <b>寫於：</b>
            {new Date(post.createdAt).toLocaleString()}
          </PostCreatedAt>
          <PostContent>{post.body}</PostContent>
        </>
      )}
    </Post>
  );
}
