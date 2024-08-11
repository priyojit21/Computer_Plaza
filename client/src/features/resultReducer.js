import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// GET
export const showResult = createAsyncThunk(
  "showResult",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/result");
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// POST
export const postResult = createAsyncThunk(
  "postResult",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resultSlice = createSlice({
  name: "result",
  initialState: {
    userId: "",
    result: [],  // Keep this as an array
    check: undefined,
    loading: false,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    pushResult: (state, action) => {
      state.result.push(action.payload);
    },
    optionSelect: (state, action) => {
      state.check = action.payload;
    },
    resetResult: (state) => {
      return {
        //username ta intact rakhar jonne
        ...state,
        result: [],
        check: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // promise pending
      .addCase(showResult.pending, (state) => {
        state.loading = true;
      })
      // promise fulfilled
      .addCase(showResult.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming that action.payload is an array
        state.result = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      // promise rejected
      .addCase(showResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(postResult.pending, (state) => {
        state.loading = true;
      })
      // promise fulfilled
      .addCase(postResult.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming that action.payload is an array or an object
        state.result = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      // promise rejected
      .addCase(postResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default resultSlice.reducer;
export const { setUserId, pushResult, optionSelect, resetResult } = resultSlice.actions;


