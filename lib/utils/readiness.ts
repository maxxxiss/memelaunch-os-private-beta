export interface ReadinessBreakdown {
  checklistScore: number;
  launchDateScore: number;
  requiredLinksScore: number;
  tasksScore: number;
  contentScore: number;
  totalScore: number;
}

export function calculateReadinessScore(
  checklistCompleted: number,
  checklistTotal: number,
  hasLaunchDate: boolean,
  hasXLink: boolean,
  hasTelegramLink: boolean,
  tasksCompleted: number,
  tasksTotal: number,
  contentScheduledPublished: number,
  contentTotal: number
): ReadinessBreakdown {
  const checklistScore = checklistTotal > 0 ? (checklistCompleted / checklistTotal) * 50 : 0;
  const launchDateScore = hasLaunchDate ? 15 : 0;
  const requiredLinksScore = (hasXLink ? 7.5 : 0) + (hasTelegramLink ? 7.5 : 0);
  const tasksScore = tasksTotal > 0 ? (tasksCompleted / tasksTotal) * 10 : 0;
  const contentScore = contentTotal > 0 ? (contentScheduledPublished / contentTotal) * 10 : 0;

  const totalScore = Math.round(
    checklistScore + launchDateScore + requiredLinksScore + tasksScore + contentScore
  );

  return {
    checklistScore: Math.round(checklistScore),
    launchDateScore,
    requiredLinksScore: Math.round(requiredLinksScore),
    tasksScore: Math.round(tasksScore),
    contentScore: Math.round(contentScore),
    totalScore,
  };
}
