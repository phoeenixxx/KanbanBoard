import { useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import './styles/kanban.scss';

export default function App() {
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'https://cdn-icons-png.flaticon.com/512/732/732221.png'; 
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = "Flux Manager Pro";
  }, []);

  return (
    <>
      <KanbanBoard />
      <TaskModal />
    </>
  );
}