export default function Loading() {
  return (
    <>
      <div className="fixed bg-gray-800 opacity-50 inset-0 z-[50] touch-none"></div>
      <div className="bg-white rounded-md w-[200px] -translate-x-1/2 fixed top-1/2 left-1/2 z-[100] overflow-hidden h-[4px]">
        <div className="w-full h-full rounded-md animate-slide bg-purple"></div>
      </div>
    </>
  );
}
