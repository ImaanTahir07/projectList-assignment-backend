import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database"
let projects = [
  { id: 1, content: "DIP with Python" },
  { id: 2, content: "FYP with undergrads" },
];

// Generate ID
let nextId = 3;

// CRUD Endpoints

// Read all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Create a project
app.post('/projects', (req, res) => {
  const newProject = {
    id: nextId++,
    content: req.body.content
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Update a project
app.put('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const projectIndex = projects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    content: req.body.content
  };
  
  res.json(projects[projectIndex]);
});

// Delete a project
app.delete('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = projects.length;
  
  projects = projects.filter(p => p.id !== id);
  
  if (projects.length === initialLength) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});