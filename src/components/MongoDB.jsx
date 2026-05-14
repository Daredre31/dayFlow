import { useState } from "react";

const lessons = [
  {
    id: 1,
    title: "What Even Is MongoDB?",
    emoji: "🧠",
    sections: [
      {
        type: "concept",
        title: "The Big Picture",
        content: `MongoDB is a NoSQL database. That means it does NOT use tables, rows, and columns like SQL databases (MySQL, PostgreSQL). Instead, it stores data as documents — basically JavaScript objects (JSON format).

Think of it like this:

SQL Database = Excel spreadsheet (rigid rows/columns)
MongoDB = A folder full of JSON files (flexible documents)`
      },
      {
        type: "comparison",
        title: "SQL vs MongoDB Terminology",
        rows: [
          ["SQL", "MongoDB"],
          ["Database", "Database"],
          ["Table", "Collection"],
          ["Row", "Document"],
          ["Column", "Field"],
          ["JOIN", "Populate / $lookup"],
        ]
      },
      {
        type: "code",
        title: "What a MongoDB Document looks like",
        lang: "js",
        code: `// A "User" document in MongoDB looks like this:
{
  _id: ObjectId("64a1f2c3b4e5d6f7a8b9c0d1"),  // auto-generated unique ID
  name: "Daredre",
  email: "daredre@dev.com",
  role: "backend_dev",
  skills: ["Node.js", "Express", "MongoDB"],
  createdAt: 2024-11-01T00:00:00.000Z
}

// Notice: no fixed columns, no rigid schema
// You can store arrays, nested objects — anything JSON can hold`
      },
      {
        type: "tip",
        content: "The _id field is automatically created by MongoDB. It's a unique ObjectId — you never need to manually assign IDs."
      }
    ]
  },
  {
    id: 2,
    title: "MongoDB Atlas — The Free Cloud Setup",
    emoji: "☁️",
    sections: [
      {
        type: "concept",
        title: "Why Atlas (Free Tier)?",
        content: `MongoDB Atlas is the official cloud-hosted MongoDB. They have a FREE tier called M0 that gives you:
- 512MB storage (enough to learn and build projects)
- Shared cluster (works fine for dev/portfolio projects)
- Free forever — no credit card needed for M0

This is what you'll use instead of installing MongoDB locally.`
      },
      {
        type: "steps",
        title: "Setting Up Atlas Step by Step",
        steps: [
          "Go to https://www.mongodb.com/atlas and click 'Try Free'",
          "Create an account (use Google or email)",
          "When asked to create a cluster, choose FREE (M0 Sandbox)",
          "Pick a cloud provider — AWS is fine, choose a region close to you (e.g. eu-west for Africa/Europe)",
          "Wait ~2 minutes for the cluster to provision",
          "Click 'Database Access' in the sidebar → Add a new database user (username + password). Save these — you'll need them.",
          "Click 'Network Access' → Add IP Address → click 'Allow Access from Anywhere' (0.0.0.0/0) for dev. This lets your app connect.",
          "Go back to 'Database' → Click 'Connect' on your cluster → 'Connect your application' → Copy the connection string"
        ]
      },
      {
        type: "code",
        title: "Your Connection String looks like this",
        lang: "bash",
        code: `mongodb+srv://daredre:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority

# Replace <password> with your actual DB user password
# You'll also add a database name before the "?" like:
mongodb+srv://daredre:mypass123@cluster0.abc123.mongodb.net/myAppDB?retryWrites=true&w=majority`
      },
      {
        type: "tip",
        content: "NEVER hardcode this connection string in your code. Always put it in a .env file and add .env to .gitignore. You don't want your DB credentials on GitHub."
      }
    ]
  },
  {
    id: 3,
    title: "Connecting MongoDB to Express",
    emoji: "🔌",
    sections: [
      {
        type: "concept",
        title: "The Tool: Mongoose",
        content: `You don't talk to MongoDB directly in Node.js. You use Mongoose — an ODM (Object Document Mapper). It gives you:
- A cleaner way to connect
- Schemas (structure/validation for your documents)
- Models (JavaScript classes that represent collections)
- Built-in methods like .find(), .save(), .findById(), etc.

Think of Mongoose as the translator between your Express code and MongoDB.`
      },
      {
        type: "steps",
        title: "Project Setup",
        steps: [
          "mkdir my-express-mongo-app && cd my-express-mongo-app",
          "npm init -y",
          "npm install express mongoose dotenv",
          "npm install -D nodemon",
          "Create your folder structure (see below)",
          "Add to package.json scripts: \"dev\": \"nodemon index.js\""
        ]
      },
      {
        type: "code",
        title: "Folder Structure",
        lang: "bash",
        code: `my-express-mongo-app/
├── index.js          ← Entry point
├── .env              ← Environment variables (DB URI, PORT)
├── .gitignore        ← Add .env and node_modules here
├── models/
│   └── User.js       ← Mongoose schema/model
└── routes/
    └── users.js      ← Express routes`
      },
      {
        type: "code",
        title: ".env file",
        lang: "bash",
        code: `PORT=5000
MONGO_URI=mongodb+srv://daredre:mypass123@cluster0.abc123.mongodb.net/myAppDB?retryWrites=true&w=majority`
      },
      {
        type: "code",
        title: "index.js — Connect Express + MongoDB",
        lang: "js",
        code: `const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // loads .env variables

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));`
      },
      {
        type: "tip",
        content: "mongoose.connect() returns a Promise. That's why we use .then() and .catch(). If the connection fails, you'll see the error immediately in your terminal."
      }
    ]
  },
  {
    id: 4,
    title: "Mongoose Schema & Models",
    emoji: "🏗️",
    sections: [
      {
        type: "concept",
        title: "Schema = Blueprint, Model = Factory",
        content: `A Schema defines the shape of your documents — what fields exist, their types, and rules (required, unique, default values).

A Model is a JavaScript class built from that schema. You use the Model to actually CREATE, READ, UPDATE, and DELETE documents in the collection.

Rule: 1 Schema → 1 Model → 1 MongoDB Collection`
      },
      {
        type: "code",
        title: "models/User.js",
        lang: "js",
        code: `const mongoose = require('mongoose');

// 1. Define the Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,      // field must exist
    trim: true           // removes whitespace automatically
  },
  email: {
    type: String,
    required: true,
    unique: true,        // no duplicate emails
    lowercase: true      // auto-converts to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // only these values allowed
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now   // auto-set when document is created
  }
});

// 2. Create the Model
const User = mongoose.model('User', userSchema);
// 'User' → MongoDB will create a collection called 'users' (auto-pluralized, lowercased)

// 3. Export it
module.exports = User;`
      },
      {
        type: "tip",
        content: "mongoose.model('User', userSchema) — the first argument 'User' is what Mongoose uses to name the collection. It automatically becomes 'users' in your database. 'Post' → 'posts', 'Product' → 'products'."
      }
    ]
  },
  {
    id: 5,
    title: "CRUD Operations — The Core 4",
    emoji: "⚡",
    sections: [
      {
        type: "concept",
        title: "CRUD = Create, Read, Update, Delete",
        content: `Everything you do with a database is one of these four operations. In MongoDB + Mongoose, each has specific methods. Let's build a full users route file that covers all 4.`
      },
      {
        type: "code",
        title: "routes/users.js — Full CRUD",
        lang: "js",
        code: `const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ─────────────────────────────────────────
// CREATE — POST /api/users
// ─────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body); // create a new document instance
    await user.save();               // save it to MongoDB
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// READ ALL — GET /api/users
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // returns array of ALL users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// READ ONE — GET /api/users/:id
// ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// UPDATE — PUT /api/users/:id
// ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
      // new: true → return the UPDATED document (not the old one)
      // runValidators: true → still enforce schema rules on update
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ─────────────────────────────────────────
// DELETE — DELETE /api/users/:id
// ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;`
      },
      {
        type: "tip",
        content: "Always use async/await with Mongoose operations — they're all Promise-based. And ALWAYS wrap them in try/catch or you'll get unhandled promise rejections crashing your server."
      }
    ]
  },
  {
    id: 6,
    title: "Querying — Finding Specific Data",
    emoji: "🔍",
    sections: [
      {
        type: "concept",
        title: "Going Beyond .find()",
        content: `Most real apps need to query specific data — find users by email, filter by role, sort by date, limit results. Mongoose gives you powerful query methods for all of this.`
      },
      {
        type: "code",
        title: "Common Query Patterns",
        lang: "js",
        code: `// Find by a specific field
const user = await User.findOne({ email: 'daredre@dev.com' });

// Find all admins
const admins = await User.find({ role: 'admin' });

// Find with multiple conditions (AND)
const result = await User.find({ role: 'user', name: 'Daredre' });

// Select only certain fields (like SELECT in SQL)
const users = await User.find().select('name email'); // only return name and email
const users2 = await User.find().select('-password'); // return everything EXCEPT password

// Sort results
const newest = await User.find().sort({ createdAt: -1 }); // -1 = descending (newest first)
const oldest = await User.find().sort({ createdAt: 1 });  // 1 = ascending

// Limit and Skip (for pagination)
const page1 = await User.find().limit(10).skip(0);  // first 10
const page2 = await User.find().limit(10).skip(10); // next 10

// Count documents
const total = await User.countDocuments({ role: 'user' });

// Check if document exists
const exists = await User.exists({ email: 'test@test.com' }); // returns _id or null`
      },
      {
        type: "code",
        title: "Query Operators (like WHERE in SQL)",
        lang: "js",
        code: `// Greater than / Less than
const recent = await User.find({ createdAt: { $gt: new Date('2024-01-01') } });

// $gte = >=, $lte = <=, $ne = not equal
const notAdmin = await User.find({ role: { $ne: 'admin' } });

// $in = value is in array
const specificRoles = await User.find({ role: { $in: ['admin', 'moderator'] } });

// $regex = pattern matching (like LIKE in SQL)
const nameSearch = await User.find({ name: { $regex: 'dare', $options: 'i' } });
// $options: 'i' makes it case-insensitive`
      },
      {
        type: "tip",
        content: "MongoDB query operators always start with $. The $ sign is your clue that it's a MongoDB operator — $gt, $lt, $in, $or, $and, $regex, etc."
      }
    ]
  },
  {
    id: 7,
    title: "Connecting to Your Football App",
    emoji: "⚽",
    sections: [
      {
        type: "concept",
        title: "Applying This to Your Real Project",
        content: `You're building a football viewing website with API-Football. Here's how MongoDB fits in — you'd use it to store things like: saved favourite teams, user accounts, cached match data, or user comments on matches.`
      },
      {
        type: "code",
        title: "Example: Saving Favourite Teams",
        lang: "js",
        code: `// models/FavouriteTeam.js
const mongoose = require('mongoose');

const favouriteTeamSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  teamId: {
    type: Number,   // API-Football uses numeric IDs for teams
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  teamLogo: {
    type: String    // URL to the team's logo from the API
  },
  league: {
    type: String
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FavouriteTeam', favouriteTeamSchema);`
      },
      {
        type: "code",
        title: "Route: Save a favourite team",
        lang: "js",
        code: `// routes/favourites.js
const express = require('express');
const router = express.Router();
const FavouriteTeam = require('../models/FavouriteTeam');

// POST /api/favourites — save a team
router.post('/', async (req, res) => {
  try {
    const { userId, teamId, teamName, teamLogo, league } = req.body;

    // Check if already saved
    const alreadySaved = await FavouriteTeam.findOne({ userId, teamId });
    if (alreadySaved) {
      return res.status(400).json({ message: 'Team already in favourites' });
    }

    const favourite = new FavouriteTeam({ userId, teamId, teamName, teamLogo, league });
    await favourite.save();
    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/favourites/:userId — get user's favourites
router.get('/:userId', async (req, res) => {
  try {
    const favourites = await FavouriteTeam.find({ userId: req.params.userId })
      .sort({ savedAt: -1 });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;`
      },
      {
        type: "tip",
        content: "This is the real power of combining Express + MongoDB. Your API-Football calls get the live data, MongoDB stores the user's preferences and history. Two data sources, one clean backend."
      }
    ]
  },
  {
    id: 8,
    title: "Environment Variables & .gitignore",
    emoji: "🔒",
    sections: [
      {
        type: "concept",
        title: "This is Not Optional — Protect Your Credentials",
        content: `Every professional keeps secrets (API keys, DB passwords) out of their code. Here's the exact setup you need every single time.`
      },
      {
        type: "code",
        title: ".env",
        lang: "bash",
        code: `PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
NODE_ENV=development`
      },
      {
        type: "code",
        title: ".gitignore",
        lang: "bash",
        code: `node_modules/
.env
.DS_Store`
      },
      {
        type: "code",
        title: "Using dotenv in your code",
        lang: "js",
        code: `// At the TOP of index.js, before anything else:
require('dotenv').config();

// Now you can access your variables anywhere:
const uri = process.env.MONGO_URI;
const port = process.env.PORT;`
      },
      {
        type: "tip",
        content: "If you accidentally pushed your .env to GitHub, immediately rotate your MongoDB password in Atlas. Go to Database Access → Edit user → change password. Then update your .env."
      }
    ]
  },
  {
    id: 9,
    title: "Error Handling & Best Practices",
    emoji: "🛡️",
    sections: [
      {
        type: "concept",
        title: "Writing Production-Quality MongoDB Code",
        content: `The difference between junior and senior backend code is mostly error handling and structure. These patterns will make your code bulletproof.`
      },
      {
        type: "code",
        title: "Global Error Handler (add to index.js)",
        lang: "js",
        code: `// Handle Mongoose validation errors nicely
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors: messages });
  }
  
  if (err.code === 11000) {
    // Duplicate key error (e.g. duplicate email)
    return res.status(400).json({ message: 'That value already exists' });
  }
  
  res.status(500).json({ message: 'Server error' });
});`
      },
      {
        type: "code",
        title: "Validate ObjectId before querying",
        lang: "js",
        code: `const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
  // If id is not a valid MongoDB ObjectId, don't even query
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const user = await User.findById(req.params.id);
  // ...
});`
      },
      {
        type: "steps",
        title: "Senior Dev Checklist for Every MongoDB Project",
        steps: [
          "✅ Connection string is in .env (never hardcoded)",
          "✅ .env is in .gitignore",
          "✅ All Mongoose operations use async/await inside try/catch",
          "✅ ObjectId is validated before .findById()",
          "✅ Sensitive fields (passwords) excluded from API responses with .select('-password')",
          "✅ Schema validation rules are defined (required, unique, minlength, etc.)",
          "✅ Error responses have consistent JSON format { message: '...' }"
        ]
      }
    ]
  }
];

const typeStyles = {
  concept: { bg: "#0f172a", border: "#1e40af", badge: "#1d4ed8", label: "CONCEPT" },
  code: { bg: "#0a0f1e", border: "#16213e", badge: "#0f3460", label: "CODE" },
  tip: { bg: "#0c1a0c", border: "#14532d", badge: "#166534", label: "💡 PRO TIP" },
  comparison: { bg: "#0f0a1e", border: "#4c1d95", badge: "#6d28d9", label: "COMPARISON" },
  steps: { bg: "#1a0a00", border: "#92400e", badge: "#b45309", label: "STEPS" },
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "12px 0" }}>
      <button onClick={copy} style={{
        position: "absolute", top: 8, right: 8, background: copied ? "#166534" : "#1e293b",
        color: copied ? "#4ade80" : "#94a3b8", border: "1px solid #334155",
        borderRadius: 4, padding: "2px 10px", fontSize: 11, cursor: "pointer", zIndex: 1
      }}>{copied ? "Copied!" : "Copy"}</button>
      <pre style={{
        background: "#020617", border: "1px solid #1e293b", borderRadius: 8,
        padding: "16px 48px 16px 16px", overflowX: "auto", margin: 0,
        fontSize: 13, lineHeight: 1.7, color: "#e2e8f0",
        fontFamily: "'Fira Code', 'Cascadia Code', monospace"
      }}>{code}</pre>
    </div>
  );
}

function Section({ section }) {
  const style = typeStyles[section.type] || typeStyles.concept;
  return (
    <div style={{
      background: style.bg, border: `1px solid ${style.border}`,
      borderRadius: 10, padding: "16px 20px", marginBottom: 14
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: section.title ? 10 : 0 }}>
        <span style={{
          background: style.badge, color: "#fff", fontSize: 10,
          fontWeight: 700, padding: "2px 8px", borderRadius: 4,
          letterSpacing: 1, fontFamily: "monospace"
        }}>{style.label}</span>
        {section.title && <span style={{ color: "#cbd5e1", fontWeight: 600, fontSize: 14 }}>{section.title}</span>}
      </div>

      {section.type === "concept" && (
        <p style={{ color: "#94a3b8", lineHeight: 1.8, margin: 0, fontSize: 14, whiteSpace: "pre-line" }}>
          {section.content}
        </p>
      )}

      {section.type === "tip" && (
        <p style={{ color: "#86efac", lineHeight: 1.7, margin: 0, fontSize: 13 }}>
          {section.content}
        </p>
      )}

      {section.type === "code" && <CodeBlock code={section.code} />}

      {section.type === "comparison" && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          {section.rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1e293b" }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 12px",
                  color: i === 0 ? "#818cf8" : "#cbd5e1",
                  fontWeight: i === 0 ? 700 : 400,
                  background: i === 0 ? "#0f172a" : "transparent"
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </table>
      )}

      {section.type === "steps" && (
        <ol style={{ margin: 0, paddingLeft: 20, color: "#fdba74", fontSize: 13, lineHeight: 2 }}>
          {section.steps.map((step, i) => (
            <li key={i} style={{ marginBottom: 2 }}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function MongoDBMasterclass() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const lesson = lessons[current];

  const markDone = () => {
    setCompleted(prev => new Set([...prev, lesson.id]));
    if (current < lessons.length - 1) setCurrent(current + 1);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#030712",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#f1f5f9"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderBottom: "1px solid #1e293b", padding: "20px 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: "#16a34a",
            borderRadius: 10, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20
          }}>🍃</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>
              MongoDB Masterclass
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              {lessons.length} lessons · Express integration · Atlas free tier
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "#4ade80" }}>
            {completed.size}/{lessons.length} done
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: 14, height: 4, background: "#1e293b",
          borderRadius: 4, overflow: "hidden"
        }}>
          <div style={{
            height: "100%", width: `${(completed.size / lessons.length) * 100}%`,
            background: "linear-gradient(90deg, #16a34a, #4ade80)",
            transition: "width 0.4s ease", borderRadius: 4
          }} />
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 100px)" }}>
        {/* Sidebar */}
        <div style={{
          width: 220, background: "#0a0f1a", borderRight: "1px solid #1e293b",
          overflowY: "auto", padding: "12px 0"
        }}>
          {lessons.map((l, i) => (
            <button key={l.id} onClick={() => setCurrent(i)} style={{
              width: "100%", textAlign: "left", padding: "10px 16px",
              background: current === i ? "#0f172a" : "transparent",
              border: "none", borderLeft: current === i ? "3px solid #16a34a" : "3px solid transparent",
              cursor: "pointer", transition: "all 0.15s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{l.emoji}</span>
                <div>
                  <div style={{
                    fontSize: 11, color: current === i ? "#f1f5f9" : "#475569",
                    fontWeight: current === i ? 600 : 400, lineHeight: 1.3
                  }}>
                    {l.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>
                    Lesson {l.id}
                    {completed.has(l.id) && <span style={{ color: "#4ade80", marginLeft: 4 }}>✓</span>}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {/* Lesson header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#475569", marginBottom: 6, letterSpacing: 1 }}>
                LESSON {lesson.id} OF {lessons.length}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}>
                <span>{lesson.emoji}</span>
                <span>{lesson.title}</span>
              </div>
            </div>

            {/* Sections */}
            {lesson.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}

            {/* Navigation */}
            <div style={{
              display: "flex", gap: 12, marginTop: 28, paddingTop: 20,
              borderTop: "1px solid #1e293b"
            }}>
              {current > 0 && (
                <button onClick={() => setCurrent(current - 1)} style={{
                  padding: "10px 20px", background: "#1e293b", color: "#cbd5e1",
                  border: "1px solid #334155", borderRadius: 8,
                  cursor: "pointer", fontSize: 13, fontWeight: 500
                }}>← Previous</button>
              )}
              <button onClick={markDone} style={{
                padding: "10px 24px", marginLeft: "auto",
                background: completed.has(lesson.id) ? "#14532d" : "linear-gradient(135deg, #16a34a, #15803d)",
                color: "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600
              }}>
                {completed.has(lesson.id)
                  ? "✓ Done"
                  : current === lessons.length - 1
                    ? "Complete Course ✓"
                    : "Mark Done & Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
