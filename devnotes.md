## 23 Apr 2026

- Getting started on this! I want to make an extremely customizable group management app that encompasses everything about a group - ELO (if it's competitive), polls for deciding what to do next (if it's a book club/board game/etc), ratings, etc. I already made a weighted poll app that allows users to change group settings, but this app will be a LOT more than just that. It should have a bunch of options for weighted and unweighted polls for deciding what to do, group announcements, group gather location and push alerts for time, group settings for competitive/non-competitive, ELO ratings (calculated from inputted results every time) if competitive, user comments and ratings for each session, information for each item or session (each book, board game, etc), etc. I just find it extremely frustrating that every hobby has its own group management apps so it would cost me so much to subscribe to all of them every month
- Working on the AI guidelines
- AI guidelines complete for now

## 25 Apr 2026

- Rough user flow complete - next time, finalise this, come up with the DB schema, put out the API and change the UI

## 2 May 2026

- Added the headers to the guideline files
- Completed the initial DB schema
- Gamification idea: deck building
  - Essentially, as users engage more in some activities, they get more cards of that type. (e.g. "book" cards or "board game" cards). They get to create their own deck with that and form parties with people to go against monsters. Make the game very simple - not a full blown turn based card game like slay the spire. -> This is too complicated, and high maintenance because we have to continue coming up with different cards
- Different idea: Ship crew
  - Engaging in activities give your character more of that trait - e.g. +1 knowledge from books, +1 cunning from board games, +1 fit from tennis or running, etc. Give several parameters - Knowledge, cunning, fit, stamina, speed, creative, etc. Then, add several "positions" of the crew where characters of that particular type are more likely to do well. Then, allow them to go on adventures or engage in battles. Going on adventures of different types may give you random awards (premium subscription coupons for the app, different items for the character, etc). Battles put your crew against a random enemy and you're battling to take each other's gold. This should all be pixelated.
  - This can easily be implemented with very little work using PixiJS embedded in React, but create the rest of the app first

## 8 Jun 2026

- Initial UI with mock data set up
