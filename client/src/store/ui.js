import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "ui",
	initialState: {
		slider: {
			list: [],
			isOpen: false,
			currentIndex: 0,
			modalIsOpen: false,
            shareModalIsOpen: false,
		}
	},
	reducers: {
		sliderDisplayed: (ui, action) => {
			ui.slider.list = action.payload.list;
			ui.slider.isOpen = true;
			ui.slider.currentIndex = action.payload.currentIndex || 0;
		},
		slideToNext: (ui, action) => {
			// check if exceed total length if yes set to zero
			if (ui.slider.currentIndex + 1 > ui.slider.list.length - 1) ui.slider.currentIndex = 0;
			else ui.slider.currentIndex += 1;
		},
		slideToPrevious: (ui, action) => {
			if (ui.slider.currentIndex - 1 < 0) ui.slider.currentIndex = ui.slider.list.length - 1;
			else ui.slider.currentIndex -= 1;
		},
		sliderClosed: (ui, action) => {
			ui.slider.list = [];
			ui.slider.isOpen = false;
			ui.slider.currentIndex = 0;
		},
		showModal: (ui, action) => {
			ui.modalIsOpen = true;
		},
		closeModal: (ui, action) => {
			ui.modalIsOpen = false;
		},
        showShareModal: (ui, action) => {
            ui.shareModalIsOpen = true;
        },
        closeShareModal: (ui, action) => {
            ui.shareModalIsOpen = false;
        },
	},
});

export const { 
	sliderDisplayed, 
	slideToNext, 
	slideToPrevious, 
	sliderClosed,
	showModal,
	closeModal,
    showShareModal,
    closeShareModal,
} = slice.actions;

export default slice.reducer;

export const openSlider = (list, currentIndex) => async dispatch =>
	dispatch(sliderDisplayed({ list, currentIndex }));

export const gotoNextImage = () => async dispatch => {
	dispatch(slideToNext())};	

export const gotoPreviousImage = () => async dispatch => dispatch(slideToPrevious());	

export const closeSlider = () => async dispatch => dispatch(sliderClosed());
