const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Our collection of 5 "tareas" (todos)
const tareas = [
  { id: 1, title: 'Tarea 1: Reiniciar la computadora', completed: false },
  { id: 2, title: 'Tarea 2: Eliminar archivos temporales', completed: false },
  { id: 3, title: 'Tarea 3: Cambiar la configuración inicial', completed: false },
  { id: 4, title: 'Tarea 4: Actualizar el sistema operativo', completed: false },
  { id: 5, title: 'Tarea 5: Instalar software adicional', completed: false },
];

// API Endpoints
app.get('/api/tareas', (req, res) => {
  res.json(tareas.map((tarea) => ({ id: tarea.id, title: tarea.title })));
});

app.get('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    res.status(404).json({ message: 'Tarea no encontrada' });
  } else {
    res.json(tarea);
  }
});

app.post('/api/tareas', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    title: req.body.title,
    completed: false,
  };
  tareas.push(nuevaTarea);
  res.json(nuevaTarea);
});

app.put('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    res.status(404).json({ message: 'Tarea no encontrada' });
  } else {
    tarea.title = req.body.title;
    tarea.completed = req.body.completed;
    res.json(tarea);
  }
});

app.delete('/api/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Tarea no encontrada' });
  } else {
    tareas.splice(index, 1);
    res.json({ message: 'Tarea eliminada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});