<template>
  <div class="main-content">
    <!-- Breadcrumb and Navigation Row -->
    <div class="breadcrumb-nav-row">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb-section">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <div class="breadcrumb-container">
            <button 
              @click.stop="goBack" 
              class="back-button"
              type="button"
              title="Go back"
              style="color: #252525;"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/app/Members/ViewAllMembers">
                  <i class="fas fa-home"></i>
                  Dashboard
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/app/settings">
                  <i class="fas fa-cogs"></i>
                  Settings
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="fas fa-shield-alt"></i>
                Group Permissions
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="roles"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-sort-change="onSortChange"
        @on-search="onSearch"
        :search-options="{
        enabled: true,
        placeholder: Search_this_table,  
      }"
        :pagination-options="{
        enabled: true,
        mode: 'records',
        nextLabel: 'next',
        prevLabel: 'prev',
      }"
        styleClass="table-hover tableOne vgt-table"
      >
        <div slot="table-actions" class="mt-2 mb-3">
          <router-link
            class="btn-rounded btn btn-primary ripple btn-icon m-1"
            v-if="currentUserPermissions && currentUserPermissions.includes('permissions_add')"
            to="/app/Settings/Permissions/store"
          >
            <span class="ul-btn__icon">
              <i class="i-Add"></i>
            </span>
            <span class="ul-btn__text ml-1">Add</span>
          </router-link>
        </div>

        <template slot="table-row" slot-scope="props" v-if="props.row.id !== 1">
  <span v-if="props.column.field == 'actions'" class="action-icons">
    <router-link
      v-if="currentUserPermissions && currentUserPermissions.includes('permissions_edit')"
      title="Edit"
      v-b-tooltip.hover
      :to="'/app/Settings/Permissions/edit/' + props.row.id"
    >
      <i class="i-Edit text-25 text-success"></i>
    </router-link>

    <a
      title="Delete"
      v-b-tooltip.hover
      v-if="currentUserPermissions && currentUserPermissions.includes('permissions_delete')"
      @click="Delete_Role(props.row.id)"
    >
      <i class="i-Close-Window text-25 text-danger"></i>
    </a>
  </span>
</template>

        
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Permissions"
  },
  data() {
    return {
      isLoading: true,
      serverParams: {
        columnFilters: {},
        sort: {
          field: "id",
          type: "desc"
        },
        page: 1,
        perPage: 10
      },
      totalRows: "",
      search: "",
      limit: "10",
      roles: []
    };
  },

  computed: {
    ...mapGetters(["currentUserPermissions"]),
    columns() {
      return [
        {
          label: this.RoleName,
          field: "name",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.Description,
          field: "description",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.Action,
          field: "actions",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
          sortable: false
        }
      ];
    }
  },

  methods: {
    goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({ name: 'ViewAllMembers' });
      }
    },

    //---- update Params Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },

    //---- Event Page Change
    onPageChange({ currentPage }) {
      if (this.serverParams.page !== currentPage) {
        this.updateParams({ page: currentPage });
        this.Get_Roles(currentPage);
      }
    },

    //---- Event Per Page Change
    onPerPageChange({ currentPerPage }) {
      if (this.limit !== currentPerPage) {
        this.limit = currentPerPage;
        this.updateParams({ page: 1, perPage: currentPerPage });
        this.Get_Roles(1);
      }
    },

    //---- Event sort change
    onSortChange(params) {
      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
      });
      this.Get_Roles(this.serverParams.page);
    },

    //---- Event Search
    onSearch(value) {
      this.search = value.searchTerm;
      this.Get_Roles(this.serverParams.page);
    },
    //------------------------ Get All Roles -------------------\\
    Get_Roles(page) {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get(
          "roles?page=" +
            page +
            "&SortField=" +
            this.serverParams.sort.field +
            "&SortType=" +
            this.serverParams.sort.type +
            "&search=" +
            this.search +
            "&limit=" +
            this.limit
        )
        .then(response => {
          this.roles = response.data.roles;
          this.totalRows = response.data.totalRows;

          // Complete the animation of theprogress bar.
          NProgress.done();
          this.isLoading = false;
        })
        .catch(response => {
          // Complete the animation of theprogress bar.
          NProgress.done();
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //------------------------ Delete Role -------------------\
    Delete_Role(id) {
      this.$swal({
        title: this.Delete.Title,
        text: this.Delete.Text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: this.Delete.cancelButtonText,
        confirmButtonText: this.Delete.confirmButtonText
      }).then(result => {
        if (result.value) {
          axios
            .delete("roles/" + id)
            .then(() => {
              this.$swal(
                this.Delete.Deleted,
                this.Delete.RoleDeleted,
                "success"
              );

              Fire.$emit("Delete_role");
            })
            .catch(() => {
              this.$swal(
                this.Delete.Failed,
                this.Delete.Therewassomethingwronge,
                "warning"
              );
            });
        }
      });
    },
   
  }, //end Methods

  created: function() {
    this.Get_Roles(1);

    Fire.$on("Delete_role", () => {
      setTimeout(() => {
        this.Get_Roles(this.serverParams.page);
      }, 500);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../assets/styles/sass/_variables.scss";

table.vgt-table td{
  padding: 0.75em 0.75em 0.75em 0.75em !important;
}
.breadcrumb h1, .breadcrumb ul li a{
  color: #252525;
}
.action-icons {
  display: inline-flex;
  align-items: center;
}

.action-icons > *:not(:last-child) {
  margin-right: 10px; /* Adjust spacing as needed */
}

</style>