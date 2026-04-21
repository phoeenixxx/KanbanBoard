import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, MoreHorizontal } from "lucide-react";
import { useKanbanStore } from "../store/useKanbanStore";
import TaskCard from "./TaskCard";

export default function ColumnContainer({ column, tasks }: any) {
  const { addTask, updateColumn } = useKanbanStore() as any;
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: { type: "Column", column }
  });

  const style = { transition, transform: CSS.Translate.toString(transform) };

  if (isDragging) return <div ref={setNodeRef} style={{ ...style, opacity: 0.4 }} className="column-wrapper" />;

  return (
    <div ref={setNodeRef} style={style} className="column-wrapper">
      <div {...attributes} {...listeners} className="column-header">
        <input value={column.title} onChange={(e) => updateColumn(column.id, e.target.value)} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.5 }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>{tasks.length}</span>
          <MoreHorizontal size={18} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SortableContext items={tasks.map((t: any) => t.id)}>
          {tasks.map((task: any) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
      </div>
      <button className="add-task-btn" onClick={() => addTask(column.id)}>
        <Plus size={18} />
        <span>Add Task</span>
      </button>
    </div>
  );
}