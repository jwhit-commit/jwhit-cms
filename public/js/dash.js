// SUBMIT NEW POST VIA API
// Request function
const newPostHandler = async (event) => {
    // event.preventDefault();
  
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
  
    if (title && body) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setTimeout(() => {
            window.location.reload;
        }, 1500);
      } else {
        alert('Failed to submit article');
      }
    }
  };


// NEW POST SUBMISSION FORM -- ADD HTML TO PAGE
// Create elements
const formContainer = document.createElement("div");
    formContainer.classList.add("card-container","w-100","border","p-3"); 

const form = document.createElement("form");    

const titleGroup = document.createElement("div");
    titleGroup.classList.add("form-group"); 

const titleInput = document.createElement("input");    
    titleInput.classList.add("form-control"); 
    titleInput.id = "title-input";
    titleInput.placeholder = "Article Title";

const formBreak = document.createElement("br")    

const bodyGroup = document.createElement("div");
    bodyGroup.classList.add("form-group"); 

const bodyInput = document.createElement("textarea");    
    bodyInput.classList.add("form-control"); 
    bodyInput.id = "body-input";
    bodyInput.placeholder = "Great ideas start here..."
    bodyInput.setAttribute("oninput",`this.style.height = "";this.style.height = this.scrollHeight + "px"`);
    
const formBreak2 = document.createElement("br")    

const buttonDiv = document.createElement("div")
    buttonDiv.classList.add("w-100","d-flex", "justify-content-center")

const submitButton = document.createElement("button");    
    submitButton.type = "click";
    submitButton.classList.add("btn", "btn-info", "btn-block", "w-75"); 
    submitButton.textContent = "Create new article"
    submitButton.id = "submit-button"

// Function to add elements to page    
const newPost = () => {
    postContainer = document.querySelector("#new-post-container")
    postContainer.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(titleGroup);
    titleGroup.appendChild(titleInput);
    form.appendChild(formBreak);
    form.appendChild(bodyGroup);
    bodyGroup.appendChild(bodyInput);
    form.appendChild(formBreak2);
    form.appendChild(buttonDiv);
    buttonDiv.appendChild(submitButton);

    // Hide Create button
    newPostButton = document.querySelector("#new-post")
    newPostButton.style.display = "none"

    // Add API request function to button
    submitButton.addEventListener('click', newPostHandler);
}    

// Fire handler function upon button click
document.querySelector('#new-post').addEventListener('click', newPost);


