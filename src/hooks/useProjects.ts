import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';
import { fetchProjects } from '@/lib/supabaseRest';
import { getPublishedProjects } from '@/data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => getPublishedProjects());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((rows) => {
        if (active) setProjects(rows);
      })
      .catch((error) => console.error('Projeler yüklenemedi:', error))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { projects, loading };
}
