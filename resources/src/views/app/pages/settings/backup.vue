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
                <i class="fas fa-database"></i>
                Backup Database
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>
    <b-card class="wrapper" v-if="!isLoading">
      <div class="backup-info-box">
        <div class="info-content">
          <div class="info-title">Backup Location</div>
          <div class="info-description">
            You_will_find_your_backup_on 
            <code class="backup-path">/storage/app/public/backup</code> 
            and_save_it_to_your_pc
          </div>
        </div>
      </div>
      <vue-good-table
        mode="remote"
        :columns="columns"
        :totalRows="totalRows"
        :rows="backups"
        styleClass="table-hover tableOne vgt-table"
      >
        <div slot="table-actions" class="mt-2 mb-3">
          <b-button
            @click="GenerateBackup()"
            size="sm"
            class="btn-rounded"
            variant="btn btn-primary btn-icon m-1"
          >
            <i class="i-Add"></i>
            GenerateBackup
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'actions'">
            <!-- <a v-b-tooltip.hover @click="DownloadBackup(props.row.date)" title="Download">
              <i class="i-Download text-25 text-success"></i>
            </a> -->
            <a title="Delete" v-b-tooltip.hover @click="DeleteBackup(props.row.date)">
              <i class="i-Close-Window text-25 text-danger"></i>
            </a>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Backup"
  },
  data() {
    return {
      backups: [],
      isLoading: true,
      totalRows: ""
    };
  },

  computed: {
    columns() {
      return [
        {
          label: this.date,
          field: "date",
          tdClass: "text-left",
          thClass: "text-left"
        },
        {
          label: this.Filesize,
          field: "size",
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

    //---------------------------------- Generate Backup --------------------\\

    GenerateBackup() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get("generate_new_backup")
        .then(response => {
          Fire.$emit("Generate_Backup");
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
        })
        .catch(response => {
          // Complete the animation of the  progress bar.
          setTimeout(() => NProgress.done(), 500);
        });
    },

  
    //----------------------------------------  Get All backups -------------------------\\
    Get_Backups() {
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get("get_backup")
        .then(response => {
          this.backups = response.data.backups;
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

    //--------------------------------- Delete Backup --------------------\\
    DeleteBackup(date) {
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
            .delete("delete_backup/" + date)
            .then(() => {
              this.$swal(
                this.Delete.Deleted,
                this.Delete.BackupDeleted,
                "success"
              );

              Fire.$emit("Delete_Backup");
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
    }
  }, //end Method

  //----------------------------- Created function-------------------
  created: function() {
    this.Get_Backups();

    Fire.$on("Generate_Backup", () => {
      setTimeout(() => {
        this.Get_Backups();
      }, 500);
    });

    Fire.$on("Delete_Backup", () => {
      setTimeout(() => {
        this.Get_Backups();
        // Complete the animation of the  progress bar.
        NProgress.done();
      }, 500);
    });
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Backup Info Box
.backup-info-box {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(135deg, color.adjust($color-button, $lightness: 45%) 0%, color.adjust($color-button, $lightness: 40%) 100%);
  border: $border-width-sm $border-style-solid color.adjust($color-button, $lightness: 30%);
  border-radius: $border-radius-md;
  padding: $padding-md;
  margin-bottom: $margin-lg;
  box-shadow: $box-shadow-sm;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: $box-shadow-md;
  }
  
  .info-content {
    flex: 1;
    
    .info-title {
      color: $color-button;
      font-weight: $font-weight-semibold;
      font-size: $font-size-md;
      margin-bottom: $margin-xs;
      text-transform: uppercase;
      letter-spacing: $letter-spacing-sm;
    }
    
    .info-description {
      color: $color-text-dark;
      font-size: $font-size-sm;
      line-height: $line-height-base;
      margin: 0;
      
      .backup-path {
        background: $color-white;
        color: $color-button;
        padding: $padding-xs $padding-sm;
        border-radius: $border-radius-sm;
        font-family: 'Courier New', monospace;
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        border: $border-width-sm $border-style-solid color.adjust($color-button, $lightness: 20%);
        margin: 0 $margin-xs;
        display: inline-block;
        transition: all 0.2s ease;
        
        &:hover {
          background: $color-button;
          color: $color-white;
          transform: scale(1.05);
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: $breakpoint-md) {
  .backup-info-box {
    flex-direction: column;
    text-align: center;
    
    .info-content .info-title {
      text-align: center;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .backup-info-box {
    padding: $padding-sm;
    
    .info-content {
      .info-title {
        font-size: $font-size-sm;
      }
      
      .info-description {
        font-size: $font-size-xs;
        
        .backup-path {
          font-size: $font-size-xxs;
          padding: $padding-xxs $padding-xs;
        }
      }
    }
  }
}
</style>