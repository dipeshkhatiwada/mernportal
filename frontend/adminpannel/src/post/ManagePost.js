import React, { useState, useEffect } from 'react';
import Base from '../component/Base';
import { isAuthenticated } from '../auth/helper';
import { getPosts, deletePost } from './helper/adminapicall';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getPosts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThispost = postId => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deletePost(postId, user._id, token)
        .then(data => {
          if (data.error) {
            console.log(data.error);
          }else{
            swal('Poof! Your post has been deleted successfully!', {
              icon: 'success',
            });
            preload();
          }
        })
      } else {
        swal('Your post is safe!');
      }
    });
  };


  return (
    <Base>
        <div className="row">
          <div className="col-12">
          <div className="card">
                  <div className="card-header">
                    <h4>List of Posts</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Rank</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, index) => {
                            return(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{post.name}</td>
                                <td>
                                  {post.photo?(
                                  <img src={`http://localhost:8000${post.photo}`} alt="postphoto" height="100" width="200px" />
                                  ):(
                                   <span>No Photo</span> 
                                  )}
                                </td>
                                <td>{post.rank}</td>
                                <td>
                                {post.status?(
                                    <div className="badge badge-success badge-shadow">Active</div>
                                  ) :(
                                    <div className="badge badge-warning badge-shadow">Deactive</div>
                                  )}
                                </td>
                                <td>
                                <Link className="btn btn-info" to={`/admin/post/detail-${post._id}`} title="View Details" >
                                    <i className="fa fa-eye"></i>
                                  </Link>
                                  <button onClick={() => { deleteThispost(post._id); }} className="btn btn-danger" title="Delete"><i className="fa fa-trash"></i></button> &nbsp; 
                                  <Link className="btn btn-info" to={`/admin/post/update-${post._id}`} title="Edit" >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                </td>
                              </tr>
                            );
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </div>
        </div>

      </Base>
  );
};
export default ManagePost;