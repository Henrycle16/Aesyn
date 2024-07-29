import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: creatorContentInfoReducer;
};

type Content = {
  _id?: string;
  contentType: string;
  mediaType: string;
  socialMedia: string;
  uri: string;
  thumbnailUri: string;
  name: string;
  campaignTitle: string;
  description: string;
  date: string;
};

type creatorContentInfoReducer = {
  content: Content[];
  currentContent: Content;
};

const initialState = {
  value: {
    content: [],
    currentContent: {
      _id: "",
      contentType: "",
      mediaType: "",
      socialMedia: "",
      uri: "",
      thumbnailUri: "",
      name: "",
      campaignTitle: "",
      description: "",
      date: "",
    },
  } as creatorContentInfoReducer,
} as InitialState;

export const creatorContent = createSlice({
  name: "creatorContent",
  initialState,
  reducers: {
    creatorContentInfo: (
      state,
      action: PayloadAction<Partial<creatorContentInfoReducer>>
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    editContent: (state, action: PayloadAction<Content>) => {
      for (let i = 0; i < state.value.content.length; i++) {
        if (state.value.content[i]._id === action.payload._id) {
          state.value.content[i] = action.payload;
          console.log(state.value.content[i]);
        }
      }
    },
    addContent: (state, action: PayloadAction<Content>) => {
      state.value.content.push(action.payload);
    },
    resetCurrentContent: (state) => {
      state.value.currentContent = {
        contentType: "",
        mediaType: "",
        socialMedia: "",
        uri: "",
        thumbnailUri: "",
        name: "",
        campaignTitle: "",
        description: "",
        date: "",
      };
    },
    deleteContent: (state, action: PayloadAction<Content>) => {
      state.value.content = state.value.content.filter(
        (contentData) => contentData._id !== action.payload._id
      );
    },
  },
});

export const {
  creatorContentInfo,
  editContent,
  addContent,
  resetCurrentContent,
  deleteContent,
} = creatorContent.actions;
export default creatorContent.reducer;
