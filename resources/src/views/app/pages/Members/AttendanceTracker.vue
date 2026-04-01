<template>
  <div class="container-fluid">
    <div class="page-header text-center mb-4">
      <h2 class="page-title">Member Attendance Tracker</h2>
    </div>

    <b-card class="mb-3">
      <b-row>
        <b-col md="4">
          <b-form-group label="Select Member:">
            <b-form-select
              v-model="selectedMember"
              :options="memberOptions"
              @change="fetchAttendanceData"
              class="form-control"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Select Month:">
            <b-form-datepicker
              v-model="selectedMonth"
              :date-format="'MM/YYYY'"
              :start-weekday="1"
              class="form-control"
              :show-decade-nav="false"
              :show-month="true"
              @input="filterByMonth"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <h5 class="mb-3">Attendance Overview</h5>
      <b-table
        :items="filteredAttendance"
        :fields="fields"
        responsive
        striped
        hover
        small
      >
        <template #cell(date)="data">
          {{ formatDate(data.item.date) }}
        </template>
        <template #cell(status)="data">
          <span v-if="data.item.status === 'Present'" class="text-success">✅ Present</span>
          <span v-else class="text-danger">❌ Absent</span>
        </template>
        <template #empty>
          <div class="text-center text-muted">No attendance records for this month.</div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AttendanceTracker",
  data() {
    return {
      isLoading: false,
      selectedMember: null,
      selectedMonth: new Date(),
      memberOptions: [
        { value: null, text: "Select Member" },
        { value: 1, text: "John Doe" },
        { value: 2, text: "Jane Smith" },
        { value: 3, text: "Ali Khan" },
      ],
      attendanceData: [],
      filteredAttendance: [],
      fields: [
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ],
    };
  },
  methods: {
    fetchAttendanceData() {
      this.isLoading = true;

      // Replace with API in production
      setTimeout(() => {
        this.attendanceData = [];

        // Dummy attendance for current month (1st to 10th)
        for (let i = 1; i <= 10; i++) {
          const status = i % 2 === 0 ? "Present" : "Absent";
          this.attendanceData.push({
            date: moment().startOf("month").add(i - 1, "days").format("YYYY-MM-DD"),
            status,
          });
        }

        this.filterByMonth();
        this.isLoading = false;
      }, 1000);
    },
    filterByMonth() {
      if (!this.selectedMonth) {
        this.filteredAttendance = this.attendanceData;
        return;
      }

      const selected = moment(this.selectedMonth).format("YYYY-MM");
      this.filteredAttendance = this.attendanceData.filter((entry) =>
        moment(entry.date).format("YYYY-MM") === selected
      );
    },
    formatDate(date) {
      return moment(date).format("DD MMM YYYY");
    },
  },
};
</script>

<style scoped>
.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}
</style>