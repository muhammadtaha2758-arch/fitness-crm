<template>
  <div class="container-fluid">
    <div class="page-header text-center mb-4">
      <h2 class="page-title">Member Check-In Logs</h2>
    </div>

    <b-card class="mb-3">
      <b-row>
        <b-col md="4">
          <b-form-group label="Select Member:">
            <b-form-select
              v-model="selectedMember"
              :options="memberOptions"
              @change="fetchCheckins"
              class="form-control"
              :disabled="isLoading"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Select Date:">
            <b-form-datepicker
              v-model="selectedDate"
              @input="filterByDate"
              class="form-control"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <h5>Check-In Records</h5>
      <b-table
        :items="filteredCheckins"
        :fields="fields"
        striped
        hover
        responsive
        small
      >
        <template #cell(dateTime)="data">
          {{ formatDateTime(data.item.dateTime) }}
        </template>
        <template #empty>
          <div class="text-center text-muted">No check-in logs found.</div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CheckinLogs',
  data() {
    return {
      isLoading: false,
      selectedMember: null,
      selectedDate: null,
      memberOptions: [
        { value: null, text: 'Select Member' },
        { value: 1, text: 'John Doe' },
        { value: 2, text: 'Jane Smith' },
        { value: 3, text: 'Ali Khan' }
      ],
      checkinData: [],
      filteredCheckins: [],
      fields: [
        { key: 'dateTime', label: 'Check-In Time' },
        { key: 'location', label: 'Location' },
        { key: 'status', label: 'Status' }
      ]
    };
  },
  methods: {
    fetchCheckins() {
      this.isLoading = true;

      // Replace with API integration in production
      setTimeout(() => {
        this.checkinData = [
          { dateTime: '2025-07-01T07:45:00', location: 'Main Branch', status: 'Successful' },
          { dateTime: '2025-07-02T08:10:00', location: 'Main Branch', status: 'Successful' },
          { dateTime: '2025-07-03T07:50:00', location: 'Main Branch', status: 'Late' }
        ];
        this.filteredCheckins = this.checkinData;
        this.isLoading = false;
      }, 1000);
    },
    filterByDate() {
      if (!this.selectedDate) {
        this.filteredCheckins = this.checkinData;
        return;
      }

      const selected = moment(this.selectedDate).format('YYYY-MM-DD');
      this.filteredCheckins = this.checkinData.filter(c =>
        moment(c.dateTime).format('YYYY-MM-DD') === selected
      );
    },
    formatDateTime(datetime) {
      return moment(datetime).format('DD MMM YYYY, h:mm A');
    }
  }
};
</script>

<style scoped>
.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}
</style>