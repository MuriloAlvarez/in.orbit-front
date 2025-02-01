interface ResponseCreateGoal {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function CreateGoals({ title, desiredWeeklyFrequency }: ResponseCreateGoal) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
}
