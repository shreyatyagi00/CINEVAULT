const DetailSkeleton = () => {
  return (
    <div className="animate-pulse">

      <div className="flex flex-col md:flex-row gap-12 items-start">

        {/* Poster Skeleton */}
        <div className="w-[220px] h-[400px] bg-white/10 rounded-2xl" />

        {/* Text Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-white/10 rounded w-3/4" />
          <div className="h-6 bg-white/10 rounded w-1/2" />
          <div className="h-6 bg-white/10 rounded w-2/3" />
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-24 bg-white/10 rounded w-full mt-6" />
          <div className="h-12 bg-white/10 rounded w-40 mt-6" />
        </div>

      </div>
    </div>
  );
};

export default DetailSkeleton;