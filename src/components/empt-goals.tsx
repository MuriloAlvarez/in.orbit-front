import logoInOrbit from '../assets/logo-in-orbit.svg';
import letsStartIllustration from '../assets/lets-start-illustration.svg';
import { DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col gap-8 justify-center items-center">
      <img src={logoInOrbit} alt="In.Orbit" />
      <img src={letsStartIllustration} alt="In.Orbit" />
      <p className="max-w-80 text-center text-zinc-300 leading-relaxed">Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?</p>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar Meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
