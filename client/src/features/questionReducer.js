import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// GET
export const showQuestion = createAsyncThunk("showQuestion", async (args, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/v1/questions");
        // const {question,answer} = await fetch("http://localhost:5000/api/v1/questions");
        const data = await response.json();
        if (response.ok) {
            // return data.q[0].questions;
            return data.q;
            // return data.q[0];
        } else {
            return rejectWithValue(data.message);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



//answers fetch korar jonne

export const showQuestionAnswers = createAsyncThunk("showQuestionAnswers", async (args, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:5000/api/v1/questions");
        // const {question,answer} = await fetch("http://localhost:5000/api/v1/questions");
        const data = await response.json();
        if (response.ok) {
            // return data.q[0].answers;
            return data.q;
            // return data.q[0];
        } else {
            return rejectWithValue(data.message);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// POST
export const postQuestion = createAsyncThunk(
    "postQuestion",
    async (data, { rejectWithValue }) => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/questions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        if (response.ok) {
            return result;
        } else {
            return rejectWithValue(result.message);
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0,
        loading: false,
        error: null,
        chosen:null
    },
    reducers: {
        startExamAction: (state, action) => {
            state.queue = action.payload;
        },
        nextTrace: (state) => {
            state.trace += 1;
        },
        set1:(state,action) =>{
            state.chosen = action.payload;
        },
        resetAllquestion: () => {
            return {
                queue: [],
                answers: [],
                trace: 0,
                loading: false,
                error: null,
                chosen:null
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(showQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.queue = action.payload;
            })
            .addCase(showQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showQuestionAnswers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showQuestionAnswers.fulfilled, (state, action) => {
                state.loading = false;
                state.answers = action.payload;
            })
            .addCase(showQuestionAnswers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.queue = [...state.queue, ...action.payload];
            })
            .addCase(postQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default questionSlice.reducer;
export const { startExamAction, nextTrace,set1,resetAllquestion } = questionSlice.actions;





