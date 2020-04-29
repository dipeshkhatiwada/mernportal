import React, { useState, useEffect } from 'react';
import CKEditor from 'ckeditor4-react';
import { isAuthenticated } from '../auth/helper';
import Base from '../component/Base';
import { createCategory, getCategories } from '../category/helper/adminapicall';
import Loader from '../component/Loader';
import Messages from '../component/Messages';
const AddPost = () => {
  const {user,token} = isAuthenticated();
  const [values, setValues] = useState({
      name: "",
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
     name, slug, photo, rank, description, status, main,
     categories, category, loading, error, success, getaRedirect
    } = values;
  const handleChange = name => event => {
    // console.log(event);
    setValues({...values,error:false, [name]:event.target.value});
  };
  const onEditorChange = ( evt ) => {
    setValues( {...values, description: evt.editor.getData() } );
  }
  const preload= () => {
    getCategories().then(data =>{
        // console.log(data);
        if(data.error){
            setValues({...values, error:data.error});
        }else{
            setValues({...values, categories:data, formData: new FormData() });
        }
    })
  }
  useEffect(() => {
    preload();
  }, []);

  const slugify = ()=>{
    var slug = name;
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
              name: "",
              slug: "",
              rank: 1,
              status: "true",
              main: "false",
              loading:false,
              success:"Post created successfully"
          })
      }
    })
  }
  const createPostForm = ()=>(
    <form  method="POST" className="needs-validation" noValidate encType="multipart/form-data">
       <div className="form-group">
        <label className="col-form-label col-12 ">Category</label>
        <select
        onChange={handleChange("category")}
        className="form-control select2"
        placeholder="Category"
        >
        <option value="hello">Select Category</option>
        {categories && 
        categories.map((cat, index) => (
            <option key={index} value={cat._id}>{cat.title}</option>
        ))
        }
        </select>
    </div>
      <div className="form-group">
        <label className="col-form-label col-12 ">Name</label>
        <input type="text" onKeyUp={slugify} onChange={handleChange("name")} value={name} className="form-control my-3" autoFocus required placeholder="Enter name" />
        <div className="invalid-feedback">
          Please enter category name
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
        <label className="col-form-label col-12 ">photo</label>
        <input type="file" onChange={handleChange("photo")} value={photo} className="form-control my-3" required placeholder="Enter photo" />
        <div className="invalid-feedback">
          Please enter category photo
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
        <label className="col-form-label col-12 ">description</label>
        <CKEditor data={description} onChange={onEditorChange} />
          {JSON.stringify(values)}
        {/* <textarea onChange={handleChange("description")} value={description} className="form-control my-3" required placeholder="Enter description" ></textarea> */}
        <div className="invalid-feedback">
          Please enter description
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