import { create } from "zustand";


const languageStore = (set, get) => ({
  language: "English",

  setLanguageData : (data)=>{
    set((state) => ({language : data}))
  },
  
});

const useLanguageStore = create(languageStore);

export default useLanguageStore;