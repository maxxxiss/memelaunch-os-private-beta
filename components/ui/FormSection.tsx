import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
