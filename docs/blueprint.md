# **App Name**: VoiceZen

## Core Features:

- Audio Storage: Store voice guidance files in Firebase Storage, categorized by type (workout, yoga, meditation).
- Audio Playback: Retrieve and play voice guidance based on user selected category with pause, restart, and stop functions.
- Real-time Progress Display: Show the remaining time and current step during audio playback.
- Session Logging: Record the date, category, and duration of each session to Firestore.
- Progress Tracking: Display the number of sessions completed today and the current streak on the home screen, retrieved from Firestore.
- Safety Prompts: Display a disclaimer on the first app launch and a short reminder before each session starts. Utilize a tool that generates a variation of the disclaimer so the user does not tune out.
- Favorite Sessions: Allow users to save favorite sessions, storing them in Firestore.

## Style Guidelines:

- Colors are a balanced distribution of soft pink (#F4B4C6), light blue (#ADD8E6), white (#FFFFFF), and pastel yellow (#FFFFE0).
- Background color: Light gray (#EEEEEE), offering a clean and calming backdrop.
- Accent color: Pale violet (#D8A2B5), complementing the primary color while providing visual interest.
- Body and headline font: 'PT Sans', a humanist sans-serif.
- Use custom icons that reflect the cute Vtuber style.
- Keep the layout clean and straightforward for easy navigation. Use clear visual cues to guide the user.
- Implement smooth transitions and subtle animations to enhance the user experience without being distracting.