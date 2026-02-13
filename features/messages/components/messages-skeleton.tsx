import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function MessagesSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 w-full">
      <div className="flex flex-wrap gap-4 justify-around">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="flex flex-col justify-between w-[270px] h-[380px] gap-3 border border-slate-200 shadow-lg bg-white overflow-hidden"
          >
            {/* Header Skeleton */}
            <CardHeader className="py-0 px-3 mt-4 space-y-4">
              {/* Subject Badge */}
              <Skeleton className="h-5 w-24 rounded-full bg-slate-200" />

              {/* Metadata Section */}
              <div className="space-y-3 mt-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Skeleton className="w-3 h-3 rounded-full shrink-0 bg-slate-200" />
                    <Skeleton className="h-3 w-4/5 rounded-md bg-slate-200" />
                  </div>
                ))}
              </div>
            </CardHeader>

            {/* Content Skeleton */}
            <CardContent className="px-2 mt-2 space-y-3">
              {/* Message Title */}
              <div className="flex justify-center mb-1">
                <Skeleton className="h-3 w-16 bg-slate-200" />
              </div>

              {/* Message Block */}
              <div className="space-y-2 px-1">
                <Skeleton className="h-3 w-full bg-slate-200" />
                <Skeleton className="h-3 w-full bg-slate-200" />
                <Skeleton className="h-3 w-3/4 bg-slate-200" />
              </div>

              {/* Show More Button */}
              <div className="flex justify-center mt-2">
                <Skeleton className="h-3 w-20 bg-slate-200" />
              </div>
            </CardContent>

            {/* Footer Skeleton */}
            <CardFooter className="flex justify-around w-full px-0 pb-3 mt-auto">
              <Skeleton className="h-8 w-24 rounded-md bg-slate-200" />
              <Skeleton className="h-8 w-24 rounded-md bg-slate-200" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
