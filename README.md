# Chat Interface
The app allows you to send and display messages from all senders.

## Technology Stack 
- ES5 with jQuery
- SASS following BEM methodology 
- Moment.js for timestamp formatting

## Implementation details
- The app is divided into 2 JS modules 
  - `Chatty` for the communication with the API
  - `ChatUI` for handling the different chat events
- A query parameter "author" is used to determine the sender (i.e. `?author=TomJones`). By default the sender is "Me"
- Every 2s the app fetches the messages since the timestamp of the latest message
- It supports IE10+, latest Chrome and latest Firefox

## Requirements:
- An API that receives new messages in a POST endpoint and lists all messages in reverse chronological order in a GET endpoint
- A valid token to access the API
