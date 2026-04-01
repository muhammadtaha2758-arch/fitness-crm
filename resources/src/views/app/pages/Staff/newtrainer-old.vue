<template>
    <div>
        <!-- Page Title with Breadcrumb -->
        <div
            class="d-flex justify-content-between align-items-center flex-wrap mb-4 border-bottom pb-2"
        >
            <h2 class="fw-bolder text-dark mb-2 mb-md-0">Create Trainer</h2>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/app/dashboard">Dashboard</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/app/trainer/newtrainer"
                            >Trainers</router-link
                        >
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Create Trainer
                    </li>
                </ol>
            </nav>
        </div>

        <div class="container-fluid py-4">
            <!-- Section Header -->
            <div
                class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2"
            >
                <h5 class="text-primary">
                    <i class="fas fa-user-plus me-2"></i> Create Trainer
                </h5>
                <router-link
                    to="/app/trainer/newtrainer"
                    class="btn btn-primary btn-sm"
                >
                    <i class="fas fa-arrow-left me-1"></i> Back
                </router-link>
            </div>

            <!-- Login Information -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Login
                    Information
                </h6>
                <div class="row g-4">
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Name</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                            required
                        />
                    </div>
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Phone</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                            required
                        />
                    </div>
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Email</label>
                        <input
                            type="email"
                            class="form-control rounded-4 bg-lightblue"
                            readonly
                            required
                        />
                    </div>
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Password</label>
                        <input
                            type="password"
                            class="form-control rounded-4 bg-lightblue"
                            readonly
                            required
                        />
                    </div>
                </div>
            </section>

            <!-- Personal Information -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Personal
                    Information
                </h6>
                <div class="row g-3">
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold"
                            >Date of Birth</label
                        >
                        <input
                            type="date"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Address</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-6 position-relative pb-4">
                        <label class="form-label">Gender</label>
                        <select
                            class="form-select rounded-4 px-3 w-100 bg-lightblue"
                            style="padding: 6px 10px !important"
                            required
                        >
                            <option disabled selected>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="col-md-6 pb-4">
                        <label class="form-label fs-4 fw-bold">Member ID</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                            readonly
                            required
                        />
                    </div>
                </div>
            </section>

            <!-- Physical Information -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Physical
                    Information
                </h6>
                <div class="row g-3">
                    <div class="col-md-3 pb-4">
                        <label class="form-label">Height (cm)</label>
                        <input
                            type="number"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-3 pb-4">
                        <label class="form-label">Weight (kg)</label>
                        <input
                            type="number"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-3 pb-4">
                        <label class="form-label">Chest (inch)</label>
                        <input
                            type="number"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-3 position-relative pb-4">
                        <label class="form-label">Blood Group</label>
                        <select
                            class="form-select rounded-4 px-3 w-100"
                            style="padding: 6px 10px !important"
                        >
                            <option disabled selected>Select Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                        </select>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Emergency
                    Contact Information
                </h6>
                <div class="row g-3">
                    <div class="col-md-4 pb-4">
                        <label class="form-label">Emergency Contact Name</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-4 pb-4">
                        <label class="form-label"
                            >Emergency Contact Number</label
                        >
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-4 pb-4">
                        <label class="form-label">Relation With Member</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                </div>
            </section>

            <!-- More Information -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>More
                    Information
                </h6>
                <div class="row g-3">
                    <div class="col-md-9 pb-4">
                        <label class="form-label">Referred By</label>
                        <input
                            type="text"
                            class="form-control rounded-4 bg-lightblue"
                        />
                    </div>
                    <div class="col-md-3 position-relative pb-4">
                        <label class="form-label">Locker Number</label>
                        <select
                            class="form-select rounded-4 px-3 w-100 bg-lightblue"
                            style="padding: 6px 10px !important"
                        >
                            <option disabled selected>Select Locker</option>
                            <option>L001</option>
                            <option>L002</option>
                            <option>L003</option>
                            <option>L004</option>
                            <option>L005</option>
                            <option>L006</option>
                            <option>L007</option>
                            <option>L008</option>
                            <option>L009</option>
                            <option>L010</option>
                            <option>L011</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Payment Information -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Payment
                    Information
                </h6>

                <!-- Trial Switch -->
                <div class="form-check form-switch mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="isTrial"
                        v-model="isTrial"
                    />
                    <label class="form-check-label" for="isTrial"
                        >Is Trial?</label
                    >
                </div>

                <!-- Show Trial Fields -->
                <div v-if="isTrial" class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label class="form-label">Trial Start</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="trialStart"
                        />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Trial End</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="trialEnd"
                        />
                    </div>
                </div>

                <!-- Show Payment Fields only when trial is OFF -->
                <div v-else class="row g-3">
                    <div class="col-md-4 pb-4">
                        <label class="form-label">Plan</label>
                        <select
                            class="form-select rounded-4 px-3 w-100 bg-lightblue"
                            v-model="plan"
                        >
                            <option :value="null">Select Plan</option>
                            <option>Basic Plan</option>
                            <option>Standard Plan</option>
                            <option>Premium Plan</option>
                        </select>
                    </div>

                    <div class="col-md-4 pb-4">
                        <label class="form-label">Payment Method</label>
                        <select
                            class="form-select rounded-4 px-3 w-100 bg-lightblue"
                            v-model="payment"
                        >
                            <option :value="null">Select Gateway</option>
                            <option>Bank</option>
                            <option>Flutterwave</option>
                            <option>Stripe</option>
                            <option>Zelle</option>
                            <option>Paypal</option>
                            <option>Mollie</option>
                            <option>Razorpay</option>
                        </select>
                    </div>

                    <div class="col-md-4 pb-4">
                        <label class="form-label">Amount</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input
                                type="number"
                                class="form-control rounded-4 bg-lightblue"
                                v-model="amount"
                            />
                        </div>
                    </div>

                    <div class="col-md-4 pb-4">
                        <label class="form-label">Pay Amount</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input
                                type="number"
                                class="form-control rounded-4 bg-lightblue"
                                v-model="payamount"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Profile Image -->
            <section class="mb-4">
                <h6 class="section-title">
                    <i class="fas fa-minus text-primary me-2"></i>Profile Image
                </h6>
                <div class="mb-3">
                    <label class="form-label">Image</label>
                    <div
                        class="position-relative rounded-4 d-flex flex-column justify-content-end align-items-center"
                        style="
                            width: 200px;
                            height: 200px;
                            padding-bottom: 20px;
                            border: 2px dashed #6c757d;
                        "
                    >
                        <input
                            type="file"
                            accept="image/*"
                            @change="handleImageUpload"
                            ref="imageInput"
                            style="display: none"
                        />
                        <button
                            class="btn btn-outline-secondary"
                            @click="$refs.imageInput.click()"
                        >
                            IMAGE
                        </button>
                    </div>
                </div>
            </section>

            <div class="mt-4">
                <button class="btn btn-success">
                    <i class="fas fa-save me-2"></i>Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateMemberForm",
    data() {
        return {
            isTrial: false,
            trialStart: "",
            trialEnd: "",
            plan: null,
            payment: null,
            amount: "",
            payamount: "",
        };
    },
    watch: {
        isTrial(newVal) {
            if (newVal) {
                // Trial mode ON — clear payment info
                this.plan = null;
                this.payment = null;
                this.amount = "";
                this.payamount = "";
            } else {
                // Trial mode OFF — clear trial info
                this.trialStart = "";
                this.trialEnd = "";
            }
        },
    },
};
</script>

<style lang="scss">

.section-title {
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}
.bg-lightblue {
    background-color: #dededc !important;
}
label {
    margin-bottom: 0 !important;
}
</style>