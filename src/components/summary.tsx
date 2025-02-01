import { CheckCircle2, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { InOrbitIconLogo } from './in-orbit-icon-logo';
import { DialogTrigger } from './ui/dialog';
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from './ui/separator';
import { useQuery } from '@tanstack/react-query';
import { getSummary } from '../http/get-summary';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { PendingGoals } from './pending-goals';

dayjs.locale(ptBR);

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM');

  const completedPercentage = Math.round((data.completed * 100) / data.total);

  console.log(completedPercentage);

  return (
    <div className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
      <div className="justify-between items-center flex">
        <div className="flex items-center gap-3">
          <InOrbitIconLogo />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="justify-between items-center flex text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">{data?.completed}</span> de <span className="text-zinc-100">{data?.total}</span> metas nessa semana
          </span>

          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>

        {Object.entries(data?.goalsPerDay ?? {}).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd');
          const formattedDate = dayjs(date).format('D[ de ] MMMM');

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span> <span className="text-xs text-zinc-400">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format('HH:mm');
                  return (
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="text-pink-500 size-4" />
                      <span className="text-sm text-zinc-400">
                        Você completou "<span className="text-zinc-100">{goal.title}</span>" às
                        <span className="text-zinc-100 text-sm"> {time}h</span>
                      </span>
                      <button className="text-zinc-500 text-sm font-light underline hover:text-zinc-300">Desfazer</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
