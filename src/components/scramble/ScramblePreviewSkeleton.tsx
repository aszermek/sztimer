import { Skeleton } from "../ui/skeleton";

export const ScramblePreviewSkeleton: React.FC = () => {
    const faceSkeleton = (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 p-0.5 rounded">
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="w-6 h-6 rounded-sm" />
            ))}
        </div>
    );

    return (
        <div
            className="
        grid 
        grid-cols-[repeat(4,auto)] 
        grid-rows-[auto_auto_auto_auto] 
        gap-1
        justify-center
        items-center
        p-2
        rounded-md
      "
            style={{ width: "max-content" }}
        >
            <div className="col-start-2 row-start-1">{faceSkeleton}</div>

            <div className="col-start-1 row-start-2">{faceSkeleton}</div>
            <div className="col-start-2 row-start-2">{faceSkeleton}</div>
            <div className="col-start-3 row-start-2">{faceSkeleton}</div>
            <div className="col-start-4 row-start-2">{faceSkeleton}</div>

            <div className="col-start-2 row-start-3">{faceSkeleton}</div>
        </div>
    );
};
