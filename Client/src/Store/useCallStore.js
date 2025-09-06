import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCallStore = create(
  persist(
    (set) => ({
      User: null,
      userName: null,
      is_Ready_To_Call: null,
      is_Cam_Open: null,
      is_Mic_Open: null,
      callStatus: "idle", // 'idle' | 'calling' | 'inCall'

      // Actions
      setUser: (user) => set({ User: user }),
      setuserName: (name) => set({ userName: name }),
      setis_Ready_To_Call: (value) => set({ is_Ready_To_Call: value }),
      setis_Cam_Open: (value) => set({ is_Cam_Open: value }),
      setis_Mic_Open: (value) => set({ is_Mic_Open: value }),
      setcallStatus: (value) => set({ callStatus: value }),
    }),
    {
      name: "call-storage", // key for localStorage
      getStorage: () => sessionStorage, 
    }
  )
);

export default useCallStore;
