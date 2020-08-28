
// USING AXIOS library for XMLHttpRequest
const btn = document.getElementById("btn");
const postTemplate = document.getElementById("single-post");
const listElement = document.querySelector(".posts");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");
//xhr.responseType = 'json';
// btn.addEventListener('click',()=>{
//   //console.log("pressed");
//   xhr.onload = function (){
//     // console.log(xhr.response);
//     const listOfPost = JSON.parse(xhr.response);
//     console.log(listOfPost);
//   };
// });


// function httpGetAsync(method, url, data){
//   //USING XMLHttpRequest
//   // const promise = new Promise((resolve, reject)=>{
//   //   const xhr = new XMLHttpRequest();
//   //   xhr.responseType = 'json';
//   //   xhr.open(method,url);
//   //   xhr.onload =  ()=> {
//   //     //console.log(xhr.response);
//   //     if(xhr.status >= 200 && xhr.status <300){
//   //       resolve(xhr.response);
//   //     }else{
//   //       reject(new Error('Something went wrong'));
//   //     }
//   //
//   //
//   //   };
//   //   xhr.onerror = () =>{
//   //     console.log(xhr.response);
//   //     console.log(xhr.status);
//   //   };
//   //
//   //
//   //   xhr.send(JSON.stringify(data));
//   // });
//   // return promise;
//   return fetch(url,{
//     method: method,
//     // body: JSON.stringify(data),
//     body: data
//     // headers: {
//     //   'Content-Type': 'application/json'
//     // }
//   }).then(response=> {
//     if (response.status >= 200 && response.status < 300){
//       return response.json();
//     } else{
//       return response.json().then(errData => {
//         console.log(errData);
//         throw new Error('Something went wrong on the server side');
//       });
//
//     }
//   }).catch(error=>{
//     console.log(error);
//     throw new Error("Something went wrong");
//   });
// }

async function fetchPosts(){
  try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
       const listOfPost = response.data;
       //const listOfPost = xhr.response;
       //console.log(response);
       for (const post of listOfPost){
         //console.log(post);
         const postEl = document.importNode(postTemplate.content,true);
         postEl.querySelector('h2').textContent= post.title.toUpperCase();
         postEl.querySelector('p').textContent = post.body;
         postEl.querySelector('li').id = post.id;
         listElement.append(postEl);
       }
  }catch (error){
    alert(error.message);
  }


}

async function createPost(title,content){
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId : userId
  };
  const fd = new FormData();
  fd.append('title',title);
  fd.append('body',content);
  fd.append('userId', userId);

  const response = await axios.post('https://jsonplaceholder.typicode.com/posts',post);
  console.log(response);
}

// async function deletePost(id){
//
// }

btn.addEventListener('click',fetchPosts);
form.addEventListener('submit', event =>{
  event.preventDefault();
  const enterTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enterTitle, enteredContent);
});
postList.addEventListener('click',event=>{
  if(event.target.tagName === 'BUTTON'){
    // console.log("pressed delte");
    const postId = event.target.closest('li').id;
    // console.log(postId);
    const response = axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    console.log(response);
  }
});
