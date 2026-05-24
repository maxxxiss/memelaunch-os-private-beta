import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  ambient?: boolean;
}

export function PageShell({ children, ambient = true }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#05070d] relative overflow-x-hidden">
      {ambient && (
        <>
          <div className="fixed top-0 left-64 right-0 h-[500px] pointer-events-none z-0 bg-[radial-gradient(ellipse_90%_50%_at_60%_-10%,rgba(59,130,246,0.10),transparent)]" />
          <div className="fixed bottom-0 right-0 w-[400px] h-[400px] pointer-events-none z-0 bg-violet-500/5 blur-3xl rounded-full" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
