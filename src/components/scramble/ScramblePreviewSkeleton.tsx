import { Skeleton } from "../ui/skeleton";

export const ScramblePreviewSkeleton: React.FC = () => {
    const faceSkeleton = (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 p-0.5 rounded">
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="w-4 h-4 rounded-sm" />
            ))}
        </div>
    );

    return (
        <div className="flex items-center justify-center min-w-[384px] min-h-[256px]">
            <div className="grid grid-cols-4 min-w-max gap-1 justify-center items-center p-2 rounded-md">
                <div className="col-start-2 row-start-1">{faceSkeleton}</div>

                <div className="col-start-1 row-start-2">{faceSkeleton}</div>
                <div className="col-start-2 row-start-2">{faceSkeleton}</div>
                <div className="col-start-3 row-start-2">{faceSkeleton}</div>
                <div className="col-start-4 row-start-2">{faceSkeleton}</div>

                <div className="col-start-2 row-start-3">{faceSkeleton}</div>
            </div>
        </div>
    );
};
