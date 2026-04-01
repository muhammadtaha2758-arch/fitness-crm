<template>
    <div class="container py-4">
      <h2 class="mb-4">Workout Completion Tracker</h2>
  
      <b-form-group label="Filter by Member">
        <b-form-select v-model="selectedMember" :options="memberOptions"></b-form-select>
      </b-form-group>
  
      <b-table :items="filteredCompletions" :fields="fields" responsive>
        <template #cell(status)="{ item }">
          <b-badge :variant="item.status === 'Completed' ? 'success' : 'secondary'">
            {{ item.status }}
          </b-badge>
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedMember: null,
        completions: [
          { member: 'John Doe', workout: 'HIIT', date: '2025-07-05', status: 'Completed' },
          { member: 'Jane Smith', workout: 'Yoga', date: '2025-07-05', status: 'Pending' },
          { member: 'John Doe', workout: 'Strength', date: '2025-07-06', status: 'Completed' }
        ],
        memberOptions: [
          { value: null, text: 'All Members' },
          { value: 'John Doe', text: 'John Doe' },
          { value: 'Jane Smith', text: 'Jane Smith' }
        ],
        fields: [
          { key: 'member', label: 'Member' },
          { key: 'workout', label: 'Workout' },
          { key: 'date', label: 'Date' },
          { key: 'status', label: 'Status' }
        ]
      };
    },
    computed: {
      filteredCompletions() {
        if (!this.selectedMember) return this.completions;
        return this.completions.filter(c => c.member === this.selectedMember);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  </style>