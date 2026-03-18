'use client';

export default function SleepScreen() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black cursor-none z-[9999] fixed inset-0">
      <svg 
        viewBox="0 0 1024 1024" 
        className="w-24 h-24 text-white/20 animate-pulse" 
        fill="currentColor"
      >
        <path d="M722 559c0-117 96-173 100-176-55-80-139-91-169-92-72-8-142 43-178 43-37 0-93-42-152-41-78 1-150 45-190 115-82 141-21 350 58 464 39 56 85 119 146 117 58-2 81-37 151-37s90 37 152 36c63-1 103-57 142-113 44-65 63-128 64-131-1-1-124-48-124-191zM609 238c31-38 52-91 46-144-46 2-101 31-135 70-30 35-56 89-49 141 51 4 102-28 138-67z" />
      </svg>
    </div>
  );
}
