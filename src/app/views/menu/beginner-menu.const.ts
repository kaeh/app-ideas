import { BeginnerMenuRoutes, Level } from '@kaeh/shared/enums';
import { ExerciseMenu } from '@kaeh/shared/interfaces';

export const BeginnerMenu = new Map<BeginnerMenuRoutes, ExerciseMenu>()
  .set(BeginnerMenuRoutes.BinaryToDecimal, {
    title: 'Binary to Decimal',
    routerLink: [`${Level.Beginner}/${BeginnerMenuRoutes.BinaryToDecimal}`],
    markdownPath: `${Level.Beginner}/binary-to-decimal`,
  })
  .set(BeginnerMenuRoutes.BorderRadiusPreviewer, {
    title: 'Border radius Previewer',
    routerLink: [`${Level.Beginner}/${BeginnerMenuRoutes.BorderRadiusPreviewer}`],
    markdownPath: `${Level.Beginner}/border-radius-previewer`,
  });
