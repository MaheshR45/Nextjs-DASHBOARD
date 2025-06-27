import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  collapsed: boolean
  toggleCollapse: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      toggleCollapse: () => set((state) => ({ collapsed: !state.collapsed })),
    }),
    {
      name: "sidebar-collapse", // key in localStorage
    }
  )
)
