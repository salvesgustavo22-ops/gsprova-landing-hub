// src/components/legal/LegalLayout.tsx
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  lastUpdated?: string;
}>;

export default function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {lastUpdated && (
        <p className="text-sm text-gray-500 mb-8">Última atualização: {lastUpdated}</p>
      )}
      <div className="prose prose-slate max-w-none">{children}</div>
    </main>
  );
}
