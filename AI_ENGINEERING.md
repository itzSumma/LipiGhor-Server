# LipiGhor Backend — AI Engineering Rules

## 1. Project Goal

Build LipiGhor as a production-ready **AI-powered Bangla Font Discovery & Download Platform**.

Users should be able to:

* Discover Bangla fonts
* Search and filter fonts
* Preview and compare fonts
* Save favorites/collections
* Download fonts
* Find suitable fonts using AI

**Stack:** Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, OpenRouter.

---

## 2. Development Rule

All backend work MUST follow `task.md` phase by phase.

```text
Read → Audit → Plan → Implement → Test → Verify → Mark Complete
```

Never skip phases or implement future-phase features unless explicitly requested.

Before changing code:

* Inspect the existing codebase.
* Reuse existing code when appropriate.
* Do not overwrite working functionality.
* Do not create unnecessary files.

---

## 3. Architecture

Use modular layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

Recommended structure:

```text
src/
├── config/
├── middlewares/
├── utils/
├── types/
└── modules/
    ├── auth/
    ├── fonts/
    ├── categories/
    ├── designers/
    ├── favorites/
    ├── collections/
    ├── downloads/
    ├── admin/
    └── ai/
```

Keep controllers thin.
Business logic belongs in services.

---

## 4. Code Quality

Always:

* Use strict TypeScript.
* Avoid `any`.
* Validate all external input with Zod.
* Use centralized error handling.
* Use consistent API responses.
* Keep code modular and readable.
* Avoid unnecessary dependencies and abstractions.

Never claim something works without actually testing it.

---

## 5. Security

Always:

* Hash passwords securely.
* Protect authenticated routes.
* Protect ADMIN routes server-side.
* Never trust client-provided roles or permissions.
* Never expose secrets.
* Validate uploaded files.
* Apply rate limiting where needed.
* Keep API keys server-side.
* Sanitize production errors.

Never commit `.env`.

---

# 6. Database Rules

MongoDB/Mongoose is the source of truth.

Font data should contain structured metadata such as:

```text
name
slug
designer
categories
styles
moods
useCases
tags
weights
formats
languageSupport
license
fileUrl
downloadCount
favoriteCount
isPublished
```

Use indexes for real search/query patterns.

Avoid unnecessary database queries and N+1 problems.

---

# 7. AI Engineering Rules

AI is a feature, NOT the source of truth.

The AI must never invent or directly control:

* Font data
* Designer information
* License information
* Download URLs
* Database mutations

Correct flow:

```text
User Query
   ↓
OpenRouter
   ↓
Structured Intent
   ↓
Validate AI Output
   ↓
MongoDB Search
   ↓
Backend Relevance Scoring
   ↓
Font Recommendations
```

The backend owns the actual font search and ranking.

---

# 8. OpenRouter Rules

Use an AI service/provider abstraction:

```text
AI Controller
   ↓
AI Service
   ↓
OpenRouter Provider
   ↓
LLM
```

Never call OpenRouter directly from controllers or frontend.

Keep:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
```

server-side only.

Handle:

* Timeout
* Rate limit
* Invalid AI response
* Provider failure
* Empty result

AI failure must NOT break normal font search.

---

# 9. AI Font Finder

The AI Font Finder should understand natural-language requirements such as:

> "বিয়ের কার্ডের জন্য elegant handwritten বাংলা font চাই"

Convert this into structured intent:

```text
style
mood
useCase
language
weight
keywords
```

Then use the backend/database to find matching fonts.

Recommendations must be explainable and based on actual stored font metadata.

---

# 10. Testing & Verification

After every phase:

```text
Type Check
↓
Lint
↓
Tests
↓
Build
↓
API Verification
```

Test important:

* Authentication
* Authorization
* Font CRUD
* Search/filtering
* Downloads
* Favorites
* AI intent extraction
* AI ranking
* AI failure cases

Do not depend on live AI calls for normal automated tests. Mock AI responses.

---

# 11. Definition of Done

A task is complete only when:

* Code is implemented.
* Existing functionality still works.
* Validation exists.
* Errors are handled.
* Security is considered.
* Tests pass.
* TypeScript passes.
* Lint passes.
* Build passes.
* `task.md` is updated.

---

# 12. Final Principle

Do not build LipiGhor as:

> "A website with an AI API."

Build it as:

> **A real Bangla typography platform where AI improves font discovery while the backend remains responsible for data, business logic, ranking, security and reliability.**
