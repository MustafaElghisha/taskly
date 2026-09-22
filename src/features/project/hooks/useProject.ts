import { Project } from "@/types";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProject } from "../actions/getProject";

const useProject = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    async function fetchProject() {
      setProject(null);
      try {
        const project = await getProject(projectId as string);
        setProject(project);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  return { project, loading };
};

export { useProject };
