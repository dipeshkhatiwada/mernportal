import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../component/Base';
import { createCategory, getCategories } from './helper/adminapicall';
import Loader from '../component/Loader';
import Messages from '../component/Messages';
const AddPost = () => {
  const {user,token} = isAuthenticated();
  const [values, setValues] = useState({
      title: "",
      slug: "",
      photo:"",
      rank: 1,
      description: "",
      status: "true",
      main: "false",
      categories:[],
      category:"",
      loading:false,
      error:"",
      success:"",
      getaRedirect:false,
  });
  const {
     title, slug, photo, rank, description, status, main,
     categories, category, loading, error, success, getaRedirect
    } = values;
  const handleChange = name => event => {
    setValues({...values,error:false, [name]:event.target.value});
  };
  const preload= () => {
    getCategories().then(data =>{
        // console.log(data);
        if(data.error){
            setValues({...values, error:data.error});
        }else{
            setValues({...values, categories:data, formData: new FormData() });
            console.log("CAT", categories);
        }
    })
  }
  useEffect(() => {
    preload();
  }, []);

  const slugify = ()=>{
    var slug = title;
    slug = slug.toLowerCase();
    var regExp = /\s+/g;
    slug = slug.replace(regExp,'-');
    setValues({...values, slug: slug});
  }
  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values, error:"", loading:true })
    // backend request call
    createCategory(user._id,token,{values})
    .then(data=>{
      if(data.error){
          setValues({...values, error: data.error})
      }else{
          setValues({
              ...values,
              title: "",
              slug: "",
              rank: 1,
              status: "true",
              main: "false",
              loading:false,
              success:"Category created successfully"
          })
      }
    })
  }
  const createPostForm = ()=>(
    <form  method="POST" className="needs-validation" noValidate>
      <div className="form-group">
        <label className="col-form-label col-12 ">Title</label>
        <input type="text" onKeyUp={slugify} onChange={handleChange("title")} value={title} className="form-control my-3" autoFocus required placeholder="Enter title" />
        <div className="invalid-feedback">
          Please enter category title
        </div>
      </div>
      <div className="form-group">
        <label className="col-form-label col-12 ">Slug</label>
        <input type="text" onChange={handleChange("slug")} value={slug} className="form-control my-3" required placeholder="Enter slug" />
        <div className="invalid-feedback">
          Please enter category slug
        </div>
      </div>
      <div className="form-group">
        <label className="col-form-label col-12 ">Rank</label>
        <input type="number" onChange={handleChange("rank")} value={rank} className="form-control my-3" required placeholder="Enter rank" />
        <div className="invalid-feedback">
          Please enter rank
        </div>
      </div>
      
      <div className="form-group">
        <label className="col-form-label col-12 ">Main</label>
        <div className="pretty p-icon p-smooth mx-4">
          <input type="radio"  name="main" onChange={handleChange("main")} value="true" checked={main === 'true'} />
          <div className="state p-success"> <i className="icon fa fa-check"></i> <label>Active</label> </div>
        </div>
        <div className="pretty p-icon p-smooth">
          <input type="radio" name="main" onChange={handleChange("main")} value="false" checked={main === 'false'}/>
          <div className="state p-danger-o"> <i className="icon fas fa-times"></i> <label>Deactive</label> </div>
        </div>
      </div>
      <div className="form-group">
        <label className="col-form-label col-12 ">Status</label>
        <div className="pretty p-icon p-smooth mx-4">
          <input type="radio"  name="status" onChange={handleChange("status")} value="true" checked={status === 'true'} />
          <div className="state p-success"> <i className="icon fa fa-check"></i> <label>Active</label> </div>
        </div>
        <div className="pretty p-icon p-smooth">
          <input type="radio" name="status" onChange={handleChange("status")} value="false" checked={status === 'false'} />
          <div className="state p-danger-o"> <i className="icon fas fa-times"></i> <label>Deactive</label> </div>
        </div>
      </div>
      <div className="card-footer ">
        <button onClick={onSubmit} className="btn btn-outline-primary mr-1" type="submit">Submit</button>
      </div>
    </form>
  )

  return (
      <Base>
        {Loader(loading)}
        {Messages(success,error)}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Add new Post</h4>
        
              </div>
              <div className="card-body">
                {createPostForm()}
              </div>
            </div>
          </div>
        </div>

      </Base>
  );
}
export default AddPost;