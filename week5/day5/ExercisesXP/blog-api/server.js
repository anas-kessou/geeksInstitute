
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let posts = [
  { id: 1, title: "First Post", content: "This is my first blog post" },
  { id: 2, title: "Second Post", content: "Learning Express is fun!" },
];


app.get('/posts', (req, res) => {
  res.json(posts);
});


app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});


app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json(post);
});

app.delete('/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Post deleted successfully" });
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
