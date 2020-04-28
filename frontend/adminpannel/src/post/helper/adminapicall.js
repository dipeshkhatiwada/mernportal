const API = "http://127.0.0.1:8000/api";



// post call
export const createPost = (userId,token,post)=>{
    return fetch(`${API}/post/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
};

// GET ALL Posts
export const getPosts = ()=>{
    return fetch(`${API}/posts`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

// get a post
export const getPost = postId=>{
    return fetch(`${API}/post/${postId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

// delete a post
export const deletePost =(postId,userId, token)=>{
    return fetch(`${API}/post/${postId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

// update a post
export const updatePost =(postId, userId, token, post)=>{
    return fetch(`${API}/post/${postId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    .then(response=>{
        console.log("RES",response)
        return response.json()
    })
    .catch(err=>console.log(err))
};