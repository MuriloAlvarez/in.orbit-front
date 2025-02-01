type ResponsePendingGoals = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(): Promise<ResponsePendingGoals> {
  const response = await fetch('http://localhost:3333/goals-pending');
  const data = await response.json();

  return data.pendingGoals;
}
