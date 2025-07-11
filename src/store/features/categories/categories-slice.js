import { axiosStandart } from "@/app/utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const { data } = await axiosStandart.get("/api/categories");
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (id, { dispatch }) => {
    try {
      await axiosStandart.delete(`/api/categories?id=${id}`);
      dispatch(getCategories());
    } catch (error) {
      console.error(error);
    }
  }
);

export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async (nameCategory, { dispatch }) => {
    try {
      await axiosStandart.post(`/api/categories`, {name: nameCategory} );
      dispatch(getCategories());
    } catch (error) {
      console.error(error);
    }
  }
);

export const editCategories = createAsyncThunk(
  "categories/editCategories",
  async (newCategory, { dispatch }) => {
    try {
      await axiosStandart.put(`/api/categories`, newCategory );
      dispatch(getCategories());
    } catch (error) {
      console.error(error);
    }
  }
);



const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
