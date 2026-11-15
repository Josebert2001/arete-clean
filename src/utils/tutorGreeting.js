import { getDepartment } from '../data/departments';

// The AI Tutor's opening line, worded for who is reading it. It used to tell
// every student it knew "the full B.Sc. Cybersecurity curriculum" — wrong for
// Data Science and foundation students, and meaningless to an independent
// learner, who has no curriculum at all. Display-only: the chat history sent to
// the API skips the greeting, so this changes nothing about the answers.
export function tutorGreeting(profile) {
  if (profile?.learning_mode === 'independent') {
    return "Hi! I'm your Areté tutor. Ask me about anything in the Security rooms or the Java, Python and C paths — a concept, a hint without the answer, or why your code won't run. What are you working on?";
  }
  const department = profile ? getDepartment(profile.department) : null;
  if (department?.status === 'full') {
    return `Hi! I'm your Areté tutor. I know the ${department.degree} courses on Areté, from 100L to 400L, and the four learning paths — Java, Python, C and Security. Ask me anything. What are you working on?`;
  }
  return "Hi! I'm your Areté tutor. I know the shared foundation courses on Areté and the four learning paths — Java, Python, C and Security. Ask me anything. What are you working on?";
}
