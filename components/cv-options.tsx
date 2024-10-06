import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { UploadButton } from './upload-button';
import Link from 'next/link';

export const CVOptions = () => {
  return (
    <div className="flex gap-8 z-10">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Import from existing CV</CardTitle>
        </CardHeader>
        <CardContent className="h-[124px]">
          <div className="flex justify-center items-center cursor-pointer">
            <UploadButton />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          Use my existing CV file (.pdf Max 1MB)
        </CardFooter>
      </Card>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Build your own CV</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-center items-center cursor-pointer">
            <Link href={`/builder/select`}>
              <Image
                src={'/document.svg'}
                alt="upload"
                width={100}
                height={130}
              />
            </Link>
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-center">
          Create a new CV from scratch
        </CardFooter>
      </Card>
    </div>
  );
};
