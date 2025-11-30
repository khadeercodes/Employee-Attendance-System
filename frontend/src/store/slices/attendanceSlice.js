import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Check in
export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/attendance/checkin');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Check-in failed'
      );
    }
  }
);

// Check out
export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/attendance/checkout');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Check-out failed'
      );
    }
  }
);

// Get today's status
export const getTodayStatus = createAsyncThunk(
  'attendance/getTodayStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/attendance/today');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get today status'
      );
    }
  }
);

// Get my history
export const getMyHistory = createAsyncThunk(
  'attendance/getMyHistory',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const params = {};
      if (month) params.month = month;
      if (year) params.year = year;
      const response = await api.get('/attendance/my-history', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get history'
      );
    }
  }
);

// Get my summary
export const getMySummary = createAsyncThunk(
  'attendance/getMySummary',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const params = {};
      if (month) params.month = month;
      if (year) params.year = year;
      const response = await api.get('/attendance/my-summary', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get summary'
      );
    }
  }
);

// Get all attendance (Manager)
export const getAllAttendance = createAsyncThunk(
  'attendance/getAllAttendance',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await api.get('/attendance/all', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get attendance'
      );
    }
  }
);

// Get team summary (Manager)
export const getTeamSummary = createAsyncThunk(
  'attendance/getTeamSummary',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const params = {};
      if (month) params.month = month;
      if (year) params.year = year;
      const response = await api.get('/attendance/summary', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get team summary'
      );
    }
  }
);

// Get today status (Manager)
export const getTodayStatusManager = createAsyncThunk(
  'attendance/getTodayStatusManager',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/attendance/today-status');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get today status'
      );
    }
  }
);

// Get employee dashboard
export const getEmployeeDashboard = createAsyncThunk(
  'attendance/getEmployeeDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/dashboard/employee');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get dashboard'
      );
    }
  }
);

// Get manager dashboard
export const getManagerDashboard = createAsyncThunk(
  'attendance/getManagerDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/dashboard/manager');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get dashboard'
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    todayStatus: null,
    history: [],
    summary: null,
    allAttendance: [],
    teamSummary: null,
    todayStatusManager: null,
    employeeDashboard: null,
    managerDashboard: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAttendance: (state) => {
      state.history = [];
      state.summary = null;
      state.allAttendance = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Check in
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = {
          checkedIn: true,
          checkInTime: action.payload.checkInTime,
          status: action.payload.status,
        };
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check out
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = {
          ...state.todayStatus,
          checkedOut: true,
          checkOutTime: action.payload.checkOutTime,
          totalHours: action.payload.totalHours,
        };
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get today status
      .addCase(getTodayStatus.fulfilled, (state, action) => {
        state.todayStatus = action.payload;
      })
      // Get my history
      .addCase(getMyHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      // Get my summary
      .addCase(getMySummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      // Get all attendance
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.allAttendance = action.payload;
      })
      // Get team summary
      .addCase(getTeamSummary.fulfilled, (state, action) => {
        state.teamSummary = action.payload;
      })
      // Get today status manager
      .addCase(getTodayStatusManager.fulfilled, (state, action) => {
        state.todayStatusManager = action.payload;
      })
      // Get employee dashboard
      .addCase(getEmployeeDashboard.fulfilled, (state, action) => {
        state.employeeDashboard = action.payload;
      })
      // Get manager dashboard
      .addCase(getManagerDashboard.fulfilled, (state, action) => {
        state.managerDashboard = action.payload;
      });
  },
});

export const { clearError, clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;


