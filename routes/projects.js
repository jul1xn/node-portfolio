const express = require('express');
const router = express.Router();
const projects = require('../projects');
const path = require('path');

router.get('/', (req, res) => {
  res.render('projects');
});

router.get('/:name', (req, res) => {
  const projectName = req.params.name;
  return res.render('project', { name: projectName });
});

router.get('/api/all', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const projectList = await projects.getAllProjectsByPage(page);
  if (projectList) {
    res.json(projectList);
  } else {
    res.status(404).json({ error: 'No projects found' });
  }
});

router.get('/api/preview', async (req, res) => {
  const projectList = await projects.getAllProjectsByOffset(0, 9);
  if (projectList) {
    res.json(projectList);
  } else {
    res.status(404).json({ error: 'No projects found' });
  }
});

router.get('/api/:name', async (req, res) => {
  const projectName = req.params.name;
  const projectData = await projects.getProject(projectName);
  if (projectData) {
    res.json(projectData);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

router.get('/api/:name/short', async (req, res) => {
  const projectName = req.params.name;
  console.log(projectName);
  const projectData = await projects.getProjectShort(projectName);
  if (projectData) {
    res.json(projectData);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

router.get('/api/:name/:file', (req, res) => {
  const projectName = req.params.name;
  const fileName = req.params.file;
  const filePath = path.resolve('./', 'projecten', projectName, fileName);
  if (filePath) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'File not found in project' });
  }
});

module.exports = router;