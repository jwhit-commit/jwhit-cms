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
if (!deleteBtn) {} else {deleteBtn.addEventListener('click', deletePost)}

