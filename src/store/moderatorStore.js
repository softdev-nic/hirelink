
import { create } from "zustand";
import { publicAPI } from "../Services/API";

const useModeratorStore = create((set) => ({
  isModerator: false,
  checkingModerator: false,
  moderatorChecked: false,

  checkModerator: async () => {
    try {
      set({
        checkingModerator: true,
        moderatorChecked: false,
      });

      const response = await publicAPI.get("/api/moderator-check");

      const isModerator = response.status === 200;

      set({
        isModerator,
        checkingModerator: false,
        moderatorChecked: true,
      });

      return isModerator;
    } catch (error) {
      console.error(
        "Moderator check failed:",
        error.response?.status
      );

      set({
        isModerator: false,
        checkingModerator: false,
        moderatorChecked: true,
      });

      return false;
    }
  },

  clearModerator: () => {
    set({
      isModerator: false,
      checkingModerator: false,
      moderatorChecked: false,
    });
  },
}));

export default useModeratorStore;
