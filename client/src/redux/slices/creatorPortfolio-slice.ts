import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contentData = [
  {
    contentId: 0,
    contentType: "personal",
    mediaType: "image",
    socialMedia: "",
    uri: "/joe-cool.jpg",
    name: "joe.jpg",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 1,
    contentType: "personal",
    mediaType: "image",
    socialMedia: "",
    uri: "/luka-cool.jpg",
    name: "luka.jpg",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 2,
    contentType: "personal",
    mediaType: "image",
    socialMedia: "",
    uri: "/s-cool.jpg",
    name: "s.jpg",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 3,
    contentType: "personal",
    mediaType: "image",
    socialMedia: "",
    uri: "/scott-cool.jpg",
    name: "scott.jpg",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 4,
    contentType: "personal",
    mediaType: "image",
    socialMedia: "",
    uri: "/calvin-cool.jpg",
    name: "calvin.jpg",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 5,
    contentType: "campaign",
    mediaType: "image",
    socialMedia: "instagram",
    uri: "/biden.jpg",
    name: "biden.jpg",
    campaignTitle: "Pic of biden",
    description:
      "Worked with Joe Biden on his presidential campaign. #Biden2020",
    date: "2021-10-10",
  },
  {
    contentId: 6,
    contentType: "campaign",
    mediaType: "image",
    socialMedia: "twitter",
    uri: "/trump.jpg",
    name: "trump.jpg",
    campaignTitle: "Pic of trump",
    description:
      "Worked with Donald Trump on his presidential campaign. #Trump2020",
    date: "2021-10-10",
  },
  {
    contentId: 7,
    contentType: "campaign",
    mediaType: "image",
    socialMedia: "facebook",
    uri: "/obama.jpg",
    name: "obama.jpg",
    campaignTitle: "Pic of obama",
    description:
      "Worked with Barack Obama on his presidential campaign. #Obama2020",
    date: "2021-10-10",
  },
  {
    contentId: 8,
    contentType: "personal",
    mediaType: "video",
    socialMedia: "",
    uri: "https://www.youtube.com/watch?v=nM0xDI5R50E&list=RDnM0xDI5R50E&start_radio=1&ab_channel=iKON",
    name: "IU Music Video",
    campaignTitle: "",
    description: "",
    date: "",
  },
  {
    contentId: 9,
    contentType: "campaign",
    mediaType: "image",
    socialMedia: "youtube",
    uri: "/bush.jpg",
    name: "bush.jpg",
    campaignTitle: "Pic of bush",
    description:
      "Worked with George Bush on his presidential campaign. #Bush2020",
    date: "2021-10-10",
  },
  {
    contentId: 10,
    contentType: "personal",
    mediaType: "video",
    socialMedia: "",
    uri: "https://www.youtube.com/watch?v=nM0xDI5R50E&list=RDnM0xDI5R50E&start_radio=1&ab_channel=iKON",
    name: "IU Music Video",
    campaignTitle: "",
    description: "",
    date: "",
  },
];

type InitialState = {
  value: creatorContentInfoReducer;
};

type Content = {
  contentId?: number;
  contentType: string;
  mediaType: string;
  socialMedia: string;
  uri: string;
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
    content: contentData,
    currentContent: {
      contentId: 0,
      contentType: "",
      mediaType: "",
      socialMedia: "",
      uri: "",
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
        contentType: "",
        mediaType: "",
        socialMedia: "",
        uri: "",
        name: "",
        campaignTitle: "",
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
