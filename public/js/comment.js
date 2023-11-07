// SUBMIT NEW COMMENT VIA API
// Request function
const newCommentHandler = async (event) => {  
    const body = bodyInput.value.trim(); 

    const path = window.document.URL.split("?");
    const folderArray = path[0].split("/");
    const post_id = folderArray[folderArray.length-1];
  
    if (body && post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setTimeout(() => {
          window.location.reload;
      }, 1000);
      } else {
        alert('Failed to submit comment');
      }
    }
  };

// NEW COMMENT SUBMISSION FORM -- ADD HTML TO PAGE
// Create elements
const formContainer = document.createElement("div");
    formContainer.classList.add("card-container","w-100","border","p-3"); 

const form = document.createElement("form");    

const bodyGroup = document.createElement("div");
    bodyGroup.classList.add("form-group"); 

const bodyInput = document.createElement("textarea");    
    bodyInput.classList.add("form-control"); 
    bodyInput.id = "body-input";
    bodyInput.placeholder = "Let us know what you think..."
    bodyInput.setAttribute("oninput",`this.style.height = "";this.style.height = this.scrollHeight + "px"`);
    
const formBreak2 = document.createElement("br")    

const buttonDiv = document.createElement("div")
    buttonDiv.classList.add("w-100","d-flex", "justify-content-center")

const submitButton = document.createElement("button");    
    submitButton.type = "click";
    submitButton.classList.add("btn", "btn-info", "btn-block", "w-75"); 
    submitButton.textContent = "Add new comment"
    submitButton.id = "submit-button"

// Function to add elements to page    
const newComment = () => {
    commentContainer = document.querySelector("#new-comment-container")
    commentContainer.appendChild(formContainer);
    formContainer.appendChild(form);
    form.appendChild(bodyGroup);
    bodyGroup.appendChild(bodyInput);
    form.appendChild(formBreak2);
    form.appendChild(buttonDiv);
    buttonDiv.appendChild(submitButton);

    // Hide Create button
    newCommentButton = document.querySelector("#new-comment")
    newCommentButton.style.display = "none"

    // Add API request function to button
    submitButton.addEventListener('click', newCommentHandler);
}    

// Fire handler function upon button click
document.querySelector('#new-comment').addEventListener('click', newComment);


