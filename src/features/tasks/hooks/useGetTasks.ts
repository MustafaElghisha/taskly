import { useEffect, useState } from "react";
import { Task } from "../schemas/taskSchema";
import { getTasks } from "../actions/getTasks";
import { TaskStatus } from "../constants/tasks";

const useGetTasks = (projectId: string, status: TaskStatus) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await getTasks(projectId, status);
        setTasks(res.tasks);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, status]);

  return { tasks, loading, error };
};

export { useGetTasks };
