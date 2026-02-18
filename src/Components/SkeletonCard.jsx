const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[340px] 
                      bg-gray-800 rounded-xl 
                      shadow-md" />

      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCard;