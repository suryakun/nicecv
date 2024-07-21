"use client"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { useCallback, useRef } from "react";
import { useToast } from "./ui/use-toast";

export const CVOptions = () => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    inputRef.current && inputRef.current.click();
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();


    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("/api/file", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        console.log(data.message)
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to upload file",
        })
      }
    }
  }

  return (
    <div className="absolute z-10 bottom-[-40px] flex justify-center w-full gap-4">
      <Card className="w-[350px] hover:mt-[-50px] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-center">Import from existing CV</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-center items-center cursor-pointer">
            <Image src={"/upload.svg"} alt="upload" width={100} height={130} onClick={handleFile} />
            <input type="file" className="hidden" accept="application/pdf" max={"1MB"} ref={inputRef} onChange={handleFileChange}/>
          </CardDescription>
        </CardContent>
        <CardFooter>
          Enhance from existing CV file (.pdf)
        </CardFooter>
      </Card>
      <Card className="w-[350px] hover:mt-[-50px] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="text-center">Build your own CV</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-center items-center cursor-pointer">
            <Image src={"/document.svg"} alt="upload" width={100} height={130} />
          </CardDescription>
        </CardContent>
        <CardFooter>
          Create a new CV from scratch
        </CardFooter>
      </Card>
    </div>
  )
}