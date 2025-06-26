const Task = require("../models/Task");

async function getTasks(req, res) {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(500).json({ error: "Something went wrong" }));
}

async function addTask(req, res) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to save task" });
  }
}

async function toggleTask(req, res) {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.done = !task.done;
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle task" });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
