const API = "http://127.0.0.1:8000/api";



// CATEGORY call
export const createCategory = (userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category['values'])
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
};

// GET ALL CATEGORIES
export const getCategories = ()=>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

// get a CATEGORY
export const getCategory = categoryId=>{
    return fetch(`${API}/catgeory/${categoryId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};

// delete a CATEGORY
export const deleteCategory =(categoryId,userId, token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
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

// update a CATEGORY
export const updateCategory =(categoryId, userId, token, category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};