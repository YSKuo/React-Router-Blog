import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { getPost } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);

  useEffect(() => {
    dispatch(getPost(id))
  }, [id, dispatch])

  return (
    <Post>
      <PostTitle>{post.title}</PostTitle>
      <PostCreatedAt><b>寫於：</b>{new Date(post.createdAt).toLocaleString()}</PostCreatedAt>
      <PostContent>{post.body}</PostContent>
    </Post>
  );
}
