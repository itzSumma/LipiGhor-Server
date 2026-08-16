# LipiGhor Backend — Task Plan

> Follow this file phase by phase.
> Follow all rules in `AI_ENGINEERING.md`.
> Do not skip phases or implement future-phase features early.

---

# PHASE 01 — Initial Backend Setup

### Goal

Create a clean Express + TypeScript backend foundation.

* [x] Initialize Node.js project
* [x] Configure TypeScript
* [x] Configure Express
* [x] Configure ESLint + Prettier
* [x] Create `.env` and `.env.example`
* [x] Configure environment variables
* [x] Create `app.ts`
* [x] Create `server.ts`
* [x] Configure CORS
* [x] Configure JSON parsing
* [x] Add security middleware
* [x] Create `/health` endpoint
* [x] Create basic error handling
* [x] Create basic logger
* [x] Add development/build scripts

### Verify

* [x] Dev server works
* [x] `/health` works
* [x] TypeScript passes
* [x] ESLint passes
* [x] Build passes

---

# PHASE 02 — Database Setup

### Goal

Connect MongoDB using Mongoose.

* [ ] Install/configure Mongoose
* [ ] Create database connection
* [ ] Add connection error handling
* [ ] Add graceful shutdown
* [ ] Create database configuration
* [ ] Verify MongoDB connection

### Verify

* [ ] Server connects successfully
* [ ] Connection failure is handled properly
* [ ] Build passes

---

# PHASE 03 — Common Backend Architecture

### Goal

Create reusable infrastructure before feature modules.

* [ ] Create modular folder structure
* [ ] Create custom `AppError`
* [ ] Create centralized error middleware
* [ ] Create async handler
* [ ] Create API response utility
* [ ] Create validation middleware
* [ ] Create pagination utility
* [ ] Create common types
* [ ] Standardize success/error responses

### Verify

* [ ] Error handling tested
* [ ] Validation tested
* [ ] Build passes

---

# PHASE 04 — Authentication & Authorization

### Goal

Implement secure user authentication.

* [ ] Create User model
* [ ] Add USER/ADMIN roles
* [ ] Implement registration
* [ ] Implement login
* [ ] Implement logout
* [ ] Implement current-user endpoint
* [ ] Hash passwords
* [ ] Implement JWT/session strategy
* [ ] Use secure HTTP-only cookies if applicable
* [ ] Create auth middleware
* [ ] Create role middleware
* [ ] Prevent client-controlled ADMIN role
* [ ] Add authentication rate limiting

### Verify

* [ ] Register works
* [ ] Login works
* [ ] Logout works
* [ ] Protected route works
* [ ] ADMIN route is protected
* [ ] Invalid authentication is rejected

---

# PHASE 05 — Font & Category Domain

### Goal

Create the core Bangla font data system.

## Font

* [ ] Create Font model
* [ ] Add slug
* [ ] Add structured font metadata
* [ ] Add designer reference
* [ ] Add category references
* [ ] Add styles
* [ ] Add moods
* [ ] Add use cases
* [ ] Add tags
* [ ] Add weights
* [ ] Add formats
* [ ] Add language support
* [ ] Add license information
* [ ] Add file/preview fields
* [ ] Add download/favorite counters
* [ ] Add publish status
* [ ] Add required indexes

## Category

* [ ] Create Category model
* [ ] Create category CRUD
* [ ] Add validation
* [ ] Prevent duplicates
* [ ] Protect admin mutations

### Verify

* [ ] Models work
* [ ] Validation works
* [ ] Indexes are reviewed

---

# PHASE 06 — Designer System

### Goal

Manage Bangla font designers.

* [ ] Create Designer model
* [ ] Add profile fields
* [ ] Add designer CRUD
* [ ] Connect designers with fonts
* [ ] Create public designer profile
* [ ] Get designer fonts
* [ ] Add designer validation
* [ ] Protect admin mutations

### Verify

* [ ] Designer CRUD works
* [ ] Designer-font relationship works

---

# PHASE 07 — Font Management

### Goal

Build complete font CRUD and public font APIs.

## Admin

* [ ] Create font
* [ ] Update font
* [ ] Delete/archive font
* [ ] Publish font
* [ ] Unpublish font
* [ ] Manage metadata
* [ ] Assign designer
* [ ] Assign categories

## Public

* [ ] Get published fonts
* [ ] Get font by slug
* [ ] Get font details
* [ ] Get related fonts

### Verify

* [ ] ADMIN can manage fonts
* [ ] USER cannot modify fonts
* [ ] Unpublished fonts are hidden publicly
* [ ] Validation works

---

# PHASE 08 — Font Search & Filtering

### Goal

Build a powerful non-AI font discovery system.

* [ ] Text search
* [ ] Search by font name
* [ ] Search by tags
* [ ] Search by designer
* [ ] Filter by category
* [ ] Filter by style
* [ ] Filter by mood
* [ ] Filter by use case
* [ ] Filter by weight
* [ ] Filter by license
* [ ] Filter by format
* [ ] Filter by language
* [ ] Add sorting
* [ ] Add pagination
* [ ] Optimize MongoDB indexes
* [ ] Prevent unnecessary queries

### Verify

* [ ] Search works
* [ ] Filters can be combined
* [ ] Pagination works
* [ ] Sorting works
* [ ] Query performance is reviewed

---

# PHASE 09 — Font File Storage

### Goal

Implement secure font file management.

* [ ] Choose storage strategy
* [ ] Create storage abstraction
* [ ] Upload font files
* [ ] Validate file type
* [ ] Validate file size
* [ ] Generate safe filenames
* [ ] Store file metadata
* [ ] Replace files
* [ ] Delete files
* [ ] Protect upload endpoints

Supported formats where required:

```text
TTF
OTF
WOFF
WOFF2
```

### Verify

* [ ] Valid files upload
* [ ] Invalid files are rejected
* [ ] File size limits work
* [ ] Admin-only upload works

---

# PHASE 10 — Favorites & Collections

### Goal

Allow users to save and organize fonts.

## Favorites

* [ ] Add favorite
* [ ] Remove favorite
* [ ] Check favorite status
* [ ] Get user favorites

## Collections

* [ ] Create collection
* [ ] Rename collection
* [ ] Delete collection
* [ ] Add font
* [ ] Remove font
* [ ] Get collection
* [ ] Prevent duplicate fonts

### Verify

* [ ] Users can manage their own data
* [ ] Users cannot access another user's collections
* [ ] Duplicate relationships are prevented

---

# PHASE 11 — Font Comparison

### Goal

Support frontend font comparison.

* [ ] Create comparison endpoint
* [ ] Accept multiple font IDs
* [ ] Validate maximum comparison count
* [ ] Fetch fonts efficiently
* [ ] Return normalized comparison data
* [ ] Exclude unpublished fonts

### Verify

* [ ] Valid comparison works
* [ ] Invalid IDs are handled
* [ ] Comparison limit works

---

# PHASE 12 — Download System & Analytics

### Goal

Implement real font downloads with tracking.

* [ ] Create Download model
* [ ] Create download endpoint
* [ ] Verify font exists
* [ ] Verify font is published
* [ ] Track authenticated downloads
* [ ] Track anonymous downloads where appropriate
* [ ] Increment download count safely
* [ ] Prevent accidental duplicate counting
* [ ] Add basic download analytics

### Verify

* [ ] Download works
* [ ] Download count updates
* [ ] Invalid/unpublished fonts cannot be downloaded
* [ ] Analytics data is accurate

---

# PHASE 13 — AI Foundation

### Goal

Integrate OpenRouter safely.

* [ ] Add OpenRouter configuration
* [ ] Create AI provider abstraction
* [ ] Create OpenRouter provider
* [ ] Create AI service
* [ ] Add timeout handling
* [ ] Handle provider errors
* [ ] Add AI rate limiting
* [ ] Keep API key server-side
* [ ] Create AI module structure

### Architecture

```text
AI Controller
      ↓
AI Service
      ↓
OpenRouter Provider
      ↓
LLM
```

### Verify

* [ ] OpenRouter connection works
* [ ] API key is not exposed
* [ ] Provider failure is handled

---

# PHASE 14 — AI Font Finder: Intent Extraction

### Goal

Understand natural-language Bangla font requirements.

Example:

> "বিয়ের কার্ডের জন্য elegant handwritten বাংলা font চাই"

AI should extract structured intent:

```text
language
style
mood
useCase
weight
keywords
```

Tasks:

* [ ] Create Font Finder prompt
* [ ] Define structured output schema
* [ ] Validate AI output with Zod
* [ ] Normalize AI values
* [ ] Handle missing fields
* [ ] Handle malformed output
* [ ] Reject unknown values

### Verify

* [ ] Bangla query works
* [ ] English query works
* [ ] Mixed-language query works
* [ ] Invalid AI output is handled

---

# PHASE 15 — AI Font Search & Ranking

### Goal

Connect AI intent with real MongoDB font data.

Flow:

```text
User Query
   ↓
OpenRouter
   ↓
Structured Intent
   ↓
Validate
   ↓
MongoDB Candidate Search
   ↓
Relevance Scoring
   ↓
Top Recommendations
```

Tasks:

* [ ] Build candidate search
* [ ] Match language
* [ ] Match style
* [ ] Match mood
* [ ] Match use case
* [ ] Match tags
* [ ] Add relevance scoring
* [ ] Rank candidates
* [ ] Return top matching fonts
* [ ] Add recommendation explanation

Example scoring:

```text
Style       +30
Use case    +30
Mood        +20
Tags        +10
Language     +5
Popularity   +5
```

### Important

AI extracts intent.

**Backend performs the actual search and ranking.**

### Verify

* [ ] Relevant fonts are returned
* [ ] Ranking works
* [ ] No matching fonts is handled
* [ ] AI cannot invent database fonts

---

# PHASE 16 — AI Font Finder API

### Goal

Create the production API.

```text
POST /api/ai/font-finder
```

Request:

```json
{
  "query": "premium traditional Bangla restaurant logo font চাই"
}
```

Response should contain:

* Extracted intent
* Recommended fonts
* Match score
* Recommendation reason

Tasks:

* [ ] Controller
* [ ] Validation
* [ ] AI service
* [ ] Search service
* [ ] Ranking service
* [ ] Rate limiting
* [ ] Error handling
* [ ] Logging

### Verify

* [ ] API works
* [ ] Invalid request rejected
* [ ] AI failure handled
* [ ] Normal search fallback works

---

# PHASE 17 — AI Optimization

### Goal

Control AI cost and improve reliability.

* [ ] Normalize repeated queries
* [ ] Add caching strategy
* [ ] Add request length limits
* [ ] Add timeout
* [ ] Limit retries
* [ ] Prevent unnecessary AI calls
* [ ] Add fallback to normal search

### Verify

* [ ] Repeated queries do not create unnecessary AI calls
* [ ] AI failure does not break font discovery

---

# PHASE 18 — AI Search History

### Goal

Store authenticated users' AI searches.

* [ ] Create AISearch model
* [ ] Save query
* [ ] Save extracted intent
* [ ] Save recommended font IDs
* [ ] Get user history
* [ ] Delete history
* [ ] Add indexes
* [ ] Protect user data

### Verify

* [ ] User sees only own history
* [ ] History deletion works

---

# PHASE 19 — Admin Analytics

### Goal

Create meaningful platform analytics.

Track:

* [ ] Total users
* [ ] Total fonts
* [ ] Published fonts
* [ ] Total downloads
* [ ] Total favorites
* [ ] Popular fonts
* [ ] Popular categories
* [ ] Popular designers
* [ ] AI search count
* [ ] AI recommendation clicks
* [ ] AI → download activity

### Verify

* [ ] Analytics use real database data
* [ ] No hardcoded numbers

---

# PHASE 20 — Security Hardening

### Goal

Audit the complete backend.

* [ ] Review authentication
* [ ] Review authorization
* [ ] Review validation
* [ ] Add/verify rate limiting
* [ ] Configure Helmet
* [ ] Review CORS
* [ ] Review file upload security
* [ ] Review NoSQL injection risks
* [ ] Review AI endpoint security
* [ ] Review secrets
* [ ] Review production errors
* [ ] Review sensitive logs

### Verify

* [ ] Security audit completed
* [ ] No critical issues remain

---

# PHASE 21 — Testing

### Goal

Create reliable automated tests.

## Unit tests

* [ ] Auth service
* [ ] Font service
* [ ] Search service
* [ ] Ranking service
* [ ] Validation
* [ ] AI intent processing

## Integration tests

* [ ] Authentication
* [ ] Authorization
* [ ] Font CRUD
* [ ] Search
* [ ] Favorites
* [ ] Collections
* [ ] Downloads
* [ ] AI Font Finder

## AI tests

Mock OpenRouter responses and test:

* [ ] Valid response
* [ ] Malformed response
* [ ] Missing fields
* [ ] Unknown values
* [ ] Timeout
* [ ] Provider error
* [ ] No matching fonts

---

# PHASE 22 — API Documentation

### Goal

Document the backend for frontend and future developers.

* [ ] Document authentication APIs
* [ ] Document font APIs
* [ ] Document search/filter APIs
* [ ] Document designer APIs
* [ ] Document favorite APIs
* [ ] Document collection APIs
* [ ] Document download APIs
* [ ] Document AI Font Finder
* [ ] Document admin APIs
* [ ] Document errors
* [ ] Document pagination

Use Swagger/OpenAPI if appropriate.

---

# PHASE 23 — Production Readiness

### Goal

Prepare backend for real deployment.

* [ ] Production environment configuration
* [ ] Production MongoDB
* [ ] Production storage
* [ ] Production CORS
* [ ] Secure cookies
* [ ] Logging
* [ ] Health check
* [ ] Graceful shutdown
* [ ] Error monitoring
* [ ] Rate limits
* [ ] Database indexes
* [ ] Performance review
* [ ] API response review
* [ ] Remove unused code/dependencies

---

# PHASE 24 — Final Audit

Before marking LipiGhor backend complete:

## Architecture

* [ ] Modular
* [ ] Maintainable
* [ ] Controllers are thin
* [ ] Business logic is in services
* [ ] AI is isolated

## Security

* [ ] Authentication secure
* [ ] Authorization secure
* [ ] Inputs validated
* [ ] Uploads secured
* [ ] Secrets protected
* [ ] AI endpoint protected

## Database

* [ ] Models reviewed
* [ ] Relationships reviewed
* [ ] Indexes reviewed
* [ ] Queries optimized

## AI

* [ ] OpenRouter works
* [ ] AI output validated
* [ ] Backend owns ranking
* [ ] AI failure fallback exists
* [ ] Rate limiting exists
* [ ] Caching considered
* [ ] AI cost controlled

## Quality

* [ ] Tests pass
* [ ] TypeScript passes
* [ ] ESLint passes
* [ ] Build passes
* [ ] API documentation updated
* [ ] README updated

---

# FINAL RULE

Do not build LipiGhor as:

> "A font download API with an AI chatbot."

Build it as:

> **A production-ready Bangla typography platform where AI helps users discover the right fonts, while the backend controls data, search, ranking, authentication, security, downloads and business logic.**
