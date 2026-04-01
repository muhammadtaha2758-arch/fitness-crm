<template>
    <div class="container py-4">
      <h2 class="mb-4">Workout Plans</h2>
  
      <b-form @submit.prevent="addPlan" class="mb-4">
        <b-row>
          <b-col md="6">
            <b-form-group label="Plan Name">
              <b-form-input v-model="newPlan.name"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Duration (days)">
              <b-form-input type="number" v-model="newPlan.duration"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="success">Add Plan</b-button>
      </b-form>
  
      <b-table :items="plans" :fields="fields" responsive>
        <template #cell(actions)="{ item, index }">
          <b-button size="sm" variant="primary" @click="editPlan(index)">Edit</b-button>
          <b-button size="sm" variant="danger" @click="removePlan(index)">Delete</b-button>
        </template>
      </b-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPlan: { name: '', duration: '' },
        plans: [
          { name: 'Beginner 7-Day Plan', duration: 7 },
          { name: 'Fat Burn 30-Day Challenge', duration: 30 }
        ],
        fields: [
          { key: 'name', label: 'Plan Name' },
          { key: 'duration', label: 'Duration (days)' },
          { key: 'actions', label: 'Actions' }
        ]
      };
    },
    methods: {
      addPlan() {
        if (this.newPlan.name && this.newPlan.duration) {
          this.plans.push({ ...this.newPlan });
          this.newPlan = { name: '', duration: '' };
        }
      },
      editPlan(index) {
        alert(`Edit plan at index: ${index}`);
      },
      removePlan(index) {
        this.plans.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  </style>