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
  hasTasks: boolean,
  hasContent: boolean
): ReadinessBreakdown {
  const checklistScore = checklistTotal > 0 ? (checklistCompleted / checklistTotal) * 50 : 0;
  const launchDateScore = hasLaunchDate ? 15 : 0;
  const requiredLinksScore = (hasXLink && hasTelegramLink) ? 15 : 0;
  const tasksScore = hasTasks ? 10 : 0;
  const contentScore = hasContent ? 10 : 0;

  const totalScore = Math.round(
    checklistScore + launchDateScore + requiredLinksScore + tasksScore + contentScore
  );

  return {
    checklistScore: Math.round(checklistScore),
    launchDateScore,
    requiredLinksScore,
    tasksScore,
    contentScore,
    totalScore,
  };
}
