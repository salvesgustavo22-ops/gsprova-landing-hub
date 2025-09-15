// src/components/legal/DataRequestForm.tsx
import React, { useState } from "react";
import { CONTACT_EMAIL, WHATSAPP_LINK } from "../../lib/legal";

export default function DataRequestForm() {
  const [name, setName] = useState("");
  const [emailOrWhats, setEmailOrWhats] = useState("");
  const [requestType, setRequestType] = useState("acesso");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(`LGPD - Solicitação de ${requestType} de dados`);
  const body = encodeURIComponent(
    `Nome: ${name}\nContato: ${emailOrWhats}\nTipo de solicitação: ${requestType}\n\nDescrição:\n${message}\n`
  );

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Seu e-mail ou WhatsApp"
          value={emailOrWhats}
          onChange={(e) => setEmailOrWhats(e.target.value)}
        />
      </div>

      <select
        className="rounded-xl border px-3 py-2"
        value={requestType}
        onChange={(e) => setRequestType(e.target.value)}
      >
        <option value="acesso">Acesso aos dados</option>
        <option value="correcao">Correção</option>
        <option value="eliminacao">Eliminação</option>
        <option value="portabilidade">Portabilidade</option>
        <option value="informacoes">Informações sobre compartilhamentos</option>
        <option value="revogacao-consentimento">Revogação de consentimento</option>
      </select>

      <textarea
        className="w-full rounded-xl border px-3 py-2"
        rows={4}
        placeholder="Descreva sua solicitação (quanto mais específico, melhor)."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        <a
          className="rounded-xl border px-3 py-2 text-sm underline"
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
        >
          Enviar por e-mail (DPO)
        </a>
        <a className="rounded-xl border px-3 py-2 text-sm underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          Abrir no WhatsApp
        </a>
      </div>

      <p className="text-xs text-gray-500">
        Prazo-alvo de resposta: até 48h úteis. Você também pode usar diretamente o e-mail do DPO: {CONTACT_EMAIL}.
      </p>
    </div>
  );
}
