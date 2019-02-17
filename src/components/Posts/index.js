import React from 'react';
import { Button } from '@blueprintjs/core';
import Post from '../Post';
import './styles.css';

const Posts = ({
  data = [],
  hasMore = false,
  loading = false,
  sending,
  editingPost,
  onEarlierClick,
  onPostAdd,
  onPostEdit,
  onPostLike
}) => (
  <div className='Posts'>
    {(!loading || data.length) && (
      <div className='Posts__btnWrap'>
        <Button onClick={onPostAdd} large icon='insert' text='Insert post' />
      </div>
    )}
    {(sending && typeof editingPost !== 'number') && (
      <Post
        className='Posts__post'
        skeleton
      />
    )}
    {data.reduceRight((acc, post) => {
      acc.push(
        <Post
          className='Posts__post'
          key={post.id}
          onEditClick={onPostEdit}
          onLikeClick={onPostLike}
          skeleton={sending && editingPost === post.id}
          {...post}
        />
      );
      return acc;
    }, [])}
    {hasMore && (
      <div className='Posts__btnWrap'>
        <Button
          onClick={onEarlierClick}
          large
          loading={loading}
          text='Earlier posts'
          icon='cloud-download'
        />
      </div>
    )}
  </div>
);

export default Posts;
