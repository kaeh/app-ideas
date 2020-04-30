import { Level } from '@kaeh/shared/enums';

export const MainMenuCards = [
  {
    title: 'Beginner',
    content:
      'Developers in the early stages of their learning journey. Those who are typically focused on creating user-facing applications.',
    routerLink: ['.', Level.Beginner],
  },
  {
    title: 'Intermediate',
    content:
      'Developers at an intermediate stage of learning and experience. They are comfortable in UI/UX, using development tools, and building apps that use API services.',
    routerLink: ['.', Level.Intermediate],
  },
  {
    title: 'Advanced',
    content:
      'Developers who have all of the above, and are learning more advanced techniques like implementing backend applications and database services.',
    routerLink: ['.', Level.Advanced],
  },
];
