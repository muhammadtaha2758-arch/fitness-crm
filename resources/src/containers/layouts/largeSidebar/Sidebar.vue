<template>
    <div
        class="side-content-wrap"
        @mouseenter="isMenuOver = true"
        @mouseleave="isMenuOver = false"
        @touchstart="isMenuOver = true"
    >
        <vue-perfect-scrollbar
            :settings="{ suppressScrollX: true, suppressScrollY: false, wheelPropagation: false }"
            :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
            ref="myData"
            class="sidebar-left rtl-ps-none ps scroll"
        >
            <div>
                <ul class="navigation-left">
                    <!-- 1. Dashboard -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'dashboard' }"
                        class="nav-item"
                        data-item="dashboard"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('dashboard')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/dashboard"
                        >
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <span class="nav-text">{{ $t("Dashboard") }}</span>
                        </router-link>
                    </li>

                    <!-- 2. Members Management -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Members' }"
                        class="nav-item members-default"
                        data-item="Members"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('members_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold members-link"
                            to="/app/Members/ViewAllMembers"
                        >
                            <i class="nav-icon fas fa-users"></i>
                            <span class="nav-text">{{ $t("Members") }}</span>
                        </router-link>
                    </li>

                    <!-- 3. Coaches -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Staff' }"
                        class="nav-item"
                        data-item="Staff"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('staff_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Staff/coachlist"
                        >
                            <i class="nav-icon fas fa-dumbbell"></i>
                            <span class="nav-text">{{ $t("Coaches") }}</span>
                        </router-link>
                    </li>

                    <!-- 4. Schedule -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Schedule' }"
                        class="nav-item"
                        data-item="Schedule"
                        v-if="
                            currentUserPermissions &&
                            (currentUserPermissions.includes('appointments_view') ||
                             currentUserPermissions.includes('schedule_view'))
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/schedule"
                        >
                            <i class="nav-icon fas fa-calendar-week"></i>
                            <span class="nav-text">{{ $t("Schedule") }}</span>
                        </router-link>
                    </li>

                    <!-- 5. Appointments -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Appointment' }"
                        class="nav-item"
                        data-item="Appointment"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('appointments_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Appointment"
                        >
                            <i class="nav-icon fas fa-calendar-alt"></i>
                            <span class="nav-text">{{
                                $t("Appointments")
                            }}</span>
                        </router-link>
                    </li>

                    <!-- 6. Workouts -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Workout' }"
                        class="nav-item"
                        data-item="Workout"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('workout_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Workout/Workoutlibrary"
                        >
                            <i class="nav-icon fas fa-running"></i>
                            <span class="nav-text">{{ $t("Workouts") }}</span>
                        </router-link>
                    </li>

                    <!-- 7. Challenges -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'challenges' }"
                        class="nav-item"
                        data-item="challenges"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('challenges_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/challenges"
                        >
                            <i class="nav-icon fas fa-trophy"></i>
                            <span class="nav-text">{{ $t("Challenges") }}</span>
                        </router-link>
                    </li>

                    <!-- 8. Nutrition Hub -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Nutrition' }"
                        class="nav-item"
                        data-item="Nutrition"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('nutrition_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/nutrition"
                        >
                            <i class="nav-icon fas fa-apple-alt"></i>
                            <span class="nav-text">{{ $t("Nutrition Hub") }}</span>
                        </router-link>
                    </li>

                    <!-- 9. Community -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Community' }"
                        class="nav-item"
                        data-item="Community"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('community_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/community"
                        >
                            <i class="nav-icon fas fa-users"></i>
                            <span class="nav-text">{{ $t("Community") }}</span>
                        </router-link>
                    </li>

                    <!-- 10. Tasks -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Tasks' }"
                        class="nav-item"
                        data-item="Tasks"
                        v-if="
                            currentUserPermissions &&
                            (currentUserPermissions.includes('members_view') ||
                             currentUserPermissions.includes('staff_view'))
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/tasks"
                        >
                            <i class="nav-icon fas fa-tasks"></i>
                            <span class="nav-text">Tasks</span>
                        </router-link>
                    </li>

                    <!-- 11. Check-in -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'checkin' }"
                        class="nav-item"
                        data-item="checkin"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('checkin_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/checkin"
                        >
                            <i class="nav-icon fas fa-sign-in-alt"></i>
                            <span class="nav-text">{{ $t("Check-in") }}</span>
                        </router-link>
                    </li>

                    <!-- 12. Business Analytics -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'business-analytics' }"
                        class="nav-item"
                        data-item="business-analytics"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('dashboard')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/business-analytics"
                        >
                            <i class="nav-icon fas fa-chart-bar"></i>
                            <span class="nav-text">{{ $t("Business analytics") }}</span>
                        </router-link>
                    </li>

                    <!-- 13. Invoices -->
                    <li
                        :class="{ active: selectedParentMenu == 'invoices' }"
                        class="nav-item"
                        data-item="invoices"
                        v-if="currentUserPermissions && currentUserPermissions.includes('payments_invoices')"
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/payments/invoices"
                        >
                            <i class="nav-icon fas fa-file-invoice"></i>
                            <span class="nav-text">{{ $t("Invoices") }}</span>
                        </router-link>
                    </li>

                    <!-- 14. Coach Ratings -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'ratings' }"
                        class="nav-item"
                        data-item="ratings"
                        v-if="
                            currentUserPermissions &&
                            (currentUserPermissions.includes('dashboard') ||
                             currentUserPermissions.includes('appointments_view'))
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/reports/ratings"
                        >
                            <i class="nav-icon fas fa-star"></i>
                            <span class="nav-text">{{ $t("Coach Ratings") }}</span>
                        </router-link>
                    </li>

                    <!-- 15. System Settings -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Settings' }"
                        class="nav-item"
                        data-item="Settings"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('setting_system')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Settings/system_settings"
                        >
                            <i class="nav-icon fas fa-cog"></i>
                            <span class="nav-text">{{ $t("System Settings") }}</span>
                        </router-link>
                    </li>

                    <!-- 16. Mobile Apps -->
                    <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'mobile-apps' }"
                        class="nav-item"
                        data-item="mobile-apps"
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/mobile-apps"
                        >
                            <i class="nav-icon fas fa-mobile-alt"></i>
                            <span class="nav-text">Mobile Apps</span>
                        </router-link>
                    </li>

                    <!-- 17. Support -->
                    <li class="nav-item" v-if="
                        currentUserPermissions &&
                        currentUserPermissions.includes('support_view')
                    ">
                        <router-link class="nav-item-hold" to="/app/Support">
                            <i class="nav-icon fas fa-life-ring"></i>
                            <span class="nav-text">{{ $t("Support") }}</span>
                        </router-link>
                    </li>

                    <!-- 8. Communication -->
                    <!-- <li
                        @mouseenter="toggleSubMenu"
                        :class="{
                            active: selectedParentMenu == 'communication',
                        }"
                        class="nav-item"
                        data-item="communication"
                        :data-submenu="false"
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Members/send-message"
                        >
                            <i class="nav-icon fas fa-comments"></i>
                            <span class="nav-text">{{
                                $t("Communication")
                            }}</span>
                        </router-link>
                        
                        <div class="triangle"></div>
                    </li> -->

                    <!-- 9. Questionnaires -->
                    <!-- <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'questionnaires' }"
                        class="nav-item"
                        data-item="questionnaires"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('questionnaires_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/questionnaires"
                        >
                            <i class="nav-icon fas fa-clipboard-list"></i>
                            <span class="nav-text">{{ $t("Questionnaires") }}</span>
                        </router-link>
                    </li> -->

                    <!-- 10. Financial -->
                    <!-- <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'Financial' }"
                        class="nav-item"
                        data-item="Financial"
                        v-if="
                            currentUserPermissions &&
                            currentUserPermissions.includes('financial_view')
                        "
                    >
                        <router-link
                            class="nav-item-hold"
                            to="/app/Financial"
                        >
                            <i class="nav-icon fas fa-chart-line"></i>
                            <span class="nav-text">{{ $t("Financial") }}</span>
                        </router-link>
                    </li> -->

                    <!-- 15. Reports & Analytics -->
                    <!-- <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'reports' }"
                        class="nav-item"
                        data-item="reports"
                        :data-submenu="true"
                    >
                        <a class="nav-item-hold" href="#">
                            <i class="nav-icon fas fa-chart-line"></i>
                            <span class="nav-text">{{ $t("Reports") }}</span>
                        </a>
                        <div class="triangle"></div>
                    </li> -->

                    <!-- 16. App Content / Resources -->
                    <!-- <li
                        @mouseenter="toggleSubMenu"
                        :class="{ active: selectedParentMenu == 'resources' }"
                        class="nav-item"
                        data-item="resources"
                        :data-submenu="true"
                    >
                        <a class="nav-item-hold" href="#">
                            <i class="nav-icon fas fa-book"></i>
                            <span class="nav-text">{{
                                $t("App Contents")
                            }}</span>
                        </a>
                        <div class="triangle"></div>
                    </li> -->

                    <!-- 17. Settings -->
                    <!-- Original Settings with submenu (commented out) -->
                    <!-- <li
                        @click="toggleInlineSubmenu"
                        :class="{ active: selectedParentMenu == 'admin', 'submenu-open': isSubmenuOpen('admin') }"
                        class="nav-item has-submenu"
                        data-item="admin"
                        :data-submenu="true"
                        v-if="
                            currentUserPermissions &&
                            (currentUserPermissions.includes('setting_system') ||
                             currentUserPermissions.includes('user_role_view') ||
                             currentUserPermissions.includes('backup_view') ||
                             currentUserPermissions.includes('notification_view') ||
                             currentUserPermissions.includes('payment_gateway_view') ||
                             currentUserPermissions.includes('mail_settings_view') ||
                             currentUserPermissions.includes('email_templates_view') ||
                             currentUserPermissions.includes('subscription_plans_view'))
                        "
                    >
                        <a class="nav-item-hold" href="#">
                            <i class="nav-icon fas fa-cog"></i>
                            <span class="nav-text">{{ $t("Settings") }}</span>
                            <i class="submenu-arrow fas fa-chevron-down"></i>
                        </a>
                        <ul class="inline-submenu" v-show="isSubmenuOpen('admin')">
                            <li class="nav-item" v-if="currentUserPermissions.includes('setting_system')">
                                <router-link class="nav-link" to="/app/Settings/system_settings">
                                    <i class="nav-icon fas fa-cogs"></i>
                                    <span class="item-name">{{ $t("System") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('user_role_view')">
                                <router-link class="nav-link" to="/app/Settings/Permissions">
                                    <i class="nav-icon i-Key"></i>
                                    <span class="item-name">{{ $t("User Role") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('backup_view')">
                                <router-link class="nav-link" to="/app/Settings/backup">
                                    <i class="nav-icon fas fa-database"></i>
                                    <span class="item-name">{{ $t("Data Backup") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('notification_view')">
                                <router-link class="nav-link" to="/app/admin/notification-preferences">
                                    <i class="nav-icon fas fa-bell"></i>
                                    <span class="item-name">{{ $t("Notification") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('payment_gateway_view')">
                                <router-link class="nav-link" to="/app/Settings/payment_gateway">
                                    <i class="nav-icon fas fa-credit-card"></i>
                                    <span class="item-name">{{ $t("Payment Gateway") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('mail_settings_view')">
                                <router-link class="nav-link" to="/app/Settings/mail_settings">
                                    <i class="nav-icon fas fa-cog"></i>
                                    <span class="item-name">{{ $t("Mail Settings") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('email_templates_view')">
                                <router-link class="nav-link" to="/app/Settings/email_templates">
                                    <i class="nav-icon fas fa-envelope"></i>
                                    <span class="item-name">{{ $t("Email Templates") }}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="currentUserPermissions.includes('subscription_plans_view')">
                                <router-link class="nav-link" to="/app/Settings/SubscriptionPlans">
                                    <i class="nav-icon fas fa-receipt"></i>
                                    <span class="item-name">{{ $t("Subscription Plans") }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </li> -->

                </ul>
            </div>
        </vue-perfect-scrollbar>

        <vue-perfect-scrollbar
            :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
            :settings="{ suppressScrollX: true, suppressScrollY: false, wheelPropagation: false }"
            class="sidebar-left-secondary ps rtl-ps-none"
            @mouseenter="handleSecondarySidebarHover"
            @mouseleave="handleSecondarySidebarLeave"
        >
            <div ref="sidebarChild">
                <!-- Members Management Submenu -->
                <!-- <ul
                    class="childNav d-none"
                    data-parent="Members"
                    :class="{ 'd-block': selectedParentMenu == 'Members' }"
                > -->
                    <!-- View All Members -->
                    <!-- <li class="nav-item" data-item="ViewAllMembers">
                        <router-link
                            class="nav-link"
                            to="/app/Members/ViewAllMembers"
                        >
                            <i class="nav-icon fas fa-users"></i>
                            <span class="item-name">{{
                                $t("View All Members")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Add New Member -->
                    <!-- <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/app/Members/AddNewMember"
                        >
                            <i class="nav-icon fas fa-user-plus"></i>
                            <span class="item-name">{{
                                $t("Add New Member")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Member Details -->
                    <!-- <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/app/Members/MemberDetails"
                        >
                            <i class="nav-icon fas fa-eye"></i>
                            <span class="item-name">{{
                                $t("Member Details")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Member Insights -->
                    <!-- <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/app/Members/MemberInsights"
                        >
                            <i class="nav-icon fas fa-chart-pie"></i>
                            <span class="item-name">{{
                                $t("Member Insights")
                            }}</span>
                        </router-link>
                    </li> -->


                    <!-- Progress Tracker -->
                    <!-- <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/app/Members/ProgressTracker"
                        >
                            <i class="nav-icon fas fa-chart-bar"></i>
                            <span class="item-name">{{
                                $t("Progress Tracker")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Attendance Tracker -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Members/AttendanceTracker"
                        >
                            <i class="nav-icon fas fa-calendar-check"></i>
                            <span class="item-name">{{
                                $t("Attendance Tracker")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Check-in Logs -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Members/MemberCheck-InLogs"
                        >
                            <i class="nav-icon fas fa-clock"></i>
                            <span class="item-name">{{
                                $t("Member Check-in Logs")
                            }}</span>
                        </router-link>
                    </li> -->
                <!-- </ul> -->


                <!-- Challenges Submenu -->
                <!-- <ul
                    class="childNav d-none"
                    data-parent="challenges"
                    :class="{ 'd-block': selectedParentMenu == 'challenges' }"
                >
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/challenges/create">
                            <i class="nav-icon fas fa-plus-circle"></i>
                            <span class="item-name">{{
                                $t("Create New Challenge")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/challenges/active">
                            <i class="nav-icon fas fa-folder-open"></i>
                            <span class="item-name">{{
                                $t("Manage Active Challenges")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/app/challenges/participants"
                        >
                            <i class="nav-icon fas fa-users"></i>
                            <span class="item-name">{{
                                $t("Challenge Participants List")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
            <router-link class="nav-link" to="/app/challenges/leaderboard">
              <i class="nav-icon fas fa-trophy"></i>
              <span class="item-name">{{$t('Challenge Leaderboard')}}</span>
            </router-link>
          </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/challenges/reports">
                            <i class="nav-icon fas fa-chart-line"></i>
                            <span class="item-name">{{
                                $t("Challenge Reports & Analytics")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
            <router-link class="nav-link" to="/app/challenges/rewards">
              <i class="nav-icon fas fa-gift"></i>
              <span class="item-name">{{$t('Rewards & Prizes Setup')}}</span>
            </router-link>
          </li>
                </ul> -->

                <!-- Workouts Submenu -->
                <ul
                    class="childNav d-none"
                    data-parent="Workout"
                    :class="{ 'd-block': selectedParentMenu == 'Workout' }"
                >
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/Workoutlibrary"
                        >
                            <i class="nav-icon fas fa-book-open"></i>
                            <span class="item-name">{{
                                $t("Workout Plan Library")
                            }}</span>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/AssignWorkout"
                        >
                            <i class="nav-icon fas fa-user-friends"></i>
                            <span class="item-name">{{
                                $t("Assign Workouts to Members")
                            }}</span>
                        </router-link>
                    </li> -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/Track_Completion"
                        >
                            <i class="nav-icon fas fa-chart-bar"></i>
                            <span class="item-name">{{
                                $t("Track Completion Stats")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Plans & Programs -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/Plans_Programs"
                        >
                            <i class="nav-icon fas fa-plus-circle"></i>
                            <span class="item-name">{{
                                $t("Plans & Programs")
                            }}</span>
                        </router-link>
                    </li> -->

                    <!-- Activity List -->
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/ActivityList"
                        >
                            <i class="nav-icon fas fa-list"></i>
                            <span class="item-name">{{
                                $t("Activity List")
                            }}</span>
                        </router-link>
                    </li>

                    <!-- Workout Analytics -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/Workout/WorkoutAnalytics"
                        >
                            <i class="nav-icon fas fa-chart-line"></i>
                            <span class="item-name">{{
                                $t("Workout Analytics")
                            }}</span>
                        </router-link>
                    </li> -->
                </ul>

                <!-- Nutrition Submenu -->
                <!-- <ul
                    class="childNav d-none"
                    data-parent="Nutrition"
                    :class="{ 'd-block': selectedParentMenu == 'Nutrition' }"
                >
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/nutrition/meal-logs"
                        >
                            <i class="nav-icon fas fa-folder-open"></i>
                            <span class="item-name">{{
                                $t("Member Meal Logs")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/nutrition/meal-plans"
                        >
                            <i class="nav-icon fas fa-plus-circle"></i>
                            <span class="item-name">{{
                                $t("Create Meal Plans")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/nutrition/rdi">
                            <i class="nav-icon fas fa-chart-bar"></i>
                            <span class="item-name">{{
                                $t("Recommended Daily Intakes (RDIs)")
                            }}</span>
                        </router-link>
                    </li>
                     <li class="nav-item">
            <router-link class="nav-link" to="/app/nutrition/sync-apps">
              <i class="nav-icon fas fa-cloud"></i>
              <span class="item-name">{{$t('Sync with Nutrition Apps')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/app/nutrition/upload-food-db">
              <i class="nav-icon fas fa-upload"></i>
              <span class="item-name">{{$t('Upload/Import Food Data')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/app/nutrition/water-intake">
              <i class="nav-icon fas fa-tint"></i>
              <span class="item-name">{{$t('Water Intake Tracking')}}</span>
            </router-link>
          </li> -->
                <!-- </ul> -->

                <!-- Communication Submenu -->
                <ul
                    class="childNav d-none"
                    data-parent="communication"
                    :class="{
                        'd-block': selectedParentMenu == 'communication',
                    }"
                >
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/communication/campaigns"
                        >
                            <i class="nav-icon fas fa-comments"></i>
                            <span class="item-name">{{
                                $t("Email / SMS / App Push Campaigns")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/communication/automated-messages"
                        >
                            <i class="nav-icon fas fa-clock"></i>
                            <span class="item-name">{{
                                $t("Automated Messages")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/communication/chat">
                            <i class="nav-icon fas fa-comment-dots"></i>
                            <span class="item-name">{{
                                $t("WhatsApp / In-App Chat Integration")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/communication/notifications"
                        >
                            <i class="nav-icon fas fa-bell"></i>
                            <span class="item-name">{{
                                $t("Notifications Manager")
                            }}</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/communication/Message_Composer"
                        >
                            <i class="nav-icon fas fa-envelope"></i>
                            <span class="item-name">{{
                                $t("Message Composer")
                            }}</span>
                        </router-link>
                    </li>
                </ul>

                <!-- Payments & Billing Submenu -->
                <ul
                    class="childNav d-none"
                    data-parent="payments"
                    :class="{ 'd-block': selectedParentMenu == 'payments' }"
                >
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/payments/history">
                            <i class="nav-icon fas fa-receipt"></i>
                            <span class="item-name">{{
                                $t("History")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/payments/invoices">
                            <i class="nav-icon fas fa-file-invoice"></i>
                            <span class="item-name">{{
                                $t("Invoices")
                            }}</span>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/app/Settings/paysafecard_payment">
                            <i class="nav-icon fas fa-credit-card text-success"></i>
                            <span class="item-name">{{
                                $t("PaysafeCard Payment")
                            }}</span>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/payments/plans">
                            <i class="nav-icon fas fa-receipt"></i>
                            <span class="item-name">{{
                                $t("Membership Plan")
                            }}</span>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/app/payments/plans">
                            <i class="nav-icon fas fa-receipt"></i>
                            <span class="item-name">{{
                                $t("Membership Plan Configuration")
                            }}</span>
                        </router-link>
                    </li> -->
                    <!-- <li class="nav-item">
            <router-link class="nav-link" to="/app/payments/coupons">
              <i class="nav-icon fas fa-ticket-alt"></i>
              <span class="item-name">{{$t('Coupon Codes & Discounts')}}</span>
            </router-link>
          </li> -->
                    <!-- <li class="nav-item">
            <router-link class="nav-link" to="/app/payments/gateways">
              <i class="nav-icon fas fa-money-bill-wave"></i>
              <span class="item-name">{{$t('Stripe / PayPal / Manual Payments')}}</span>
            </router-link>
          </li> -->
                </ul>

                <!-- Reports & Analytics Submenu -->
                <ul
                    class="childNav d-none"
                    data-parent="reports"
                    :class="{ 'd-block': selectedParentMenu == 'reports' }"
                >
                    <li class="nav-item">
                        <router-link class="nav-link" to="/app/reports/revenue">
                            <i class="nav-icon fas fa-receipt"></i>
                            <span class="item-name">{{
                                $t("Revenue & Subscription Reports")
                            }}</span>
                        </router-link>
                    </li>
                </ul>

                <!-- App Content / Resources Submenu -->
                <!-- <ul
          class="childNav d-none"
          data-parent="resources"
          :class="{ 'd-block': selectedParentMenu == 'resources' }"
        >
          <li class="nav-item">
            <router-link class="nav-link" to="/app/resources/knowledge-base">
              <i class="nav-icon fas fa-book"></i>
              <span class="item-name">{{$t('Knowledge Base')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/app/resources/upload-videos">
              <i class="nav-icon fas fa-upload"></i>
              <span class="item-name">{{$t('Upload Workout / Meal Videos')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/app/resources/faqs">
              <i class="nav-icon fas fa-question-circle"></i>
              <span class="item-name">{{$t('FAQs & Client Resources')}}</span>
            </router-link>
          </li>
        </ul> -->

                <!-- Admin Tools & Settings Submenu -->
                <ul
                    class="childNav d-none"
                    data-parent="admin"
                    :class="{ 'd-block': selectedParentMenu == 'admin' }"
                >
                <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/system_settings"
                        >
                            <i class="nav-icon fas fa-cogs"></i>
                            <span class="item-name">{{
                                $t("System")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/Permissions"
                        >
                            <i class="nav-icon i-Key"></i>
                            <span class="item-name">{{
                                $t("User Role")
                            }}</span>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/app/admin/crm-config">
                            <i class="nav-icon fas fa-cog"></i>
                            <span class="item-name">{{
                                $t("CRM Configuration")
                            }}</span>
                        </router-link>
                    </li> -->
                    <!-- <li class="nav-item">
                        <router-link
                            class
                            to="/app/admin/api-integrations"
                        >
                            <i class="nav-icon fas fa-cloud"></i>
                            <span class="item-name">{{
                                $t("API Integrations")
                            }}</span>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/backup"
                        >
                            <i class="nav-icon fas fa-database"></i>
                            <span class="item-name">{{
                                $t("Data Backup")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/admin/notification-preferences"
                        >
                            <i class="nav-icon fas fa-bell"></i>
                            <span class="item-name">{{
                                $t("Notification")
                            }}</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/payment_gateway"
                        >
                            <i class="nav-icon fas fa-credit-card"></i>
                            <span class="item-name">{{
                                $t("Payment Gateway")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/mail_settings"
                        >
                            <i class="nav-icon fas fa-cog"></i>
                            <span class="item-name">{{
                                $t("Mail Settings")
                            }}</span>
                        </router-link>
                    </li>
                    
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/email_templates"
                        >
                            <i class="nav-icon fas fa-envelope"></i>
                            <span class="item-name">{{
                                $t("Email Templates")
                            }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class
                            to="/app/Settings/SubscriptionPlans"
                        >
                            <i class="nav-icon fas fa-receipt"></i>
                            <span class="item-name">{{
                                $t("Subscription Plans")
                            }}</span>
                        </router-link>
                    </li>

                </ul>
            </div>
        </vue-perfect-scrollbar>
        <div
            @click="removeOverlay()"
            class="sidebar-overlay"
            :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
        ></div>
    </div>
    <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Topnav,
    },

    data() {
        return {
            isDisplay: true,
            isMenuOver: false,
            isStyle: true,
            selectedParentMenu: "",
            isMobile,
            hoverTimeout: null,
            openSubmenus: [], // Track which submenus are open
        };
    },
    mounted() {
        this.toggleSelectedParentMenu();
        window.addEventListener("resize", this.handleWindowResize);
        document.addEventListener("click", this.returnSelectedParentMenu);
        this.handleWindowResize();
    },
    
    watch: {
        '$route'(to, from) {
            // Update active menu when route changes
            this.toggleSelectedParentMenu();
        }
    },

    beforeDestroy() {
        // Clear any pending timeout
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        
        document.removeEventListener("click", this.returnSelectedParentMenu);
        window.removeEventListener("resize", this.handleWindowResize);
    },

    computed: {
        ...mapGetters(["getSideBarToggleProperties", "currentUserPermissions"]),
    },

    methods: {
        ...mapActions([
            "changeSecondarySidebarProperties",
            "changeSecondarySidebarPropertiesViaMenuItem",
            "changeSecondarySidebarPropertiesViaOverlay",
            "changeSidebarProperties",
        ]),

        handleWindowResize() {
            if (window.innerWidth <= 1200) {
                if (this.getSideBarToggleProperties.isSideNavOpen) {
                    this.changeSidebarProperties();
                }
                if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
                    this.changeSecondarySidebarProperties();
                }
            } else {
                if (!this.getSideBarToggleProperties.isSideNavOpen) {
                    this.changeSidebarProperties();
                }
            }
        },
        toggleSelectedParentMenu() {
            const currentParentUrl = this.$route.path
                .split("/")
                .filter((x) => x !== "")[1];
            
            // Special case: if on Dashboard page, set dashboard as active
            if (this.$route.path.includes('/dashboard') || 
                this.$route.path === '/app/dashboard') {
                this.selectedParentMenu = "dashboard";
            } else if (this.$route.path.includes('/business-analytics') || 
                this.$route.path === '/app/business-analytics') {
                this.selectedParentMenu = "business-analytics";
            } else if (this.$route.path.includes('/Members/ViewAllMembers') || 
                this.$route.path === '/app/Members/ViewAllMembers') {
                this.selectedParentMenu = "Members";
            } else if (this.$route.path.includes('/Workout/Workoutlibrary') || 
                this.$route.path === '/app/Workout/Workoutlibrary') {
                this.selectedParentMenu = "Workout";
            } else if (this.$route.path.includes('/schedule') || 
                this.$route.path === '/app/schedule') {
                this.selectedParentMenu = "Schedule";
            } else if (this.$route.path.includes('/Settings') || 
                this.$route.path.includes('/app/Settings')) {
                this.selectedParentMenu = "Settings";
            } else if (this.$route.path.includes('/reports/ratings') || 
                this.$route.path.includes('/app/reports/ratings')) {
                this.selectedParentMenu = "ratings";
            } else if (this.$route.path.includes('/reports') || 
                this.$route.path.includes('/app/reports')) {
                this.selectedParentMenu = "reports";
            } else if (this.$route.path.includes('/tasks') || 
                this.$route.path === '/app/tasks') {
                this.selectedParentMenu = "Tasks";
            } else if (currentParentUrl !== undefined && currentParentUrl !== null) {
                this.selectedParentMenu = currentParentUrl;
            } else {
                // Set Dashboard as default active
                this.selectedParentMenu = "dashboard";
            }
        },
        toggleSubMenu(e) {
            let hasSubmenu = e.target.dataset.submenu;
            let parent = e.target.dataset.item;

            if (hasSubmenu) {
                this.selectedParentMenu = parent;

                this.changeSecondarySidebarPropertiesViaMenuItem(true);
            } else {
                this.selectedParentMenu = parent;
                this.changeSecondarySidebarPropertiesViaMenuItem(false);
            }
        },

        removeOverlay() {
            // Clear timeout and close secondary sidebar
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }
            
            this.changeSecondarySidebarPropertiesViaOverlay();
            if (window.innerWidth <= 1200) {
                this.changeSidebarProperties();
            }
            this.toggleSelectedParentMenu();
        },
        returnSelectedParentMenu() {
            if (!this.isMenuOver) {
                this.toggleSelectedParentMenu();
            }
        },

        toggleSidebarDropdwon(event) {
            let dropdownMenus = this.$el.querySelectorAll(
                ".dropdown-sidemenu.open"
            );

            event.currentTarget.classList.toggle("open");

            dropdownMenus.forEach((dropdown) => {
                dropdown.classList.remove("open");
            });
        },

        handleNavHover(e) {
            let parent = e.target.dataset.item;
            let hasSubmenu = e.target.dataset.submenu;

            if (hasSubmenu) {
                this.selectedParentMenu = parent;
                this.changeSecondarySidebarPropertiesViaMenuItem(true);
            }
        },

        handleNavLeave(e) {
            // Simple timeout to close submenu
            this.hoverTimeout = setTimeout(() => {
                this.changeSecondarySidebarPropertiesViaMenuItem(false);
            }, 150);
        },

        handleSecondarySidebarHover() {
            // Clear timeout when hovering over secondary sidebar
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }
        },

        handleSecondarySidebarLeave() {
            // Close after delay when leaving secondary sidebar
            this.hoverTimeout = setTimeout(() => {
                this.changeSecondarySidebarPropertiesViaMenuItem(false);
            }, 150);
        },

        // New methods for inline submenus
        toggleInlineSubmenu(event) {
            const menuItem = event.currentTarget.dataset.item;
            const index = this.openSubmenus.indexOf(menuItem);
            
            if (index > -1) {
                // Close the submenu
                this.openSubmenus.splice(index, 1);
            } else {
                // Open the submenu
                this.openSubmenus.push(menuItem);
            }
        },

        isSubmenuOpen(menuItem) {
            return this.openSubmenus.includes(menuItem);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/sass/_variables.scss";

// Sidebar responsive improvements
.side-content-wrap {
    // height: 100%;
    display: flex;
    position: relative;
}

.sidebar-left {
    // Ensure proper scrolling on all screen sizes
    .ps {
        height: 100%;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        
        // Show scrollbar on smaller screens when needed
        @media (max-width: 1200px) {
            &::-webkit-scrollbar {
                width: 4px;
            }
            
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
            }
            
            &::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            }
        }
    }
}

// Secondary sidebar responsive improvements
.sidebar-left-secondary {
    .ps {
        height: 100%;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        
        // Show scrollbar on smaller screens when needed
        @media (max-width: 1200px) {
            &::-webkit-scrollbar {
                width: 4px;
            }
            
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
            }
            
            &::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            }
        }
    }
    
    // Better spacing for child navigation items
    .childNav {
        .nav-item {
            // Better touch targets for mobile
            @media (max-width: 768px) {
                .nav-link {
                    padding: 02px 02px;
                    min-height: 30px; // iOS recommended touch target
                }
            }
            
            @media (max-width: 576px) {
                .nav-link {
                    padding: 04px 04px;
                    min-height: 26px;
                }
            }
        }
    }
}

.navigation-left {
    // Better spacing for navigation items
    .nav-item {
        // Responsive padding for nav items
        @media (max-width: 1200px) {
            padding: 3px;
        }
        
        @media (max-width: 768px) {
            padding: 2px;
        }
        
        .nav-item-hold {
            // Responsive padding for nav links
            @media (max-width: 1200px) {
                padding: 10px 8px;
            }
            
            @media (max-width: 768px) {
                padding: 10px 8px; // Better touch target
                min-height: 44px; // iOS recommended touch target
                display: flex;
                align-items: center;
            }
            
            @media (max-width: 576px) {
                padding: 8px 6px;
                min-height: 40px;
            }
            
            .nav-text {
                // Responsive font sizes
                @media (max-width: 1200px) {
                    font-size: $font-size-xs;
                }
                
                @media (max-width: 768px) {
                    font-size: $font-size-xxs;
                }
                
                @media (max-width: 576px) {
                    font-size: $font-size-xxxs;
                }
            }
            
            .nav-icon {
                // Responsive icon sizes
                @media (max-width: 1200px) {
                    font-size: 14px;
                }
                
                @media (max-width: 768px) {
                    font-size: 12px;
                }
                
                @media (max-width: 576px) {
                    font-size: 11px;
                }
            }
        }
        
        // Better touch targets for Settings submenu toggle
        &.has-submenu {
            @media (max-width: 768px) {
                .nav-item-hold {
                    min-height: 44px;
                    cursor: pointer;
                    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
}

// Make Members section red only when active (on dashboard)
.nav-item.members-default {
    // Default styling - normal colors when not active
    .nav-item-hold {
        color: rgba(255, 255, 255, 0.7);
        font-weight: 400;
    }
    
    .nav-icon {
        color: rgba(255, 255, 255, 0.7);
    }
    
    .nav-text {
        color: rgba(255, 255, 255, 0.7);
    }
    
    &.active {
        background: transparent !important;
        
        .nav-item-hold {
            color: $primary !important;
            font-weight: 700;
            background: transparent !important;
        }
        
        .nav-icon {
            color: $primary !important;
        }
        
        .nav-text {
            color: $primary !important;
        }
    }
    
    // Hover effect for Members - neutral styling without red border
    &:hover:not(.active) {
        background-color: rgba(255, 255, 255, 0.05);
        
        .nav-item-hold {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .nav-icon {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .nav-text {
            color: rgba(255, 255, 255, 0.9);
        }
    }
    
    // Hover effect when active - neutral styling without red border
    &:hover.active {
        .nav-item-hold {
            color: $primary !important;
        }
        
        .nav-icon {
            color: $primary !important;
        }
        
        .nav-text {
            color: $primary !important;
        }
    }
}

// Ensure the red theme is applied consistently to ALL active nav items
.nav-item.active {
    background: transparent !important;
    
    .nav-item-hold {
        color: $primary !important;
        font-weight: 600;
        background: transparent !important;
    }
    
    .nav-icon {
        color: $primary !important;
    }
    
    .nav-text {
        color: $primary !important;
    }
}

// General hover effect for all nav items - neutral styling without red border
.nav-item:not(.members-default) {
    &:hover:not(.active) {
        background-color: rgba(255, 255, 255, 0.05);
        
        .nav-item-hold {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .nav-icon {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .nav-text {
            color: rgba(255, 255, 255, 0.9);
        }
    }
    
    &:hover.active {
        .nav-item-hold {
            color: $primary !important;
        }
        
        .nav-icon {
            color: $primary !important;
        }
        
        .nav-text {
            color: $primary !important;
        }
    }
}

// Inline submenu styles
.nav-item.has-submenu {
    .nav-item-hold {
        position: relative;
        
        .submenu-arrow {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            transition: transform 0.3s ease;
            color: rgba(255, 255, 255, 0.6);
        }
    }
    
    &.submenu-open {
        .submenu-arrow {
            transform: translateY(-50%) rotate(180deg);
        }
    }
    
    // Responsive arrow positioning
    @media (max-width: 768px) {
        .nav-item-hold .submenu-arrow {
            right: 8px;
            font-size: 10px;
        }
    }
    
    @media (max-width: 576px) {
        .nav-item-hold .submenu-arrow {
            right: 6px;
            font-size: 9px;
        }
    }
}

.inline-submenu {
    list-style: none;
    padding: 4px 0;
    margin: 6px 0 0 0;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
    overflow-x: hidden;
    
    // Custom scrollbar styling
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        
        &:hover {
            background: rgba(255, 255, 255, 0.5);
        }
    }
    
    .nav-item {
        border-bottom: none;
        
        .nav-link {
            display: flex;
            align-items: flex-start;
            padding: 02px 02px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: all 0.2s ease;
            font-size: $font-size-xs;
            border-radius: 4px;
            margin: 2px 6px;
            min-height: 30px;
            
            &:hover {
                background: rgba(255, 255, 255, 0.1);
                color: $primary;
                
                .nav-icon {
                    color: $primary;
                }
            }
            
            &.router-link-active {
                color: $primary;
                background: rgba(255, 255, 255, 0.1);
                font-weight: 500;
                
                .nav-icon {
                    color: $primary;
                }
            }
            
            .nav-icon {
                font-size: 12px;
                margin-right: 10px;
                color: rgba(255, 255, 255, 0.6);
                flex-shrink: 0;
                width: 16px;
                text-align: center;
                margin-top: 2px;
            }
            
            .item-name {
                font-weight: 400;
                line-height: 1.5;
                white-space: normal;
                overflow: visible;
                word-wrap: break-word;
                word-break: break-word;
                flex: 1;
            }
        }
    }
    
    // Responsive adjustments for tablets and laptops
    @media (max-width: 1200px) {
        max-height: calc(100vh - 250px);
        
        .nav-item .nav-link {
            padding: 04px 04px;
            font-size: $font-size-xxs;
            min-height: 26px;
            align-items: flex-start;
            
            .nav-icon {
                font-size: 11px;
                margin-right: 8px;
                width: 14px;
                margin-top: 2px;
            }
            
            .item-name {
                white-space: normal;
                overflow: visible;
                word-wrap: break-word;
                word-break: break-word;
            }
        }
    }
    
    // Responsive adjustments for small screens
    @media (max-width: 768px) {
        max-height: calc(100vh - 200px);
        margin: 4px 0 0 0;
        
        .nav-item .nav-link {
            padding: 06px 06px;
            font-size: $font-size-xxs;
            min-height: 24px; // Better touch target
            margin: 2px 4px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            align-items: flex-start;
            
            .nav-icon {
                font-size: 11px;
                margin-right: 8px;
                width: 14px;
                margin-top: 2px;
            }
            
            .item-name {
                font-size: $font-size-xxxs;
                white-space: normal;
                overflow: visible;
                word-wrap: break-word;
                word-break: break-word;
            }
        }
    }
    
    // Extra small screens
    @media (max-width: 576px) {
        max-height: calc(100vh - 180px);
        
        .nav-item .nav-link {
            padding: 8px 8px;
            font-size: $font-size-xxxs;
            min-height: 36px; // Better touch target
            margin: 2px 3px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            align-items: flex-start;
            
            .nav-icon {
                font-size: 10px;
                margin-right: 6px;
                width: 12px;
                margin-top: 2px;
            }
            
            .item-name {
                white-space: normal;
                overflow: visible;
                word-wrap: break-word;
                word-break: break-word;
            }
        }
    }
}
</style>