import {create} from "zustand";

interface State {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}


export const useUiStore = create<State>((set) => ({
    isSidebarOpen: false,

    openSidebar: () => set({isSidebarOpen: true}),
    closeSidebar: () => set({isSidebarOpen: false}),
}));