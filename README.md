## Description

This service was created to generate payment links and verify transactions after users complete payments.

## Environment Configuration (.env)

This file contains variables required for project setup. Below is a table describing each variable.

| Variable                    | Description                                                                   | Example Value                                     |
|-----------------------------|-------------------------------------------------------------------------------|---------------------------------------------------|
| `LIQPAY_PUBLIC_KEY`         | Public key for authentication with LiqPay.                                    | `sandbox_public_key`                              |
| `LIQPAY_PRIVATE_KEY`        | Private key for signing requests to LiqPay.                                   | `sandbox_private_key`                             |
| `LIQPAY_SERVER_SUCCESS_URL` | Server URL for confirming successful payments (must be accessible to LiqPay). | `https://example.ngrok-free.app/payment/callback` |
| `LIQPAY_RESULT_SUCCESS_URL` | URL to redirect the user after successful payment.                            | `https://www.instagram.com/`                      |
| `PORT`                      | Port on which the server will run.                                            | `4000`                                            |
| `IS_MICROSERVICE`           | Indicates if the app is a microservice (`true/false`).                        | `true`                                            |
| `HOST`                      | Domain or IP address where the server is deployed.                            | `localhost`                                       |

## API Description

This document outlines the API for handling payments through both a standard HTTP server and a microservice
architecture.

### Endpoints Table

| Method | URL                 | Description                                            | DTO / Parameters           |
|--------|---------------------|--------------------------------------------------------|----------------------------|
| GET    | `/payment/create`   | Creates a payment link based on query parameters.      | `CreatePaymentDto` (Query) |
| POST   | `/payment/callback` | Handles the callback request after successful payment. | `Body: any`                |

### Description

- **`createPayment`**: Generates a payment link based on the user’s request.
- **`handleCallbackPay`**: Processes callback requests from LiqPay to confirm transactions.

### `CreatePaymentDto` Fields

| Field         | Type     | Description                            | Validation                                | Example Value                       |
|---------------|----------|----------------------------------------|-------------------------------------------|-------------------------------------|
| `amount`      | `number` | Payment amount.                        | Must be a number, at least 1 (`@Min(1)`). | `150.50`                            |
| `currency`    | `string` | Currency for the payment.              | Cannot be empty (`@IsNotEmpty`).          | `"USD"`                             |
| `orderId`     | `string` | Unique order identifier.               | Cannot be empty (`@IsNotEmpty`).          | `"ORD12345"`                        |
| `description` | `string` | Description of the product or service. | Cannot be empty (`@IsNotEmpty`).          | `"Payment for programming courses"` |

## Local Setup

To run the project locally, you need to install and configure **ngrok** to expose your local server to the internet.

1. Install **ngrok** from the [official website](https://ngrok.com/).
2. Start ngrok with the following command:
   ```bash
   ngrok http 3003
