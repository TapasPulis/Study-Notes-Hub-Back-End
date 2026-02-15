# Study-Notes-Hub-Back-End

How to Start the Server:

1. Clone the repository:
   git clone <git@github.com:TapasPulis/Study-Notes-Hub-Back-End.git>
   cd <Study-Notes-Hub-Back-End>

2. Install dependencies:
   npm install

3. Create a .env file(see template below).

4. Start the server in development:
   npm run dev

5. Test the server health endpoint:
   GET http://localhost:4000/health

Environment Variable Template:

Create a .env file with the following variables:

# Server port

PORT=4000

# Environment: development, production, etc.

NODE_ENV=development

# MongoDB connection string (replace with your own)

MONGO_URI=your_mongodb_connection_string_here

# JWT secret key (replace with a strong secret)

JWT_SECRET=your_jwt_secret_here

# JWT expiration (e.g., 1d, 7d, 12h)

JWT_EXPIRES_IN=1d

Available Endpoints(All endpoints except /auth require authentication via JWT in the Authorization header):

Auth:
/api/auth/register = POST(method) = Register a new user
/api/auth/login = POST(method) = Login and get JWT token

Users:
/api/users = GET(method) = Get all users (admin only)
/api/users/ = POST(method) = Create new user (admin only)
/api/users/:id = GET(method) = Get user by ID (admin only)
/api/users/:id = PATCH(method) = Update user by ID (admin only)
/api/users/:id = DELETE(method) = Delete user by ID (admin only)

Notes:
/api/notes = GET(method) = Get all notes
/api/notes = POST(method) = Create new note
/api/notes/:id = GET(method) = Get note by ID
/api/notes/:id = PATCH(method) = Update note by ID
/api/notes/:id = DELETE(method) = Delete note by ID

Decks:
/api/decks = GET(method) = Get all decks
/api/decks = POST(method) = Create new deck
/api/decks/:id = GET(method) = Get deck by ID
/api/decks/:id = PATCH(method) = Update deck by ID
/api/decks/:id = DELETE(method) = Delete deck by ID

Flashcards:
/api/decks/:deckId/flashcards = GET(method) = Get all flashcards
/api/decks/:deckId/flashcards = POST(method) = Create new flashcard
/api/decks/:deckId/flashcards/:id = GET(method) = Get flashcard by ID
/api/decks/:deckId/flashcards/:id = PATCH(method) = Update flashcard by ID
/api/decks/:deckId/flashcards/:id = DELETE(method) = Delete flashcard by ID
