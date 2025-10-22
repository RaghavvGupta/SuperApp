const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Post creation function
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });

  try {
    const post = await prisma.post.create({
      data: { title, content, authorId: req.user.id },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetching post with ID function
exports.getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: true },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Updating post function
exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  const id = Number(req.params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized action" });

    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deleting function post
exports.deletePost = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized action" });

    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
