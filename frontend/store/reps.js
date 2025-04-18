import { create } from "zustand";

export const useRepsStore = create((set) => ({
  reps: [],
  setReps: (reps) => set({ reps }),

  createRep: async (newRep) => {
    if (!newRep.name || !newRep.reps || !newRep.waktu) {
      return { success: false, message: "harap di isi" };
    }

    const res = await fetch("http://localhost:3000/api/reps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRep),
    });

    const data = await res.json();
    set((state) => ({ reps: [...state.reps, data.data] }));
    return { success: true, message: "success" };
  },

  fetchReps: async () => {
    const res = await fetch("http://localhost:3000/api/reps");
    const data = await res.json();
    set({ reps: data.data });
  },

  deleteReps: async (rid) => {
    const res = await fetch(`http://localhost:3000/api/reps/${rid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      reps: state.reps.filter((rep) => rep._id !== rid),
    }));

    return { success: true, message: data.message };
  },

  updateRep: async (rid, updateRep) => {
    const res = await fetch(`http://localhost:3000/api/reps/${rid}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(updateRep)
    })

    const data = await res.json()
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      reps: state.reps.map((rep) => 
      rep._id === rid ? data.data : rep
      )
    }))
  }


}));
