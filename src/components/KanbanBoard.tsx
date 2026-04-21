import { useState, useMemo, useEffect } from "react";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Plus, Search, Moon, Sun, LayoutGrid } from "lucide-react";
import { useKanbanStore } from "../store/useKanbanStore";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function KanbanBoard() {
  const { theme, toggleTheme, columns, tasks, searchQuery, setSearchQuery, addColumn, setColumns, setTasks } = useKanbanStore() as any;
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter((t: any) => t.content.toLowerCase().includes(searchQuery.toLowerCase()) || t.key.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, searchQuery]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  return (
    <div className="flux-app">
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LayoutGrid size={24} color="var(--accent)" />
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Flux Manager</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input className="search-input" style={{ paddingLeft: '40px' }} placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }} onClick={() => addColumn(prompt("Column Name:") || "New Column")}>
            <Plus size={18} /> New Column
          </button>
        </div>
      </nav>

      <div className="board-container">
        <DndContext sensors={sensors} collisionDetection={closestCorners} 
          onDragStart={(e:any) => {
            if (e.active.data.current.type === "Column") setActiveColumn(e.active.data.current.column);
            else setActiveTask(e.active.data.current.task);
          }}
          onDragEnd={(e:any) => {
            setActiveColumn(null); setActiveTask(null);
            if (!e.over || e.active.id === e.over.id) return;
            if (e.active.data.current.type === "Column") {
              const oldIdx = columns.findIndex((c:any) => c.id === e.active.id);
              const newIdx = columns.findIndex((c:any) => c.id === e.over.id);
              setColumns(arrayMove(columns, oldIdx, newIdx));
            }
          }}
          onDragOver={(e:any) => {
            const { active, over } = e;
            if (!over || active.id === over.id || active.data.current.type !== "Task") return;
            const activeIdx = tasks.findIndex((t:any) => t.id === active.id);
            const isOverTask = over.data.current?.type === "Task";
            const overId = isOverTask ? tasks.find((t:any) => t.id === over.id).columnId : over.id;
            const newTasks = [...tasks];
            newTasks[activeIdx].columnId = overId;
            setTasks(isOverTask ? arrayMove(newTasks, activeIdx, tasks.findIndex((t:any) => t.id === over.id)) : newTasks);
          }}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <SortableContext items={columns.map((c:any) => c.id)} strategy={horizontalListSortingStrategy}>
              {columns.map((col:any) => <ColumnContainer key={col.id} column={col} tasks={filteredTasks.filter((t:any) => t.columnId === col.id)} />)}
            </SortableContext>
            <button style={{ minWidth: '320px', height: '100px', border: '2px dashed var(--glass-border)', borderRadius: '20px', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 600, cursor: 'pointer' }} onClick={() => addColumn(prompt("Column Name:") || "New Column")}>
              <Plus size={20} /> Add Column
            </button>
          </div>
          {createPortal(<DragOverlay>{activeColumn && <ColumnContainer column={activeColumn} tasks={filteredTasks.filter((t:any) => t.columnId === (activeColumn as any).id)} />}{activeTask && <TaskCard task={activeTask} />}</DragOverlay>, document.body)}
        </DndContext>
      </div>
      <TaskModal />
    </div>
  );
}