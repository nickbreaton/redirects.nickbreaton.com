import { isDev } from "solid-js/web";

export const WorkInProgress = () => {
  if (import.meta.env.DEV) {
    return null;
  }

  return (
    <div class="fixed left-0 right-0 top-[30vh] grid justify-center pointer-events-none">
      <span class="border-4 font-black rounded px-1 py-0.5 text-xl opacity-10 rotate-[-12deg] scale-[600%]">
        WIP
      </span>
    </div>
  );
};
