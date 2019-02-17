import React from 'react';
import { H1, Spinner, NonIdealState } from '@blueprintjs/core';
import * as api from '../../api';
import Posts from '../Posts';
import PostEditor from '../PostEditor';
import './styles.css';

class App extends React.Component {
  state = {
    posts: {},
    recieving: false,
    sending: false,
    sendingError: false,
    recievingError: false,
    hasMore: false,
    editingMode: false,
    editingPost: null
  };

  loadPosts = lastId => {
    this.setState({ recieving: true });

    api.getPosts(lastId)
      .then(res => {
        const posts = res.data.data.reduce(
          (acc, post) => {
            acc[post.id] = post;
            return acc;
          },
          {}
        );
        const hasMore = res.data.data.length === 5;

        this.setState({
          posts: {
            ...this.state.posts,
            ...posts
          },
          hasMore,
          recieving: false
        });
      })
      .catch(() => {this.setState({
        recievingError: true,
        recieving: false
      })})
  };

  addPost = (title, text) => {
    this.setState({ sending: true });

    api.addPost(title, text)
      .then(({ data: { data } }) => {
        this.setState({
          posts: {
            ...this.state.posts,
            [data.id]: data
          },
          sending: false,
          editingPost: null
        });
      });
  };

  editPost = (postId, title, text) => {
    this.setState({ sending: true });

    api.editPost(postId, title, text)
      .then(({ data: { data } }) => {
        this.setState({
          posts: {
            ...this.state.posts,
            [data.id]: data
          },
          sending: false,
          editingPost: null
        });
      });
};

  handleSave = ({ title, text }) => {
    const { editingPost } = this.state;

    if (typeof editingPost === 'number') {
      this.editPost(editingPost, title, text);
    } else {
      this.addPost(title, text);
    }
  };

  loadEarlierPosts = () => {
    const lastId = Math.min.apply(null, Object.keys(this.state.posts));
    this.loadPosts(lastId);
  };

  handleAddClick = id => {
    this.setState({
      editingMode: true,
      editingPost: null
    });
  };

  handleEditClick = id => {
    this.setState({
      editingMode: true,
      editingPost: id
    });
  };

  handleEditorClosing = id => {
    this.setState({
      editingMode: false
    });
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch() {
    this.setState({ recievingError: true });
  }

  render() {
    const {
      posts,
      recieving,
      recievingError,
      sending,
      hasMore,
      editingMode,
      editingPost
    } = this.state;
    const postsArray = Object.values(posts);

    return (
      <div className='App'>
        <H1>Simple and sweet Tarantool blog</H1>
        {(!postsArray.length && recieving) && (
          <Spinner className='App__spinner' size={120} />
        )}
        {recievingError ? (
          <NonIdealState icon='outdated' title='Error' description='Something went wrong (' />
        ) : (
          <Posts
            data={postsArray}
            loading={recieving}
            sending={sending}
            editingPost={editingPost}
            hasMore={hasMore}
            onPostAdd={this.handleAddClick}
            onEarlierClick={this.loadEarlierPosts}
            onPostEdit={this.handleEditClick}
          />
        )}
        {editingMode && (
          <PostEditor
            isOpen={editingMode}
            posts={posts}
            postId={editingPost}
            onClose={this.handleEditorClosing}
            onSave={this.handleSave}
          />
        )}
      </div>
    );
  }
}

export default App; 
