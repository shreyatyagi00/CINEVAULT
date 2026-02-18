const RecommendationSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full h-[260px] bg-white/10 rounded-xl" />
          <div className="h-4 bg-white/10 rounded mt-3 w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default RecommendationSkeleton;