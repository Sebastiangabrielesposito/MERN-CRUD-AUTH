import Task from "../models/tasks.model.js";

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function createTasks(req, res) {
  try {
    const { title, description, date } = req.body;
    // console.log(req.body);
    // console.log(req.user.id);

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const saveTask = await newTask.save();
    res.json(saveTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getTask(req, res) {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteTasks(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
export async function updateTasks(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
