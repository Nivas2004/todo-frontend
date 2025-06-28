import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Stored token:", token);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { headers });
      setTasks(res.data);

      // 🔔 Browser notification for due tasks
      const today = new Date().toISOString().split("T")[0];
      res.data.forEach((task) => {
        if (
          task.dueDate &&
          task.status !== "completed" &&
          new Date(task.dueDate).toISOString().split("T")[0] === today
        ) {
          if (Notification.permission === "granted") {
            new Notification("📌 Reminder", {
              body: `Task "${task.title}" is due today!`,
            });
          }
        }
      });
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        {
          title,
          dueDate,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
        { headers }
      );
      setTitle("");
      setDueDate("");
      setTags("");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, { headers });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`,
        { title: editText },
        { headers }
      );
      setEditingId(null);
      setEditText("");
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };

  const markDone = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`,
        { status: "completed" },
        { headers }
      );
      fetchTasks();
    } catch (err) {
      console.error("❌ Error marking task as done:", err.message);
    }
  };

  // ✅ New: Improved logout handler
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload(); // 🔄 Ensures full state reset
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-panel">
        <div className="dashboard-header">
          <h1>📋 My Tasks</h1>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="task-form">
          <input
            type="text"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="e.g. work,urgent"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button onClick={createTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            tasks.map((task) => {
              const isOverdue =
                task.dueDate &&
                new Date(task.dueDate) < new Date() &&
                task.status !== "completed";

              return (
                <li
                  key={task._id}
                  className={`task-card fade-in ${task.status === "completed" ? "completed" : ""}`}
                >
                  {editingId === task._id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <div>
                      <h3 style={{ color: isOverdue ? "red" : "inherit" }}>
                        {task.title}
                      </h3>

                      <p>
                        {task.status === "completed" ? (
                          <span className="status-completed">✅ Completed</span>
                        ) : (
                          <>Status: {task.status} | Priority: {task.priority}</>
                        )}
                      </p>

                      {task.dueDate && (
                        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                      )}
                      {isOverdue && (
                        <p style={{ color: "red", fontWeight: "bold" }}>
                          ⚠ Overdue
                        </p>
                      )}
                      {task.tags && task.tags.length > 0 && (
                        <p>Tags: {task.tags.join(", ")}</p>
                      )}
                      {task.status !== "completed" && (
                        <button onClick={() => markDone(task._id)}>✔ Done</button>
                      )}
                    </div>
                  )}

                  <div className="task-actions">
                    {editingId === task._id ? (
                      <button onClick={() => saveEdit(task._id)}>Save</button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(task._id);
                          setEditText(task.title);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
