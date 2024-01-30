import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const [description, setPostDescription] = useState('');
  const [postImage, setPostImage] = useState('');
  const token=localStorage.getItem('token');
  const storedUserId = localStorage.getItem('userId');
  const [commentInput,setCommentInput] = useState('');
  const [commentsOnPosts, setCommentsOnPosts] = useState({});
  const [postLiked, setPostLiked] = useState(false);
  const navigate = useNavigate();
  const [data, setApiData] = useState([]);

  const getPosts = async () => {
    try {
      let response = await fetch('http://localhost:3001/api/posts/get-posts', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        let result = await response.json();
        setApiData(result.posts);

        const commentsPromises = result.posts.map(async (post) => {
          try {
            const commentsResponse = await fetch(
              `http://localhost:3001/api/likeCommentPost/getComments-post?PostId=${post._id}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            if (commentsResponse.ok) {
              const commentsResult = await commentsResponse.json();
              setCommentsOnPosts((prevComments) => ({
                ...prevComments,
                [post._id]: commentsResult,
              }));
            } else {
              console.error('Error fetching comments:', commentsResponse.statusText);
            }
          } catch (error) {
            console.error('Error during comment fetch:', error);
          }
        });

        await Promise.all(commentsPromises);
      } else if (response.status === 401) {
        navigate('/');
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during data fetch:', error);
    }
  };



  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmitPost = async () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', postImage);
	  try {
      let response = await axios.post(
        'http://localhost:3001/api/posts/create-post',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(response.data?.message);
	    setPostDescription('');
      setPostImage(null);
	    window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

   const handleCommentSubmit = async (postId) => {
    const formData = new FormData();
    formData.append('PostId', postId);
    formData.append('userId', storedUserId);
    formData.append('text', commentInput);
	  try {
      const response = await axios.post(
        `http://localhost:3001/api/likeCommentPost/commentOn-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data?.message);
      getPosts();
      setCommentInput('');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const likeThePost = async (postId) => {
    const formData = new FormData();
    formData.append('PostId', postId);
    formData.append('userId', storedUserId);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/likeCommentPost/like-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setPostLiked(response.data?.success);
        console.log(response.data?.success);
        alert(response.data?.message);
        getPosts();
      } else {
        console.error('Error liking post:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePostSubmit = () => {
    handleSubmitPost();
  };
//delete post
const handleDeletePost = async (postId) => {
  try {
    const deleteResponse = await fetch(`http://localhost:3001/api/posts/delete-post/${postId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
    console.log(postId)
    if (deleteResponse.ok) {
    getPosts()
    } else {
      console.error('Error deleting post:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error during post deletion:', error);
  }
};

// Inside your component where you render the delete button:


  return (
   <>
     <section>
		<div className="gap2 gray-bg">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="row merged20" id="page-contents">
                  <div className="col-lg-6 mx-auto">
                    <div className="central-meta">
                      <div className="new-postbox">
                        <figure>
                          <img src="/images/resources/admin2.jpg" alt="" />
                        </figure>
                        <div className="newpst-input">
                          <form>
                            <textarea
                              onChange={(e) => setPostDescription(e.target.value)}
                              rows={2}
                              placeholder="write something"
                            />
                            <div className="attachments">
                              <ul>
                                <li>
                                  <label className="fileContainer">
                                    <input
                                      type="file"
                                      onChange={(e) => setPostImage(e.target.files[0])}
                                    />
                                  </label>
                                </li>
                                <li></li>
                              </ul>
                            </div>
                          </form>
                          <button
                            className="btn btn-success p-3 mb-1 mt-2"
                            onClick={handlePostSubmit}
                          >
                            Post
                          </button>
						                  <input
                                      type="file"
                                      onChange={(e) => setPostImage(e.target.files[0])}
                                    />
                        </div>
                      </div>
                    </div>
                    {data.map((post) => (
                      <div key={post._id}>
                        <div className="loadMore">
                          <div className="central-meta item">
                            <div className="user-post">
                              <div className="friend-info">
                                <div className="friend-name">
                                  <ins>
                                    <a href="time-line.html" title="">
                                      {post.description}
                                    </a>
                                  </ins>
                                  <div className='deletePost d-flex mb-2 justify-content-end'>
                                    <button className='btn btn-danger' onClick={() => handleDeletePost(post._id)}>
                                      Delete {post._id}
                                    </button>
                                  </div>
                                  <div className='deletePost d-flex justify-content-end'>
                                    <button className='btn btn-warning'>Update</button>
                                  </div>
                                  <span>published: june,2 2018 19:PM</span>
                                </div>
                                <div className="post-meta">
                                  {post.mediaAttachments.map((media) => (
                                    <img
                                      className="post-img"
                                      key={media._id}
                                      src={media.sourceUrl}
                                      alt="Media Attachment"
                                    />
                                  ))}
                                  <div className="we-video-info">
													<ul>
														<li>
															<span className="views" data-toggle="tooltip" title="views">
																<i className="fa fa-eye"></i>
																<ins>1.2k</ins>
															</span>
														</li>
														<li>
															<span className="comment" data-toggle="tooltip" title="Comments">
																<i className="fa fa-comments-o"></i>
																<ins>{(commentsOnPosts[post._id]?.comments?.length || 0)}</ins>
															</span>
														</li>
														<li>
                              <span
                                className={`fa ${postLiked ? 'fa-thumbs-up active' : 'fa-thumbs-o-up'}`}
                                data-toggle="tooltip"
                                title="like"
                                onClick={() => likeThePost(post._id)}
                              >
                                <i className=""></i>
                                <ins>12k</ins>
                              </span>
                            </li>

														<li>
															<span className="dislike" data-toggle="tooltip" title="dislike">
																<i className="ti-heart-broken"></i>
																<ins>200</ins>
															</span>
														</li>
														<li className="social-media">
															<div className="menu">
															  <div className="btn trigger"><i className="fa fa-share-alt"></i></div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-html5"></i></a></div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-facebook"></i></a></div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-google-plus"></i></a></div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-twitter"></i></a></div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-css3"></i></a></div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-instagram"></i></a>
																</div>
															  </div>
																<div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-dribbble"></i></a>
																</div>
															  </div>
															  <div className="rotater">
																<div className="btn btn-icon"><a href="/#" title=""><i className="fa fa-pinterest"></i></a>
																</div>
															  </div>

															</div>
														</li>
													</ul>
												</div>
												<div className="description">

													<p>
													</p>
												</div>
											</div>
										</div>
                    <div className="coment-area">
											<ul className="we-comet">
                        {Object.values(commentsOnPosts[post._id]?.comments || {}).map((comment) => (
                          <li key={comment._id}>
                            <div className="comet-avatar">
                              <img src='/images/resources/comet-1.jpg' alt="" />
                            </div>
                            <div className="we-comment">
                              <div className="coment-head">
                                <h5><a href="time-line.html" title="">Ali Raza</a></h5>
                                <span>29 Jan, 2024</span>
                                <a className="we-reply" href="/#" title="Reply"><i className="fa fa-reply"></i></a>
                              </div>
                              <p>{comment.text}</p>
                            </div>
                          </li>
                        ))}

												<li>
													<a href="/#" title="" className="showmore underline">more comments</a>
												</li>
												<li className="post-comment">
													<div className="comet-avatar">
														<img src="/images/resources/comet-1.jpg" alt="" />
													</div>
													<div className="post-comt-box">
														<form method="post" onSubmit={(e)=> {e.preventDefault(); handleCommentSubmit(post._id)}}>
															<textarea placeholder="Post your comment" onChange={(e)=> setCommentInput(e.target.value)}>
                              </textarea>

															<button type="submit" className='btn btn-success bg-success' style={{cursor: 'pointer'}}>Post Comments</button>
														</form>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>

								</div>
								</div>
								 ))}

								{/* Post End */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
   </>
  )
}

export default Post
