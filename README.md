# Event-Management-System (NodeJs + MongoDB)
## USER
1. Register (User can register)
2. Login (User login)
3. Logout (User logout)
4. Change Password (User can change his password)
5. Update Password (When request for reset password is done, to
set new password)
6. Reset Password (In API response send info regarding to updatepassword)

## Event (Authentication required for doing operations on event)
1. Create (User can create Event)
2. Invite (Users) // when that user login in he can see his
created event list and also events in which he is invited.
3. List (Invited users when login can see their created events as
well as events in which they are invited in, also display creator
name in list)
Following are the actions needs to be done on listing api
a. pagination
b. Sorting
c. Date Filter
d. Search Filter
4. Event Detail + list of users invited (API to get specific event
and invites)
5. Event update (Event Update)
### Notes:
- Consider models as per your knowledge
- Create Postman for above APIs
-https://www.postman.com/sonalrawal/workspace/web-dev-sonal/collection/18202215-2e87a612-7919-4fa2-92ad-78f2bf77d345?action=share&creator=18202215
