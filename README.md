# Scatch

Scatch is an e-commerce website built with Express.js, where users can browse and purchase a variety of bags. The site provides a streamlined interface for both users and owners to manage products and transactions.

## Features

- **User Authentication**: Secure login and registration for users.
- **Product Management**: Owners can add, update, and remove products.
- **User Dashboard**: Users can view their orders and manage their profiles.
- **Flash Messages**: Provides feedback on user actions (Note: The flash package and its usage are planned for removal).

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- MongoDB

### Environment Variables
Create a .env file in the root directory and add the following variables:

- EXPRESS_SESSION_SECRET=your_session_secret
- PORT=3000
- MONGODB_URI=your_mongodb_connection_string

### Clone the Repository

To get a copy of the repository:

```bash
git clone https://github.com/yourusername/scatch.git
cd scatch
npm install

