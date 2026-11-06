import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  type User,
} from "@react-native-google-signin/google-signin";
import { create } from "zustand";

GoogleSignin.configure({
  // OAuth client of type "Web application" from Google Cloud Console.
  // Required to receive an idToken you can verify on your backend.
  webClientId:
    "979604413274-u1b8ev4vdqamqvb7lk6i33u5eciihg5f.apps.googleusercontent.com",
});

console.log(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);
type AuthStatus = "loading" | "signedOut" | "signedIn";

type AuthState = {
  status: AuthStatus;
  user: User["user"] | null;
  idToken: string | null;
  accessToken: string | null;
  error: string | null;
  restore: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshTokens: () => Promise<string | null>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "loading",
  user: null,
  idToken: null,
  accessToken: null,
  error: null,

  // The Google SDK keeps the session itself, so on startup we just ask it silently.
  restore: async () => {
    try {
      const response = await GoogleSignin.signInSilently();
      if (response.type === "success") {
        const { accessToken } = await GoogleSignin.getTokens();
        set({
          status: "signedIn",
          user: response.data.user,
          idToken: response.data.idToken,
          accessToken,
        });
        return;
      }
    } catch {
      // Fall through to signed-out state.
    }
    set({ status: "signedOut", user: null, idToken: null, accessToken: null });
  },

  signIn: async () => {
    console.log(1);
    set({ error: null });
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response)) return; // user cancelled

      const { accessToken } = await GoogleSignin.getTokens();
      set({
        status: "signedIn",
        user: response.data.user,
        idToken: response.data.idToken,
        accessToken,
      });
    } catch (error) {
      console.log({ error });
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            return;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            set({ error: "Google Play Services not available or outdated." });
            return;
          default:
            set({ error: `Google sign-in failed (${error.code}).` });
            return;
        }
      }
      set({ error: "Google sign-in failed." });
    }
  },

  signOut: async () => {
    try {
      await GoogleSignin.signOut();
    } finally {
      set({
        status: "signedOut",
        user: null,
        idToken: null,
        accessToken: null,
        error: null,
      });
    }
  },

  // Tokens expire after ~1h; call this before hitting your backend.
  refreshTokens: async () => {
    if (get().status !== "signedIn") return null;
    try {
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      set({ idToken, accessToken });
      return idToken;
    } catch {
      return null;
    }
  },
}));
