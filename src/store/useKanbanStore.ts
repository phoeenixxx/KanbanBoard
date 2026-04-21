  import { create } from 'zustand';
  import { persist } from 'zustand/middleware';

  export const useKanbanStore = create()(
    persist(
      (set) => ({
        theme: 'dark',
        columns: [],
        tasks: [],
        searchQuery: '',
        selectedTask: null,
        issueCount: 0,

        toggleTheme: () => set((state: any) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setSelectedTask: (task: any) => set({ selectedTask: task }),
        
        addColumn: (title: string) => set((state: any) => ({
          columns: [...state.columns, { id: crypto.randomUUID(), title }]
        })),

        updateColumn: (id: any, title: string) => set((state: any) => ({
          columns: state.columns.map((c: any) => c.id === id ? { ...c, title } : c)
        })),

        deleteColumn: (id: any) => set((state: any) => ({
          columns: state.columns.filter((c: any) => c.id !== id),
          tasks: state.tasks.filter((t: any) => t.columnId !== id)
        })),

        addTask: (columnId: any) => set((state: any) => {
          const newCount = state.issueCount + 1;
          return {
            issueCount: newCount,
            tasks: [...state.tasks, {
              id: crypto.randomUUID(),
              key: `FLUX-${newCount}`,
              columnId,
              content: "New Task",
              description: "",
              priority: "medium",
              type: "task",
              assignee: "Unassigned",
              dueDate: new Date().toISOString().split('T')[0],
              comments: []
            }]
          };
        }),

        updateTask: (id: any, updates: any) => set((state: any) => {
          const updatedTasks = state.tasks.map((t: any) => t.id === id ? { ...t, ...updates } : t);
          return {
            tasks: updatedTasks,
            selectedTask: state.selectedTask?.id === id ? { ...state.selectedTask, ...updates } : state.selectedTask
          };
        }),

        deleteTask: (id: any) => set((state: any) => ({
          tasks: state.tasks.filter((t: any) => t.id !== id),
          selectedTask: null
        })),

        addComment: (taskId: any, text: string) => set((state: any) => ({
          tasks: state.tasks.map((t: any) => t.id === taskId ? {
            ...t, comments: [...t.comments, { id: crypto.randomUUID(), text, createdAt: new Date().toLocaleString('en-US') }]
          } : t)
        })),

        setColumns: (columns: any) => set({ columns }),
        setTasks: (tasks: any) => set({ tasks }),
      }),
      { name: 'flux-manager-storage' }
    )
  );