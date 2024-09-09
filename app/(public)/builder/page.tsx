import { CVOptions } from '@/components/cv-options';
import { BackgroundIcons } from '@/components/background-icons';

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-grow">
      <BackgroundIcons />
      <CVOptions />
    </div>
  );
}
