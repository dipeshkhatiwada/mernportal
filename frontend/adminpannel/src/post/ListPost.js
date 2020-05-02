import React, { useState, useEffect } from 'react';
import Base from '../component/Base';
import { isAuthenticated } from '../auth/helper';
import { deletePost, getPost } from './helper/adminapicall';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';

const ListPost = ({match}) => {
  const [post, setPost] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = postId => {
    getPost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPost(data);
      }
    });
  };
  useEffect(() => {
    preload(match.params.postId);
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
        console.log("bfjkad");
        swal('Your post is safe!');
        return (<Redirect to='/'/>)
      }
    });
  };
  return (
    <Base>
        <div className="row">
          <div className="col-12">
          <div className="card">
                  <div className="card-header">
                    <h4>List of Post</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th className="text-center">Attribute</th>
                            <th >Value</th>
                          </tr>
                          
                        </thead>
                        <tbody>
                          <tr>
                            <th>1.</th>
                            <th className="text-center">Category</th>
                            <td>{post.category && post.category.title}</td>
                          </tr>
                          <tr>
                            <th>2.</th>
                            <th className="text-center">Name</th>
                            <td>{post.name}</td>
                          </tr>
                          <tr>
                            <th>3.</th>
                            <th className="text-center">Slug</th>
                            <td>{post.slug}</td>
                          </tr>
                          <tr>
                            <th>4.</th>
                            <th className="text-center">Rank</th>
                            <td>{post.rank}</td>
                          </tr>
                          <tr>
                            <th>5.</th>
                            <th className="text-center">Photo</th>
                            <td>
                              {post.photo?(
                              <img src={`http://localhost:8000${post.photo}`} alt="postphoto" height="100" width="200px" />
                              ):(
                                <h3 className="text text-warning">No Photo</h3> 
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>6.</th>
                            <th className="text-center">Description</th>
                            <td>
                              <div dangerouslySetInnerHTML={{ __html: post.description }}></div>
                            </td>
                          </tr>
                          <tr>
                            <th>7.</th>
                            <th className="text-center">View Count</th>
                            <td>{post.view_count}</td>
                          </tr>
                          <tr>
                            <th>8.</th>
                            <th className="text-center">Status</th>
                            <td>
                              {post.status?(
                                <div className="badge badge-success badge-shadow">Active</div>
                              ) :(
                                <div className="badge badge-warning badge-shadow">Deactive</div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>9.</th>
                            <th className="text-center">Main</th>
                            <td>
                              {post.main?(
                                <div className="badge badge-success badge-shadow">Active</div>
                              ) :(
                                <div className="badge badge-warning badge-shadow">Deactive</div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>10.</th>
                            <th className="text-center">Action</th>
                            <td>
                              <button onClick={() => { deleteThispost(post._id); }} className="btn btn-danger" title="Delete"><i className="fa fa-trash"></i></button> &nbsp; 
                              <Link className="btn btn-info" to={`/admin/post/update-${post._id}`} title="Edit" >
                                <i className="fa fa-edit"></i>
                              </Link>
                            </td>
                          </tr>
                          
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
export default ListPost;