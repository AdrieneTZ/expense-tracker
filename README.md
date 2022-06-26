## Expense Tracker


### Feature
- Register with either email or Facebook account
- Every user's password is hashed before saving in database
- After login, here is what you can do :
  - See total amount of your expenses
  - Click 'Add An Expense' to create an new expense record
  - Click 'Edit' to edit the relevant information of the expense record
  - Click 'Delete' to remove the expense record
  - Click "{ YOUR NAME }'s Expense Record" to go back to the home page
  - Select a category to see all expense records of the category
  - Total amount is calculated after selecting a category



### Node Version
- v18.3.0

### Dependencies
#### All dependencies are listed in package.json
- expamle : package@version
- bcryptjs@1.20.0
- body-parser@1.20.0
- connect-flash@0.1.1
- dotenv@16.0.1
- express@4.18.1
- express-handlebars@6.0.6
- express-session@1.17.3
- method-override@3.0.0
- mongoose@6.4.0
- nodemon@2.0.16
- passport@0.6.0
- passport-facebook@3.0.0
- passport-local@1.0.0

### How to start?
#### Step 1. Clone this project and install all dependencies
```bash
# Clone the project
git clone https://github.com/AdrieneTZ/restaurant-list-v2.git

# Go to the project file
cd expense-tracker

# Install all dependencies
npm install
```
#### Step 2. Add .gitignore and put files that have to be hidden
```bash
# Add file .gitignore
touch .gitignore

# Put all below in .gitignore
# OS X
.DS_Store*
Icon?
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# npm
node_modules
*.log
*.gz

.env
```
#### Step 3. Set environment variable in .env ( see .env.example )
```bash
# Add .env
touch .env

# Set environment variable in .env
  # Add MONGODB_URI in .env
  MONGODB_URI=mongodb+srv://**ID**:**PASSWORD**@**CLUSTER**.dqlbc.mongodb.net/**DATABASE**?retryWrites=true&w=majority

  example : MONGODB_URI=mongodb+srv://dolphins:wantclean@pachficocean.dqlbc.mongodb.net/SanFrancisco?retryWrites=true&w=majority
```
#### Step 4. Generate seed data
##### For expense records are associated to user id and category id, MUST generate seed categories and users first
```bash
# generate seed categories
npm run gencate

# generate seed users
npm run genuser

# generate seed expense records
npm run genrec

# Start the server
npm run dev
```