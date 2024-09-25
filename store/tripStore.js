import { create } from "zustand";

const tripStore = (set, get) => ({
  tripData: null,
  addTripData: (data) => {
    set((state) => ({
      tripData: {
        ...state.tripData, // Spread the existing tripData
        ...data, // Merge with the new data
      },
    }));
  },
  
  setTripData : (data)=>{
    set((state) => ({tripData : data}))
  },
  reset: () => {
    set({
      tripData: null,
    });
  },
});

const useTripStore = create(tripStore);

export default useTripStore;