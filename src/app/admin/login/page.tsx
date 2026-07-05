"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [senha, setSenha] = useState("");
  const router = useRouter();

  useEffect(() => {
    const autenticado =
      sessionStorage.getItem(
        "gael-admin-auth"
      );

    if (autenticado) {
      router.replace("/admin");
    }
  }, [router]);

  function acessar() {
    if (senha === "Gael2026!") {
      sessionStorage.setItem(
        "gael-admin-auth",
        "true"
      );

      router.replace("/admin");
      return;
    }

    alert("Senha inválida.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f8ff",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1>🔒 Área Administrativa</h1>

        <p>
          Digite a senha para acessar o painel.
        </p>

        <input
          type="password"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              acessar();
            }
          }}
          placeholder="Informe a senha"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={acessar}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Acessar
        </button>
      </div>
    </main>
  );
}