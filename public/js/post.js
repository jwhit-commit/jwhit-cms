// Get button to attach event functions, params to send to API
const deleteBtn = document.querySelector("#delete-post")
const folderArray = window.document.URL.split("/");
const post_id = folderArray[folderArray.length-2];

// DELETE post request function
const deletePost = async (event) => {
    let urlString = '/api/posts/';
    urlString = urlString.concat(post_id);

    const response = await fetch(urlString, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setTimeout(() => {
            window.location.replace("/dash");
        }, 700);
      } else {
        alert('Failed to submit comment');
      }
}

// Add request function to button
deleteBtn.addEventListener('click', deletePost)


//UPDATE POST
// Request function
const editPostHandler = async (event) => {
    const title = subtitleInput.value.trim();
    const body = subbodyInput.value.trim();

    let urlString = '/api/posts/';
    urlString = urlString.concat(post_id);

    const response = await fetch(urlString, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // setTimeout(() => {
        //     window.location.replace("/dash");
        // }, 1000);
      } else {
        alert('Failed to submit comment');
      }
}

// // Get post data
// const postLookup = async () => {
//     let urlString = '/api/posts/';
//     urlString = urlString.concat(post_id);

//     try {
//         var results = await fetch(urlString, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         var post = await results.json()
//         // post = jsonResults.results;
//         return post;
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

// const postData = postLookup();

// // Create elements of Update form
// const subformContainer = document.createElement("div");
//     subformContainer.classList.add("card-container","w-100","border","p-3"); 

// const subform = document.createElement("form");    

// const subtitleGroup = document.createElement("div");
//     subtitleGroup.classList.add("form-group"); 

// const subtitleInput = document.createElement("input");    
//     subtitleInput.classList.add("form-control"); 
//     subtitleInput.id = "title-input";
//     subtitleInput.placeholder = "Article Title";
//     subtitleInput.textContent = postData.title;

// const subformBreak = document.createElement("br")    

// const subbodyGroup = document.createElement("div");
//     subbodyGroup.classList.add("form-group"); 

// const subbodyInput = document.createElement("textarea");    
//     subbodyInput.classList.add("form-control"); 
//     subbodyInput.id = "body-input";
//     subbodyInput.placeholder = "Great ideas start here..."
//     subbodyInput.setAttribute("oninput",`this.style.height = "";this.style.height = this.scrollHeight + "px"`);
//     subbodyInput.textContent = postData.body;
    
// const subformBreak2 = document.createElement("br")    

// const subbuttonDiv = document.createElement("div")
//     subbuttonDiv.classList.add("w-100","d-flex", "justify-content-center")

// const subsubmitButton = document.createElement("button");    
//     subsubmitButton.type = "click";
//     subsubmitButton.classList.add("btn", "btn-info", "btn-block", "w-75"); 
//     subsubmitButton.textContent = "Create new article"
//     subsubmitButton.id = "submit-button"

// // Function to add elements to page    
// const editPost = () => {
//     subeditContainer = document.querySelector("#edit-post-container")
//     subeditContainer.appendChild(subformContainer);
//     subformContainer.appendChild(subform);
//     subform.appendChild(subtitleGroup);
//     subtitleGroup.appendChild(subtitleInput);
//     subform.appendChild(subformBreak);
//     subform.appendChild(subbodyGroup);
//     subbodyGroup.appendChild(subbodyInput);
//     subform.appendChild(subformBreak2);
//     subform.appendChild(subbuttonDiv);
//     subbuttonDiv.appendChild(subsubmitButton);

//     // Hide buttons and post card
//     editBtn.style.display = "none";
//     deleteBtn.style.display = "none";
//     postCard = document.querySelector("post-container");
//     postCard.style.display = "none";

    // Add API request function to button
    subsubmitButton.addEventListener('click', editPostHandler);
// }    

// // Fire handler function upon button click
// editBtn.addEventListener('click', editPost);
