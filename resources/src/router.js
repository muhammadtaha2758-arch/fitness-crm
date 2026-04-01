import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import { i18n } from "./plugins/i18n";
import NProgress from "nprogress";

Vue.use(Router);

// =========================
// Routes
// =========================
const routes = [
    {
        path: "/",
        component: () => import("./views/app"),
        redirect: "/app/Members/ViewAllMembers",
        children: [
            // 1. Dashboard
            {
                path: "/app/dashboard",
                name: "dashboard",
                component: () => import("./views/app/pages/Dashboard/Dashboard.vue"),
            },

            // 2. Business Analytics
            {
                path: "/app/business-analytics",
                name: "BusinessAnalytics",
                component: () => import("./views/app/pages/Business_Analytics/Business_Analytics.vue"),
            },

            // 2.5. Mobile Apps
            {
                path: "/app/mobile-apps",
                name: "MobileApps",
                component: () => import("./views/app/pages/Mobile_Apps/MobileApps.vue"),
            },

            // 2. Members Section
            {
                path: "/app/Members",
                component: () => import("./views/app/pages/Members/index.vue"),
                redirect: "/app/Members/ViewAllMembers",
                children: [
                    {
                        name: "ViewAllMembers",
                        path: "ViewAllMembers",
                        component: () =>
                            import(
                                "./views/app/pages/Members/ViewAllMembers.vue"
                            ),
                    },
                    {
                        name: "AddNewMember",
                        path: "AddNewMember",
                        component: () =>
                            import(
                                "./views/app/pages/Members/AddNewMember.vue"
                            ),
                    },
                    {
                        name: "MemberDetails",
                        path: "MemberDetails/:id?",
                        component: () =>
                            import(
                                "./views/app/pages/Members/MemberDetails.vue"
                            ),
                    },
        {
            name: "AssignMembership",
            path: "assign-membership",
            component: () =>
                import(
                    "./views/app/pages/Members/AssignMembership.vue"
                ),
        },
        {
            name: "SendMessage",
            path: "send-message",
            component: () =>
                import(
                    "./views/app/pages/Members/SendMessage.vue"
                ),
        },
        {
            name: "SentMessages",
            path: "sent-messages",
            component: () =>
                import(
                    "./views/app/pages/Members/Sent_Messages.vue"
                ),
        },
                ],
            },

            // 3. Check-in Section
            {
                path: "/app/checkin",
                name: "CheckIn",
                component: () =>
                    import("./views/app/pages/CheckIn/CheckIn.vue"),
            },

            // 4. Coach Section
            // newcoach
            {
                path: "/app/coach",
                component: () =>
                    import("./views/app/pages/Staff/newcoach.vue"),
                redirect: "/app/coach/newcoach",
                children: [
                    {
                        name: "NewCoach",
                        path: "newcoach",
                        component: () =>
                            import("./views/app/pages/Staff/newcoach"),
                    },
                ],
            },
            {
                path: "/app/Staff",
                component: () => import("./views/app/pages/Staff"),
                redirect: "/app/Staff/coachlist",
                children: [
                    {
                        name: "CoachList",
                        path: "coachlist",
                        component: () =>
                            import("./views/app/pages/Staff/coachlist.vue"),
                    },
                    {
                        name: "NewCoaches",
                        path: "newcoach",
                        component: () =>
                            import("./views/app/pages/Staff/newcoach"),
                    },
                    {
                        name: "Coachdetails",
                        path: "coachdetails/:id",
                        component: () =>
                            import("./views/app/pages/Staff/coachdetails"),
                    },
                    {
                        name: "StaffSchedule",
                        path: "schedule",
                        component: () =>
                            import("./views/app/pages/Staff/schedule.vue"),
                    },
                ],
            },

            {
                path: "/app/Settings",
                component: () =>
                    import("./views/app/pages/settings/permissions"),
                redirect: "/app/Settings/Permissions",
                children: [
                    {
                        name: "Permissions",
                        path: "Permissions",
                        component: () =>
                            import(
                                "./views/app/pages/settings/permissions/Permissions.vue"
                            ),
                    },
                    {
                        name: "CreatePermission",
                        path: "Permissions/store",
                        component: () =>
                            import(
                                "./views/app/pages/settings/permissions/Create_permission.vue"
                            ),
                    },
                    {
                        name: "EditPermission",
                        path: "Permissions/edit/:id",
                        component: () =>
                            import(
                                "./views/app/pages/settings/permissions/Edit_permission.vue"
                            ),
                    },
                    {
                        name: "SystemSettings",
                        path: "system_settings",
                        component: () =>
                            import(
                                "./views/app/pages/settings/system_settings.vue"
                            ),
                    },
                    {
                        name: "CreateMembership",
                        path: "memberships/create",
                        component: () =>
                            import(
                                "./views/app/pages/settings/create_membership.vue"
                            ),
                    },
                    {
                        name: "MailSettings",
                        path: "mail_settings",
                        component: () =>
                            import(
                                "./views/app/pages/settings/mail_settings.vue"
                            ),
                    },
                    {
                        name: "EmailTemplates",
                        path: "email_templates",
                        component: () =>
                            import(
                                "./views/app/pages/settings/email_templates.vue"
                            ),
                    },
                    {
                        name: "PaymentGateway",
                        path: "payment_gateway",
                        component: () =>
                            import(
                                "./views/app/pages/settings/payment_gateway.vue"
                            ),
                    },
                    {
                        name: "DataBackup",
                        path: "backup",
                        component: () =>
                            import(
                                "./views/app/pages/settings/backup.vue"
                            ),
                    },
                    {
                        name: "PaysafeCardPayment",
                        path: "paysafecard_payment",
                        component: () =>
                            import(
                                "./views/app/pages/Payments/PaysafeCardPayment.vue"
                            ),
                    },
                    {
                        name: "SubscriptionPlans",
                        path: "SubscriptionPlans",
                        component: () =>
                            import(
                                "./views/app/pages/settings/SubscriptionPlans.vue"
                            ),
                    },
                ],
            },

            // 4. Appointment
            {
                path: "/app/Appointment",
                component: () =>
                    import("./views/app/pages/Appointment/Appointment.vue"),
                redirect: "/app/Appointment/Appointment",
                children: [
                    {
                        name: "Appointment",
                        path: "Appointment",
                        component: () =>
                            import("./views/app/pages/Appointment/Appointment"),
                    },
                ],
            },

            // 5. Schedule
            {
                path: "/app/schedule",
                name: "Schedule",
                component: () =>
                    import("./views/app/pages/Schedule/Schedule.vue"),
            },

            // 5.5. Tasks
            {
                path: "/app/tasks",
                name: "Tasks",
                component: () =>
                    import("./views/app/pages/Tasks/Tasks.vue"),
            },

            // 5. Challenge
            {
                path: "/app/challenges",
                name: "Challenges",
                component: () =>
                    import("./views/app/pages/Challenges/ChallengesPage.vue"),
            },

            // 6. Workout
            {
                path: "/app/Workout",
                component: () =>
                    import("./views/app/pages/Workout/Workout.vue"),
                redirect: "/app/Workout/Workoutlibrary",
                children: [
                    {
                        name: "WorkoutLibrary",
                        path: "Workoutlibrary",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/WorkoutLibrary.vue"
                            ),
                    },

                    {
                        name: "Plans_Programs",
                        path: "Plans_Programs",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/Plans_Programs.vue"
                            ),
                    },

                    {
                        name: "AssignWorkout",
                        path: "AssignWorkout",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/AssignWorkout.vue"
                            ),
                    },

                    {
                        name: "Track_Completion",
                        path: "Track_Completion",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/Track_Completion.vue"
                            ),
                    },

                    {
                        name: "ActivityList",
                        path: "ActivityList",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/ActivityList.vue"
                            ),
                    },
                    {
                        name: "WorkoutEditor",
                        path: "editor",
                        component: () =>
                            import(
                                "./views/app/pages/Workout/WorkoutEditor.vue"
                            ),
                    },
                ],
            },

            // 7. Nutrition
            {
                path: "/app/nutrition",
                name: "Nutrition",
                component: () =>
                    import("./views/app/pages/Nutrition/Nutrition.vue"),
            },
            {
                path: "/app/nutrition/self-assessments/:memberId?",
                name: "SelfAssessments",
                component: () =>
                    import("./views/app/pages/Nutrition/MemberReports.vue"),
            },
            {
                path: "/app/nutrition/compare-photos",
                name: "ComparePhotos",
                component: () =>
                    import("./views/app/pages/Nutrition/ComparePhotos.vue"),
            },
            {
                path: "/app/nutrition/members",
                name: "NutritionMembers",
                component: () =>
                    import("./views/app/pages/Nutrition/MemberManagement.vue"),
            },
            {
                path: "/app/nutrition/members/:memberId",
                name: "NutritionMemberDetail",
                component: () =>
                    import("./views/app/pages/Nutrition/MemberDetail.vue"),
            },
            // {
            //     path: "/app/nutrition/images-library",
            //     name: "ImagesLibrary",
            //     component: () =>
            //         import("./views/app/pages/Nutrition/Images_Liabrary.vue"),
            // },
            // {
            //     path: "/app/assigned-meal-reports",
            //     name: "AssignedMealReports",
            //     component: () =>
            //         import("./views/app/pages/Nutrition/AssignedMealReports.vue"),
            // },

            // 8. Community
            {
                path: "/app/community",
                name: "Community",
                component: () =>
                    import("./views/app/pages/Community/Group.vue"),
            },
            {
                path: "/app/community/group",
                name: "Group",
                component: () =>
                    import("./views/app/pages/Community/Group.vue"),
            },
            {
                path: "/app/community/feed",
                name: "CommunityFeed",
                component: () =>
                    import("./views/app/pages/Community/community.vue"),
            },
            {
                path: "/app/community/edit-group",
                name: "EditGroupInformation",
                component: () =>
                    import("./views/app/pages/Community/EditGroupInformation.vue"),
            },
            {
                path: "/app/community/leaderboard",
                name: "Leaderboard",
                component: () =>
                    import("./views/app/pages/Community/Leaderboard.vue"),
            },

            // 8. Communication
            // {
            //     path: "/app/communication",
            //     component: () =>
            //         import("./views/app/pages/Communication/Communication.vue"),
            //     redirect: "/app/communication/campaigns",
            //     children: [
            //         {
            //             name: "Campaigns",
            //             path: "campaigns",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/Communication/Campaigns.vue"
            //                 ),
            //         },
            //         {
            //             name: "AutomatedMessages",
            //             path: "automated-messages",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/Communication/AutomatedMessages.vue"
            //                 ),
            //         },
            //         {
            //             name: "Chat",
            //             path: "chat",
            //             component: () =>
            //                 import("./views/app/pages/Communication/Chat.vue"),
            //         },
            //         {
            //             name: "Notifications",
            //             path: "notifications",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/Communication/Notifications.vue"
            //                 ),
            //         },

            //         {
            //             name: "Message_Composer",
            //             path: "Message_Composer",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/Communication/Message_Composer.vue"
            //                 ),
            //         },
            //     ],
            // },
            // {
            //     path: "/app/questionnaires",
            //     component: () =>
            //         import("./views/app/pages/Questionnaires/Questionnaires.vue"),
            //     redirect: "/app/Questionnaires/Questionnaires",
            //     children: [
            //         {
            //             name: "Questionnaires",
            //             path: "Questionnaires",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/Questionnaires/Questionnaires.vue"
            //                 ),
            //         },
            //     ],
            // },

            // 9. Payments & Billing
            {
                path: "/app/payments",
                component: () =>
                    import("./views/app/pages/Payments/Payments.vue"),
                redirect: "/app/payments/history",
                children: [
                    {
                        name: "PaymentHistory",
                        path: "history",
                        component: () =>
                            import(
                                "./views/app/pages/Payments/PaymentHistory.vue"
                            ),
                    },
                    {
                        name: "Invoices",
                        path: "invoices",
                        component: () =>
                            import("./views/app/pages/Payments/Invoices.vue"),
                    },
                ],
            },

            // 10. Reports Routes
            {
                path: "/app/reports",
                component: () =>
                    import("./views/app/pages/Reports/Reports.vue"),
                redirect: "/app/reports/ratings",
                children: [
                    {
                        name: "RatingsReport",
                        path: "ratings",
                        component: () =>
                            import(
                                "./views/app/pages/Ratings/RatingsReport.vue"
                            ),
                    },
                ],
            },

            // 11. Financial Routes
            {
                path: "/app/Financial",
                component: () => import("./views/app/pages/Financial/index.vue"),
                redirect: "/app/Financial/Invoices",
                children: [
                    {
                        name: "FinancialInvoices",
                        path: "Invoices",
                        component: () =>
                            import(
                                "./views/app/pages/Financial/Invoices.vue"
                            ),
                    },
                    {
                        name: "FinancialSales",
                        path: "Sales",
                        component: () =>
                            import(
                                "./views/app/pages/Financial/Sales.vue"
                            ),
                    },
                    {
                        name: "FinancialTaxes",
                        path: "Taxes",
                        component: () =>
                            import(
                                "./views/app/pages/Financial/Taxes.vue"
                            ),
                    },
                    {
                        name: "FinancialCashFlow",
                        path: "CashFlow",
                        component: () =>
                            import(
                                "./views/app/pages/Financial/CashFlow.vue"
                            ),
                    },
                    {
                        name: "FinancialCashRegister",
                        path: "CashRegister",
                        component: () =>
                            import(
                                "./views/app/pages/Financial/CashRegister.vue"
                            ),
                    },
                ],
            },

            // 12. App Content / Resources Routes
            // {
            //     path: "/app/resources",
            //     component: () =>
            //         import("./views/app/pages/Resources/Resources.vue"),
            // },

            // 13. Support Routes
            {
                path: "/app/Support",
                name: "Support",
                component: () => import("./views/app/pages/Support/Support.vue"),
            },

            // 14. Settings Routes
            // {
            //     path: "/app/settings",
            //     component: () =>
            //         import("./views/app/pages/settings/settings.vue"),
            // },
            {
                path: "/app/profile",
                name: "profile",
                component: () => import("./views/app/pages/profile.vue"),
            },
            {
                path: "/app/privacy-policy",
                name: "PrivacyPolicy",
                component: () => import("./views/app/pages/PrivacyPolicy.vue"),
            },
            {
                path: "/app/subscription-required",
                name: "subscription_required",
                component: () => import("./views/app/pages/SubscriptionRequired.vue"),
            },
            {
                path: "/app/403",
                name: "not_authorize",
                component: () => import("./views/app/pages/NotAuthorize.vue"),
            },
            {
                path: "/app/onboarding",
                name: "onboarding",
                component: () => import("./views/app/pages/Onboarding.vue"),
            },
            // {
            //     path: "/app/settings",
            //     component: () => import("./views/app/pages/settings"),
            //     redirect: "/app/settings",
            //     children: [
            //         {
            //             name: "system_settings",
            //             path: "system_settings",
            //             component: () =>
            //                 import(
            //                     "./views/app/pages/settings/system_settings.vue"
            //                 ),
            //         },
            //     ],
            // },
        ],
    },

    // Disable account (public, no login required)
    {
        path: "/disable-account",
        name: "DisableAccount",
        component: () => import("./views/app/pages/DisableAccount.vue"),
    },
    // When app is served from a subpath (e.g. /crm/disable-account)
    {
        path: "/:base/disable-account",
        name: "DisableAccountSubpath",
        component: () => import("./views/app/pages/DisableAccount.vue"),
    },

    // 404 - Page Not Found
    {
        path: "*",
        name: "NotFound",
        component: () => import("./views/app/pages/NotFound.vue"),
    },
];

const router = new Router({
    mode: "history",
    linkActiveClass: "open",
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
});

const originalPush = Router.prototype.push;
(Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
}),
    router.beforeEach((to, from, next) => {
        // If this isn't an initial page load.
        if (to.path) {
            // Start the route progress bar.
            NProgress.start();
            NProgress.set(0.1);
        }
        next();

        if (
            store.state.language.language &&
            store.state.language.language !== i18n.locale
        ) {
            i18n.locale = store.state.language.language;
            next();
        } else if (!store.state.language.language) {
            store
                .dispatch("language/setLanguage", navigator.languages)
                .then(() => {
                    i18n.locale = store.state.language.language;
                    next();
                });
        } else {
            next();
        }
    });

router.afterEach(() => {
    // Remove initial loading
    const gullPreLoading = document.getElementById("loading_wrap");
    if (gullPreLoading) {
        gullPreLoading.style.display = "none";
    }
    // Complete the animation of the route progress bar.
    setTimeout(() => NProgress.done(), 500);
    // NProgress.done();

    if (window.innerWidth <= 1200) {
        store.dispatch("changeSidebarProperties");
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }

        if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
            store.dispatch("changeCompactSidebarProperties");
        }
    } else {
        if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
            store.dispatch("changeSecondarySidebarProperties");
        }
    }
});

async function Check_Token(to, from, next) {
    let token = to.params.token;
    const res = await axios
        .get("password/find/" + token)
        .then((response) => response.data);

    if (!res.success) {
        next("/app/sessions/signIn");
    } else {
        return next();
    }
}

export default router;
