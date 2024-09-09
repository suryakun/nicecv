import {
  Briefcase,
  CheckCircle,
  FileText,
  GraduationCap,
  Star,
  Upload,
} from 'lucide-react';

const AnimatedIcon = (props: {
  icon: React.ElementType;
  size: number;
  className: string;
}) => (
  <div className={`absolute ${props.className}`}>
    <props.icon size={props.size} className="animate-float" />
  </div>
);

export const BackgroundIcons = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <AnimatedIcon
      icon={FileText}
      size={120}
      className="top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
    />
    <AnimatedIcon
      icon={Briefcase}
      size={80}
      className="top-1/4 right-0 transform translate-x-1/2"
    />
    <AnimatedIcon
      icon={GraduationCap}
      size={100}
      className="bottom-0 left-1/4 transform -translate-y-1/2"
    />
    <AnimatedIcon
      icon={Upload}
      size={90}
      className="top-3/4 right-1/4 transform translate-y-1/2"
    />
    <AnimatedIcon
      icon={CheckCircle}
      size={70}
      className="bottom-1/4 left-0 transform -translate-x-1/2"
    />
    <AnimatedIcon
      icon={Star}
      size={60}
      className="top-1/2 right-0 transform translate-x-1/2"
    />
  </div>
);
