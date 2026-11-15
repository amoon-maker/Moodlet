# Moodlet

## About the Project

Moodlet is a mobile application I developed as my final project. The idea behind it is to bring a little fun and positivity into everyday life.

Users can choose how they are feeling, such as happy, sad, stressed, tired, or bored. Based on their mood, the app gives them a small challenge to try. Once they complete it, they unlock a matching reward with a funny cat GIF, a positive caption, and an inspirational quote.

I wanted to create something simple, enjoyable, and easy to use.

## Features

- **Welcome Screen:** Enter your name and receive a personalized greeting.
- **Mood Selection:** Choose from five different moods.
- **Mini-Challenges:** Get small, random challenges based on your mood.
- **Funny Rewards:** Unlock matching cat GIFs and positive messages.
- **Positive Quotes:** Get random quotes using the DummyJSON API.
- **My Collection:** Save your favorite rewards, revisit them, or delete them individually.
- **Local Storage:** Your name and saved rewards remain available when you reopen the app.
- **Backup Content:** The app includes fallback content if an API is unavailable.

## Technologies Used

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- DummyJSON Quotes API
- GIPHY API (extra for fun)

## APIs

**DummyJSON Quotes API**

Used to fetch random inspirational quotes. This is a public API that does not require an API key.

https://dummyjson.com/quotes/random

**GIPHY API**

Used to find funny cat GIFs related to the selected mood. This is an optional feature and requires an API key.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure GIPHY (optional)

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_GIPHY_API_KEY=your_api_key_here
```

If no GIPHY key is configured, the app can still run using its backup content.

Do not include the `.env` file when submitting the project.

### 3. Start the application

```bash
npx expo start
```

### 4. Open on Android

Start an Android emulator and press `a` in the terminal to open Moodlet.

## Project Structure

```text
src/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── explore.tsx
│   │   └── collection.tsx
│   ├── challenge.tsx
│   ├── reward.tsx
│   ├── saved-reward.tsx
│   ├── welcome.tsx
│   └── _layout.tsx
├── components/
├── constants/
├── hooks/
└── lib/
    ├── api.ts
    ├── storage.ts
    └── types.ts
```

## Final Note

This project gave me the opportunity to practise what I've learned throughout the course, especially working with React Native, TypeScript, APIs, navigation, and local storage.

There are still things I would like to improve in the future, but I'm happy with what I've learned and what I've been able to build so far.

**Thank you**
