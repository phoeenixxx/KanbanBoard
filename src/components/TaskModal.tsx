import { motion, AnimatePresence } from "framer-motion";
import { useKanbanStore } from "../store/useKanbanStore";
import { X, Trash2, MessageCircle, ChevronDown } from "lucide-react";

export default function TaskModal() {
  const { selectedTask, setSelectedTask, updateTask, deleteTask, addComment, columns, tasks } = useKanbanStore() as any;

  const liveTask = tasks.find((t: any) => t.id === selectedTask?.id);

  if (!selectedTask || !liveTask) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 30, opacity: 0 }}
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="22" height="22" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z"/><path fill="#81bc06" d="M12 0h11v11H12z"/><path fill="#05a6f0" d="M0 12h11v11H0z"/><path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
                <span style={{ background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '13px' }}>
                  {liveTask.key}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>Issue Details</span>
             </div>
             <div style={{ display: 'flex', gap: '20px' }}>
                <Trash2 size={20} color="#ef4444" cursor="pointer" onClick={() => { deleteTask(liveTask.id); setSelectedTask(null); }} />
                <X size={24} color="var(--text-main)" cursor="pointer" onClick={() => setSelectedTask(null)} />
             </div>
          </div>

          <input 
            className="custom-input" 
            style={{ fontSize: '32px', fontWeight: 800, border: 'none', background: 'transparent', padding: 0, marginBottom: '30px' }} 
            value={liveTask.content} 
            onChange={(e) => updateTask(liveTask.id, { content: e.target.value })} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginBottom: '40px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, marginBottom: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}>DUE DATE</label>
              <input type="date" className="custom-input" value={liveTask.dueDate} onChange={(e) => updateTask(liveTask.id, { dueDate: e.target.value })} />
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, marginBottom: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}>PRIORITY</label>
              <div style={{ position: 'relative' }}>
                <select className="custom-input" value={liveTask.priority} onChange={(e) => updateTask(liveTask.id, { priority: e.target.value })}>
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, marginBottom: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}>STATUS</label>
              <div style={{ position: 'relative' }}>
                <select className="custom-input" value={liveTask.columnId} onChange={(e) => updateTask(liveTask.id, { columnId: e.target.value })}>
                   {columns.map((c: any) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, marginBottom: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}>DESCRIPTION</label>
            <textarea className="custom-input" value={liveTask.description} onChange={(e) => updateTask(liveTask.id, { description: e.target.value })} placeholder="Add details..." />
          </div>

          <div className="comments-section">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '16px' }}><MessageCircle size={18}/> Discussion</h4>
            <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '20px' }}>
              {liveTask.comments?.map((c: any) => (
                <div key={c.id} style={{ background: 'var(--bg-app)', padding: '15px', borderRadius: '12px', marginBottom: '10px', border: '1px solid var(--glass-border)', fontSize: '14px' }}>
                  <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '5px' }}>{c.createdAt}</div>
                  <div>{c.text}</div>
                </div>
              ))}
            </div>
            <input 
              className="custom-input" 
              placeholder="Press Enter to comment..." 
              onKeyDown={(e: any) => { 
                if (e.key === 'Enter' && e.target.value.trim()) { 
                  addComment(liveTask.id, e.target.value); 
                  e.target.value = ''; 
                } 
              }} 
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}