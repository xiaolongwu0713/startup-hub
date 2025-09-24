// User State Management Store
// TODO: Implement user state management

import { IUserSession } from '../utils/auth';

export interface IUserProfile {
  _id?: string;
  openid: string;
  nickname: string;
  avatar_url: string;
  city?: string;
  bio?: string;
  skills: string[];
  visibility?: 'public' | 'members';
  counters?: {
    ideas: number;
    milestones: number;
  };
  created_at?: number;
  updated_at?: number;
}

export interface IUserStoreState {
  isLoggedIn: boolean;
  session: IUserSession | null;
  profile: IUserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export class UserStore {
  private state: IUserStoreState = {
    isLoggedIn: false,
    session: null,
    profile: null,
    isLoading: false,
    error: null
  };

  private listeners: Array<(state: IUserStoreState) => void> = [];

  // TODO: Initialize store
  init() {
    // TODO: Load saved session from storage
    // TODO: Validate session and auto-login if valid
  }

  // TODO: Set user session after login
  setSession(session: IUserSession) {
    // TODO: Update state with session data
    // TODO: Set isLoggedIn to true
    // TODO: Notify listeners
  }

  // TODO: Set user profile data
  setProfile(profile: IUserProfile) {
    // TODO: Update state with profile data
    // TODO: Notify listeners
  }

  // TODO: Update profile data
  updateProfile(updates: Partial<IUserProfile>) {
    // TODO: Merge updates with existing profile
    // TODO: Notify listeners
  }

  // TODO: Clear user data on logout
  clearUser() {
    // TODO: Reset state to initial values
    // TODO: Notify listeners
  }

  // TODO: Set loading state
  setLoading(loading: boolean) {
    // TODO: Update loading state
    // TODO: Notify listeners
  }

  // TODO: Set error state
  setError(error: string | null) {
    // TODO: Update error state
    // TODO: Notify listeners
  }

  // TODO: Get current state
  getState(): IUserStoreState {
    return { ...this.state };
  }

  // TODO: Subscribe to state changes
  subscribe(listener: (state: IUserStoreState) => void) {
    // TODO: Add listener to array
    // TODO: Return unsubscribe function
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // TODO: Notify all listeners of state changes
  private notifyListeners() {
    // TODO: Call all listeners with current state
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

// Export singleton instance
export const userStore = new UserStore();
