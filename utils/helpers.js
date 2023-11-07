module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    post_href_concat: (post_id) => {
      let root = "/post/";
      return root.concat(post_id);
    },
    edit_href_concat: (post_id) => {
      let root = "/post/";
      let end = "/edit"
      return root.concat(post_id).concat(end);
    }
  };