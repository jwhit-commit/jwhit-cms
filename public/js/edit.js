// Get button to attach event functions, page elements+params to send to API
const submitButton = document.querySelector("#submit-button");
const folderArray = window.document.URL.split("/");
const post_id = folderArray[folderArray.length-2];
const titleInput = document.querySelector("#title-input");
const bodyInput = document.querySelector("#body-input");

//UPDATE POST
// Request function
const editPostHandler = async (event) => {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

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
            window.location.replace("/dash");
      } else {
        alert('Failed to submit comment');
      }
}

// Add API request function to button
submitButton.addEventListener('click', editPostHandler);