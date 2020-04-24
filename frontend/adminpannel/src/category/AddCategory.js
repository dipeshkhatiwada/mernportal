import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../component/Base';

const AddCategory = () => {
  return (
      <Base>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Add new Category</h4>
              </div>
              <div className="card-body">
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Title</label>
                  <div className="col-sm-12 col-md-7">
                    <input type="text" className="form-control"/>
                  </div>
                </div>
                <div className="card-body">
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">Slug</label>
                  <div className="col-sm-12 col-md-7">
                    <input type="text" className="form-control"/>
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                  <div className="col-sm-12 col-md-7">
                    <button className="btn btn-primary">Create Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

      </Base>
  );
}
export default AddCategory;