Task: Create a Server Chat App with Sockets

Objective: Build a basic chat application that allows users to send and receive messages in real-time using sockets.

Required APIs:

### User Management
1. Send OTP: /api/v1/auth/send-otp
2. Verify OTP: /api/v1/auth/verify-otp
3. Login: /api/v1/auth/login
4. Get User Profile: /api/v1/users/profile

### Chat Functionality
1. Send Message: /api/v1/chat/send-message
2. Get Messages: /api/v1/chat/get-messages
3. Mark Message as Read: /api/v1/chat/mark-as-read

### Notification
1. Send Notification: /api/v1/notifications/send
2. Get Notifications: /api/v1/notifications/get

### Group Management
1. Create Group: /api/v1/groups/create
2. Get Group Members: /api/v1/groups/members
3. Add Member to Group: /api/v1/groups/add-member
4. Remove Member from Group: /api/v1/groups/remove-member

### Socket Events
1. New Message: new-message
2. Message Read: message-read
3. New Notification: new-notification

Task Requirements:

1. Use Node.js and Socket.io for real-time communication
2. Implement user registration and login functionality using phone number and OTP
3. Create APIs for sending and receiving messages
4. Integrate notification system to alert users of new messages
5. Use a database (e.g., MongoDB) to store user data and chat history
6. Implement group management functionality

Deliverables:

1. A working chat application with socket functionality
2. API documentation for all endpoints
3. Code should be well-organized, readable, and follow best practices

Additional Notes:

- You can use existing libraries and frameworks to simplify the task (e.g., Twilio for OTP, Mongoose for MongoDB)
- Focus on building a basic working prototype first, and then we can iterate on features and improvements.