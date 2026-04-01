<template>
  <div class="privacy-page">
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last updated: {{ lastUpdated }}</p>

    <section>
      <h2>1. Introduction</h2>
      <p>Thor Strength Fitness is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fitness business management system (CRM), including member and coach accounts, scheduling, memberships, check-in, and related services. Please read this policy carefully.</p>
    </section>

    <section>
      <h2>2. Information We Collect</h2>
      <p>We may collect information that you or your gym provide through our system, including:</p>
      <ul>
        <li>Account and profile information (name, email address, mobile and landline phone, date of birth, profile photo)</li>
        <li>Member and membership data (membership type, start/end dates, subscription reason, payment and billing information)</li>
        <li>Emergency contact information</li>
        <li>Appointment and schedule data (bookings, trainer assignments, attendance)</li>
        <li>Coach and staff information (for those with CRM access)</li>
        <li>Communications and support requests</li>
        <li>Check-in and usage data within the platform</li>
      </ul>
    </section>

    <section>
      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our CRM and member management services</li>
        <li>Manage memberships, appointments, scheduling, and check-in</li>
        <li>Process payments and send transaction-related communications</li>
        <li>Send administrative messages, welcome emails, appointment reminders, and support</li>
        <li>Manage coach and staff access and profiles</li>
        <li>Comply with legal obligations and protect our rights</li>
      </ul>
    </section>

    <section>
      <h2>4. Information Sharing and Disclosure</h2>
      <p>We do not sell your personal information. We may share your information only in the following circumstances: with your consent; with service providers who assist our operations under strict confidentiality; when required by law or to protect rights and safety; or in connection with a merger, sale, or transfer of assets. We may share aggregated or de-identified data that cannot reasonably identify you. Information may be accessible to authorized staff and coaches within your gym or business as needed to provide the service.</p>
    </section>

    <section>
      <h2>5. Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and secure infrastructure. No method of transmission over the Internet is 100% secure; we encourage you to use strong passwords and keep your account details confidential.</p>
    </section>

    <section>
      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access and receive a copy of your personal data</li>
        <li>Correct or update inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to or restrict certain processing</li>
        <li>Data portability</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
      <p>You may request to disable your account at any time using the "Disable Account" option (e.g. via the link provided by your gym or on the login area). After verification, we will process your request in line with our retention policy.</p>
      <p>To exercise these rights, contact us using the details provided at the end of this policy.</p>
    </section>

    <section>
      <h2>7. Data Retention</h2>
      <p>We retain your information only for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.</p>
    </section>

    <section>
      <h2>8. Cookies and Similar Technologies</h2>
      <p>We may use cookies, web beacons, and similar technologies to collect information about your use of our services. This helps us improve functionality, remember your preferences, and analyze traffic. You can control cookie settings through your browser.</p>
    </section>

    <section>
      <h2>9. Children's Privacy</h2>
      <p>Our services are not intended for users under the age of 16 (or the applicable age in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us so we can delete it.</p>
    </section>

    <section>
      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or our data practices, please contact Thor Strength Fitness using the contact details in your account, on our website, or at the address or email provided by your gym or business in the system.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  metaInfo: {
    title: 'Privacy Policy'
  },
  data() {
    return {
      lastUpdated: 'March 12, 2026'
    };
  }
};
</script>

<style scoped>
.privacy-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #222;
}

.privacy-page h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.privacy-page .last-updated {
  color: #666;
  font-size: 0.875rem;
  margin: 0 0 2rem 0;
}

.privacy-page section {
  margin-bottom: 2rem;
}

.privacy-page h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.privacy-page p {
  margin: 0 0 0.75rem 0;
}

.privacy-page ul {
  margin: 0 0 0.75rem 0;
  padding-left: 1.5rem;
}

.privacy-page li {
  margin-bottom: 0.25rem;
}
</style>
