class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }
  //SHOW POSTS -WILL LOAD AS WE POST IT
  showPosts(posts) {
    let output = '';
      posts.forEach((post) => {
        output += `
        <div class="card mb-2" style="max-width: 50rem;">
        <div class="card-body">
          <h5 class="card-header">${post.title}</h5>
          <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"><i class="fas fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}"><i class="fas fa-trash-alt"></i>
            </a>
            </div>
          </div>
        </div>
          `
        });
       this.post.innerHTML = output;
    }

    //SHOW ALERT MESSAGE
    showAlert(message, className) {
       this.clearAlert();
        const div = `<div class="${className}">${message}</div>`
       this.post.insertAdjacentHTML('beforebegin', div);
       setTimeout(() => {
           this.clearAlert();
       }, 2000);
 
   }

  //CLEAR ALERT / REMOVING IT SO IT IS NOT SHOWN AFTER IT APEARS
    clearAlert(){
      const currentAlert = document.querySelector('.alert');
      if(currentAlert){
        currentAlert.remove();
      }
    }
  //CLEAR FIELDS/TEXT
    clearFields(){
      this.titleInput.value= '';
      this.bodyInput.value= '';
    }

  //FILL FORM TO EDIT
fillForm(data){
  this.titleInput.value = data.title;
  this.bodyInput.value = data.body;
  this.idInput.value = data.id;
  const button = document.querySelector(".post-cancel");
  if (!button){
     this.changeFormState('edit');
  }
 
}
  //CLEAR ID HIDDEN VALUE
clearIdInput(){
  this.idInput.value = '';
}

  //CHANGE FORM STATE -THIS FUNCTION WILL ALLOWE TO CHANGE THE BUTTON TEXT SO CAN UPDATE THE POST
changeFormState(type){
  if(type === 'edit'){
this.postSubmit.textContent = '< UPDATE POST >'
this.postSubmit.className = 'post-submit btn btn-info btn-block';
//CREATE A CANCEL BUTTON 
 const button = document.createElement('button');
 button.className = 'post-cancel btn btn-light btn-block';
 button.appendChild(document.createTextNode('Cancel Edit'))
 //GET THE PARENT TO INSERT IT INTO THE DOM
 const cardForm = document.querySelector('.card-form');
 //GET THE ELEMENT TO INSERT BEFORE
 const formEnd = document.querySelector('.form-end');
 //INSERT CANCEL BUTTON
 cardForm.insertBefore(button, formEnd);
}  else {
this.postSubmit.textContent = '^^ POST !T ^^'
this.postSubmit.className = 'post-submit btn btn-primary btn-block';
  //REMOVE CANCEL BUTTON IF IS THERE
if(document.querySelector('.post-cancel')){
  document.querySelector('.post-cancel').remove();
}
  //CLEAR ID FROM HIDDEN FIELDS
this.clearIdInput();
  //CLEAR FIELDS
this.clearFields();
  }
}

}

export const ui = new UI();
    