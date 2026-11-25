# Security Policy

## Supported Versions

Metro Telecom actively maintains and provides security updates for the following software releases:

| Version | Supported          | Security Status |
| ------- | ------------------ | --------------- |
| 1.0.x   | :white_check_mark: | Active Support  |
| < 1.0   | :x:                | End of Life     |

---

## Reporting a Vulnerability

We take the security of Metro Telecom, our multi-platform POS & inventory management system, and customer business records very seriously.

If you believe you have discovered a security vulnerability in this repository, please do **NOT** open a public GitHub issue. Instead, report it privately through one of the following channels:

* **GitHub Private Security Advisory**: Go to the **Security** tab of this repository -> Click **Report a vulnerability** to open an encrypted private disclosure.
* **Direct Developer Contact**: Contact the lead developer via GitHub profile [@shahin0964](https://github.com/shahin0964).

### What to Include in Your Report:
1. Type of vulnerability (e.g. data validation, authentication, session tampering, dependency issue).
2. Step-by-step instructions or proof-of-concept demonstrating how the vulnerability can be reproduced.
3. Impact assessment on multi-platform clients (Windows Desktop, Android Mobile, Web).
4. Proposed fix or mitigation if available.

### Vulnerability Response Process:
* **Acknowledgment**: We aim to acknowledge receipt of vulnerability reports within 24 to 48 hours.
* **Triage & Assessment**: We will assess the severity and impact within 3 to 5 business days.
* **Fix & Release**: Confirmed security patches will be deployed immediately to GitHub Pages live web and published as hotfix desktop/mobile releases.

---

## Security Architecture & Best Practices
* **Offline-First & Local Storage**: Point-of-sale operational data is secured in isolated sandboxed storage.
* **Encrypted Cloud Sync**: Real-time cross-device synchronization uses tokenized authentication and encrypted transport (HTTPS/WSS/Firestore rules).
* **Defensive Input Sanitization**: All product, barcode, IMEI, invoice, and customer records undergo strict client-side and cloud boundary validation.
