import React, { useState, useEffect } from 'react';
import Base from '../component/Base';
import { isAuthenticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = categoryId => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Category!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
          if (data.error) {
            console.log(data.error);
          }else{
            swal('Poof! Your category has been deleted successfully!', {
              icon: 'success',
            });
            preload();
          }
        })
      } else {
        swal('Your Category is safe!');
      }
    });
  };


  return (
    <Base>
        <div className="row">
          <div className="col-12">
          <div className="card">
                  <div className="card-header">
                    <h4>Basic DataTables</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Rank</th>
                            <th>Menu Display</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {categories.map((category, index) => {
                            return(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{category.title}</td>
                                <td>{category.slug}</td>
                                <td>{category.rank}</td>
                                <td>
                                  {category.menu?(
                                    <div className="badge badge-success badge-shadow">Active</div>
                                  ) :(
                                    <div className="badge badge-warning badge-shadow">Deactive</div>
                                  )}
                                </td>
                                <td>
                                {category.status?(
                                    <div className="badge badge-success badge-shadow">Active</div>
                                  ) :(
                                    <div className="badge badge-warning badge-shadow">Deactive</div>
                                  )}
                                </td>
                                <td>
                                  <button onClick={() => { deleteThisCategory(category._id); }} className="btn btn-danger" title="Delete"><i className="fa fa-trash"></i></button> &nbsp; 
                                  <Link className="btn btn-info" to={`/admin/category/update-${category._id}`} title="Edit" >
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
export default ManageCategory;