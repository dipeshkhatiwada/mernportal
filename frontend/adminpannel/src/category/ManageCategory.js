import React, { useState, useEffect } from 'react';
import Base from '../component/Base';
import { isAuthenticated } from '../auth/helper';
import { getCategories } from './helper/adminapicall';

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
  console.log(categories);
  useEffect(() => {
    preload();
  }, []);
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
                                <td>{index}</td>
                                <td>{category.title}</td>
                                <td>{category.slug}</td>
                                <td>{category.rank}</td>
                                <td>Create</td>
                                <td>
                                  <div className="badge badge-success badge-shadow">Completed</div>
                                </td>
                                <td><a href="/" className="btn btn-primary">Detail</a></td>
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