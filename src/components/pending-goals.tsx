import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { getPendingGoals } from '../http/get-pending-goals';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateGoalCompletion } from '../http/create-goal-completion';

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await CreateGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data?.map((goals) => {
        return (
          <OutlineButton key={goals.id} disabled={goals.completionCount >= goals.desiredWeeklyFrequency} onClick={() => handleCompleteGoal(goals.id)}>
            <Plus className="size-4 text-zinc-600" />
            {goals.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
