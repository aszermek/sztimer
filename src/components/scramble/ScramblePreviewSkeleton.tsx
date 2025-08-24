import { Skeleton } from "../ui/skeleton";

export const ScramblePreviewSkeleton: React.FC = () => {
    const faceSkeleton = (
        <div className="grid grid-cols-3 grid-rows-3 gap-px sm:gap-0.5 xl:gap-1 p-0.5">
            {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="aspect-square w-3 sm:w-3.5 xl:w-4 rounded-sm"
                />
            ))}
        </div>
    );

    return (
        <div className="flex items-center justify-center mx-auto h-32 sm:h-40 xl:h-48 aspect-video">
            <div className="grid grid-cols-4 min-w-max gap-1 justify-center items-center p-2">
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
