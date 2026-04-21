import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Zap, Bug, BookUser, Flame } from "lucide-react";
import { useKanbanStore } from "../store/useKanbanStore";

export default function TaskCard({ task }: any) {
  const { setSelectedTask } = useKanbanStore() as any;
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "Task", task }
  });

  const style = { transition, transform: CSS.Translate.toString(transform) };

  if (isDragging) return <div ref={setNodeRef} style={{ ...style, opacity: 0.3 }} className="task-card" />;

  return (
    <motion.div 
      layoutId={task.id.toString()} 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      onClick={() => setSelectedTask(task)} 
      className="task-card" 
      whileHover={{ y: -4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px', fontWeight: 600, opacity: 0.6 }}>
        <span>{task.key}</span>
        {task.type === 'bug' ? <Bug size={14} color="#ef4444" /> : task.type === 'story' ? <BookUser size={14} color="#10b981" /> : <Zap size={14} color="#3b82f6" />}
      </div>
      <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '16px' }}>{task.content}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Flame size={14} color={task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'} />
        <div className="assignee-avatar">
          {task.assignee ? task.assignee[0].toUpperCase() : 'U'}
        </div>
      </div>
    </motion.div>
  );
}