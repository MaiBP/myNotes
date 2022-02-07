import { http } from './http';
import { ui } from './ui';

//GETTING THE POSTS ON DOM LOAD
document.addEventListener('DOMContentLoaded', getPosts);

//LISTEN FOR ADD POST
document.querySelector('.post-submit').addEventListener('click', submitPost);

//LISTEN FOR DELETE
document.querySelector('#posts').addEventListener('click', deletePost);

//LISTEN FOR EDIT STATE
document.querySelector('#posts').addEventListener('click', enableEdit);

//LISTEN FOR CANCEL EDIT
document.querySelector('.card-form').addEventListener('click', cancelEdit);

//GET POSTS
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then((data) => ui.showPosts(data))
  .catch((err) => console.log(err));
}

//SUBMIT POST
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
  const data = {
    title,
    body
    }
//VALIDATE INPUT
  if(title === '' || body === '' ){
    ui.showAlert('Please add fields', 'alert alert-danger');
//CHECK FOR ID
  } else {
    if(id === ''){
//CREATE POST
    http.post('http://localhost:3000/posts', data)
    .then((data) => {
      ui.showAlert("Post added!","alert alert-dismissible alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch((err) => console.log(err));
  } else {
//UPDATE POST
    http.put(`http://localhost:3000/posts/${id}`, data)
    .then((data) => {
      ui.showAlert("Post updated!","alert alert-dismissible alert-success");
      ui.changeFormState('add');
      getPosts();
    })
    .catch((err) => console.log(err));
  }
}
}
//DELETE POST
function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post Removed...', 'alert alert-dismissible alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}

//ENABLE EDIT STATE -- if we console.log(e.target) we get the pencil class and we have to go to the parent element, that is the link!
function enableEdit(e){
  console.log(e.target);
 if(e.target.parentElement.classList.contains('edit')){
   const id = e.target.parentElement.dataset.id;
   const body = e.target.parentElement.previousElementSibling.textContent;
   const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
  const data = {
    id,
    title,
    body
  }
   ui.fillForm(data);
 }
 e.preventDefault();
}
//CANCEL EDIT STATE
function cancelEdit(e){
 if(e.target.classList.contains('post-cancel')){
   ui.changeFormState('add');
 }
 e.preventDefault();
}
