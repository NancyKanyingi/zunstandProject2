import { create  } from "zustand"
import axios from "axios"

const baseUrl = "https://fakestoreapi.com/users"
//create zustand store.
const userStore = create((set, get) => ({
	//initial state -- to be accessed by components.
	users: [],
	loading: false,
	currentUser: null,
	currentUserLoading: false,
	//fetch action -- using axios
	fetchUsers: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${baseUrl}`);
			set({ users: response.data, loading: false });
		} catch (error) {
			set({ users: [], loading: false });
			console.log(error);
		}
	},
	// Action for fetching a single user.
	fetchUser: async (userId) => {
		set({ loading: true });
		try {
			const response = await axios.get(`${baseUrl}/${userId}`);
			set({ currentUser: response.data, currentUserLoading: false });
		} catch (error) {
			set({ currentUser: null, currentUserLoading: false });
			console.log(error);
		}
	},
	//clear current user
	clearCurrentUser: () => set({ currentUser: null , currentUserLoading:false}),
	// Getter functions
  	getUserById: (userId) => {
    	return get().users.find(user => user.id === parseInt(userId));
  	},
}));

export default userStore;