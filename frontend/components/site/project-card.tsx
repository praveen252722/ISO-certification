"use client";

import { useState } from "react";
import { CalendarDays, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  date: string;
  index: number;
}

export function ProjectCard({ title, image, description, date, index }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Card className="animate-stagger-pop overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-900" />
        {image && !imageFailed ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : null}
        {!image || imageFailed ? (
          <div className="relative flex h-full flex-col items-center justify-center text-center text-amber-100">
            <ImageIcon className="mb-3 h-10 w-10" />
            <p className="max-w-48 text-sm font-bold uppercase tracking-normal">Add project photo</p>
          </div>
        ) : null}
      </div>
      <CardHeader className="pb-3">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" /> {date}
          </span>
          <Badge variant="success">Certified</Badge>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <Button asChild className="mt-5 w-full">
          <a href="/contact">Send inquiry</a>
        </Button>
      </CardContent>
    </Card>
  );
}
