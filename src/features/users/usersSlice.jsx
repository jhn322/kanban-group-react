import { createSlice, nanoid } from "@reduxjs/toolkit";

const getInitialUsers = () => {
  const storedUsers = JSON.parse(localStorage.getItem("allUsers"));
  if (storedUsers) {
    return storedUsers;
  } else {
    const defaultUsers = [
      {
        id: nanoid(),
        userFirstName: "Jake",
        userLastName: "Jorden",
        userUserName: "Jesper",
        userAvatarColor: "#2d3436",
        settings: {
          header: "#5756b9",
          headerText: "#FFFFFF",
          column: "#eb8cac",
          columnText: "#000000",
          popup: "#ffffff",
          popupText: "#000000",
          background: "",
        },
        userActive: true,
      },
      {
        id: nanoid(),
        userFirstName: "Parham",
        userLastName: "Pour",
        userUserName: "Kai",
        userAvatarColor: "#6ab048",
        settings: {
          header: "#5756b9",
          headerText: "#FFFFFF",
          column: "#eb8cac",
          columnText: "#000000",
          popup: "#ffffff",
          popupText: "#000000",
          background: "",
        },
        userActive: false,
      },
      {
        id: nanoid(),
        userFirstName: "Lloyd",
        userLastName: "Kampner",
        userUserName: "Nya",
        userAvatarColor: "#f9ca24",
        settings: {
          header: "#5756b9",
          headerText: "#FFFFFF",
          column: "#eb8cac",
          columnText: "#000000",
          popup: "#ffffff",
          popupText: "#000000",
          background: "",
        },
        userActive: false,
      },
      {
        id: nanoid(),
        userFirstName: "Arvin",
        userLastName: "Johnsson",
        userUserName: "Sora",
        userAvatarColor: "#4834d4",
        settings: {
          header: "#5756b9",
          headerText: "#FFFFFF",
          column: "#eb8cac",
          columnText: "#000000",
          popup: "#ffffff",
          popupText: "#000000",
          background: "",
        },
        userActive: false,
      },
    ];
    localStorage.setItem("allUsers", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
};

const initialState = {
  users: getInitialUsers(),
};

const saveUsers = (users) => {
  localStorage.setItem("allUsers", JSON.stringify(users));
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      const newUser = {
        id: nanoid(),
        userFirstName: action.payload.userFirstName,
        userLastName: action.payload.userLastName,
        userUserName: action.payload.userUserName,
        userAvatarColor: action.payload.userAvatarColor,
        settings: {
          header: "#5756b9",
          headerText: "#FFFFFF",
          column: "#eb8cac",
          columnText: "#000000",
          popup: "#ffffff",
          popupText: "#000000",
          background: "",
        },
        userActive: false,
      };
      state.users.push(newUser);
      saveUsers(state.users);
    },
    changeUserColor: (state, action) => {
      const newColor = {
        userAvatarColor: action.payload.userAvatarColor,
      };
      state.users.userAvatarColor.push(newColor);
    },
    deleteUser: (state, action) => {
      const updateUserlist = state.users.filter(
        (user) => action.payload != user.id
      );
      //prevents delete of last user
      if (updateUserlist.length < 1) {
        alert("Add more users before deleting this 1");
        return;
      }
      updateUserlist[0].userActive = true;
      state.users = updateUserlist;
      saveUsers(updateUserlist);
    },
    updateUser: (state, action) => {
      const updateUser = action.payload;

      const currentUser = state.users.find((user) => user.id == updateUser.id);

      currentUser.settings = updateUser.settings;

      saveUsers(state.users);
    },
    changeActiveUser: (state, action) => {
      const { id } = action.payload;
      const userToActive = state.users.find((user) => user.id === id);
      const oldActiveUser = state.users.find((user) => user.userActive);
      if (userToActive.id == oldActiveUser.id) {
        return;
      }
      oldActiveUser.userActive = false;
      userToActive.userActive = true;
      saveUsers(state.users);
    },
  },
});

export const selectAllUsers = (state) => state.users;

export const { addNewUser, deleteUser, updateUser, changeActiveUser } =
  usersSlice.actions;

export default usersSlice.reducer;
