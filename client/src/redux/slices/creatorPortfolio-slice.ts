import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contentData = [
  {
    contentId: 0,
    type: "personal",
    uri: "/joe-cool.jpg",
    description: "",
    date: "",
  },
  {
    contentId: 1,
    type: "personal",
    uri: "/luka-cool.jpg",
    description: "",
    date: "",
  },
  {
    contentId: 2,
    type: "personal",
    uri: "/s-cool.jpg",
    description: "",
    date: "",
  },
  {
    contentId: 3,
    type: "personal",
    uri: "/scott-cool.jpg",
    description: "",
    date: "",
  },
  {
    contentId: 4,
    type: "personal",
    uri: "/calvin-cool.jpg",
    description: "",
    date: "",
  },
  {
    contentId: 5,
    type: "campaign",
    uri: "/biden.jpg",
    description:
      "Worked with Joe Biden on his presidential campaign. #Biden2020",
    date: "2021-10-10",
  },
  {
    contentId: 6,
    type: "campaign",
    uri: "/trump.jpg",
    description:
      "Worked with Donald Trump on his presidential campaign. #Trump2020",
    date: "2021-10-10",
  },
  {
    contentId: 7,
    type: "campaign",
    uri: "/obama.jpg",
    description:
      "Worked with Barack Obama on his presidential campaign. #Obama2020",
    date: "2021-10-10",
  },
  {
    contentId: 8,
    type: "campaign",
    uri: "/bush.jpg",
    description:
      "Worked with George Bush on his presidential campaign. #Bush2020",
    date: "2021-10-10",
  },
];

type InitialState = {
  value: creatorContentInfoReducer;
};

type Content = {
  contentId?: number;
  type: string;
  uri: string;
  description: string;
  date: string;
};

type creatorContentInfoReducer = {
  content: Content[];
  currentContent: Content;
};

const initialState = {
  value: {
    content: contentData,
    currentContent: {
      contentId: 0,
      type: "",
      uri: "",
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
      action: PayloadAction<{ currentContent: Partial<Content> }>
    ) => {
      state.value = {
        ...state.value,
        currentContent: {
          ...state.value.currentContent,
          ...action.payload.currentContent,
        },
      };
    },
    editContent: (state, action: PayloadAction<Content>) => {
      for (let i = 0; i < state.value.content.length; i++) {
        if (state.value.content[i].contentId === action.payload.contentId) {
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
        contentId: state.value.content.length,
        type: "",
        uri: "",
        description: "",
        date: "",
      };
    },
    /* 
    ! Use this resetcurrentContent instead of the one above once we start pulling data from the backend
    resetcurrentContent: (state) => {
      state.value.currentContent = {
          uri: "",
          description: "",
          date: "",
        };
        },
        */
    deleteContent: (state, action: PayloadAction<number>) => {
      state.value.content = state.value.content.filter(
        (contentData) => contentData.contentId !== action.payload
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
