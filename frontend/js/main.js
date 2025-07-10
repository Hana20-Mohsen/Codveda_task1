import axios from "https://esm.sh/axios";
const square_plus = document.getElementById('square-plus');
const closeFormIcon= document.getElementById('closeForm')
const addPostSection = document.getElementById('add-post-section');
const postsSection= document.getElementById('posts');
const postsForm= document.getElementById('postsForm').childNodes;
console.log(postsForm);
const postTitle=document.getElementById('postTitle')
const postContent=document.getElementById('postContent')
const postPrivacy=document.getElementById('postPrivacy')
const popUpClose = document.getElementById('popUpClose')


const postFormBtn= document.getElementById('postFormBtn');



const api=axios.create({
    baseURL:'http://localhost:8000/api',
    withCredentials:true,
})

const getPosts=function(){
api.get('/posts/all').then(res=>{
    console.log(res.data.posts);
    postsSection.innerHTML = '';
    res.data.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post' , 'p-4', 'd-flex' , 'justify-content-between');
        postElement.innerHTML = `
            <div class=" w-70">
            <h2>${post.title}</h2>
            <h4 class="font-normal ">${post.content}</h4>
            </div>
            <div class=" w-30 d-flex justify-content-center s-4 pt-3">
            <i class="fa-solid fa-pen me-2 cursor"></i>
            <i class="fa-solid fa-trash cursor"></i>
            </div>
        `;
        const post_container= document.createElement('div')
        post_container.classList.add('posts-container' , 'round-border'  );
        post_container.appendChild(postElement);
        postsSection.appendChild(post_container);
    });
    
}).catch(err=>{
    console.error(err);
})
}
getPosts();




square_plus.addEventListener('click' , ()=>{
    
    addPostSection.classList.add('d-flex');
    addPostSection.classList.remove('d-none');
})

const closePostsForm=function(){
 addPostSection.classList.add('d-none');
    addPostSection.classList.remove('d-flex');
}
closeFormIcon.addEventListener('click' , ()=>{
   closePostsForm()
})

popUpClose.addEventListener('click' , ()=>{
    popUpSection.classList.remove('d-block')
    popUpSection.classList.add('d-none');
    // popUpSection.classList.remove('')
})

let title='';
let content='';
let privacy='';
postTitle.addEventListener('input' , (e)=>{
     console.log(e.target.value);
    title=e.target.value;
})
postContent.addEventListener('input' , (e)=>{
    console.log(e.target.value);
    
    content=e.target.value;
})
postPrivacy.addEventListener('click' , (e)=>{
     console.log(e.target.value);
    privacy=e.target.value;
})
postFormBtn.addEventListener('click' ,async function (e){
    e.preventDefault();
    api.post('/posts/add' , {title , content , privacy}).then(res=>{
        closePostsForm()
        getPosts()
        if(res.data.status=='success'){
            setTimeout(() => {
      popUpSection.classList.remove('d-none')
      popUpSection.classList.add('d-block')
    }, 500);
            
        }
        
    }).catch(err=>{
        console.error(err)
    })
    
} )