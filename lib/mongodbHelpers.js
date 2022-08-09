const createPost = (content, author) => {
  return {
    content,
    author: author,
    creationDate: Date.now(),
    likes: [],
  };
};

export { createPost };
