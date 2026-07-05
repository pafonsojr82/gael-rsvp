"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  const [convidados, setConvidados] = useState<any[]>([]);
  const [autorizado, setAutorizado] = useState(false);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    const autenticado =
      sessionStorage.getItem("gael-admin-auth");

    if (!autenticado) {
      router.replace("/admin/login");
      return;
    }

    setAutorizado(true);
    carregarDados();
  }, [router]);

  async function carregarDados() {
    const { data } = await supabase
      .from("convidados")
      .select("*")
      .order("id", { ascending: false });

    setConvidados(data || []);
  }

  function logout() {
    sessionStorage.removeItem(
      "gael-admin-auth"
    );

    router.replace("/admin/login");
  }

  const convidadosFiltrados = useMemo(() => {
    return convidados.filter((c) => {
      const atendeBusca = c.convidado
        ?.toLowerCase()
        .includes(busca.toLowerCase());

      const atendeFiltro =
        filtro === "todos"
          ? true
          : c.status === filtro;

      return atendeBusca && atendeFiltro;
    });
  }, [convidados, busca, filtro]);

  const totalRespostas = convidados.length;
  const totalFamilias = convidados.length;

  const confirmados = convidados.filter(
    (c) => c.status === "confirmado"
  ).length;

  const recusados = convidados.filter(
    (c) => c.status === "nao_compareceu"
  ).length;

  const indecisos = convidados.filter(
    (c) => c.status === "ainda_nao_sei"
  ).length;

  const taxaConfirmacao =
    totalRespostas > 0
      ? Math.round(
          (confirmados / totalRespostas) * 100
        )
      : 0;

  const total06 = convidados.reduce(
    (acc, c) => acc + (c.qtde_0_6 ?? 0),
    0
  );

  const total712 = convidados.reduce(
    (acc, c) => acc + (c.qtde_7_12 ?? 0),
    0
  );

  const total13 = convidados.reduce(
    (acc, c) => acc + (c.qtde_13_mais ?? 0),
    0
  );

  const totalGeral =
    total06 + total712 + total13;

  function traduzStatus(status: string) {
    switch (status) {
      case "confirmado":
        return "✅ Confirmado";

      case "nao_compareceu":
        return "❌ Não comparecerá";

      case "ainda_nao_sei":
        return "❓ Ainda não decidiu";

      case "pendente":
        return "⏳ Pendente";

      default:
        return status;
    }
  }

  function exportarExcel() {
    const dados = convidadosFiltrados.map((c) => ({
      ID: c.id,
      Convidado: c.convidado,
      WhatsApp: c.whatsapp,
      Status: traduzStatus(c.status),
      "Crianças 0-6": c.qtde_0_6 ?? 0,
      "Crianças 7-12": c.qtde_7_12 ?? 0,
      "13 anos ou mais": c.qtde_13_mais ?? 0,
      Observações: c.observacoes ?? "",
      "Data da Resposta": c.data_resposta
        ? new Date(
            c.data_resposta
          ).toLocaleDateString("pt-BR")
        : "",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(dados);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Convidados"
    );

    XLSX.writeFile(
      workbook,
      `convidados_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`
    );
  }

  if (!autorizado) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>Verificando acesso...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>📊 Painel Administrativo</h1>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Sair
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <Card titulo="✅ Confirmados" valor={confirmados} cor="#dcfce7" />
        <Card titulo="❌ Recusados" valor={recusados} cor="#fee2e2" />
        <Card titulo="❓ Indecisos" valor={indecisos} cor="#fef3c7" />
        <Card titulo="👨‍👩‍👧 Famílias" valor={totalFamilias} cor="#e0e7ff" />
        <Card titulo="📝 Respostas" valor={totalRespostas} cor="#ede9fe" />
        <Card titulo="📈 Confirmação" valor={`${taxaConfirmacao}%`} cor="#dbeafe" />
      </div>

      <h2 style={{ marginTop: "50px" }}>
        👥 Participantes por Faixa Etária
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Card titulo="Crianças 0 a 6" valor={total06} cor="#dbeafe" />
        <Card titulo="Crianças 7 a 12" valor={total712} cor="#dbeafe" />
        <Card titulo="13 anos ou mais" valor={total13} cor="#dbeafe" />
        <Card titulo="Total Geral" valor={totalGeral} cor="#bfdbfe" />
      </div>

      <h2 style={{ marginTop: "60px" }}>
        📋 Lista de Respostas
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Buscar convidado..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
          style={{
            padding: "12px",
            minWidth: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button onClick={() => setFiltro("todos")}>
          Todos
        </button>

        <button onClick={() => setFiltro("confirmado")}>
          ✅ Confirmados
        </button>

        <button onClick={() => setFiltro("nao_compareceu")}>
          ❌ Recusados
        </button>

        <button onClick={() => setFiltro("ainda_nao_sei")}>
          ❓ Indecisos
        </button>

        <button
          onClick={exportarExcel}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📥 Exportar Excel
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#e5e7eb" }}>
              <th style={th}>ID</th>
              <th style={th}>Convidado</th>
              <th style={th}>WhatsApp</th>
              <th style={th}>Status</th>
              <th style={th}>0-6</th>
              <th style={th}>7-12</th>
              <th style={th}>13+</th>
              <th style={th}>Data</th>
            </tr>
          </thead>

          <tbody>
            {convidadosFiltrados.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.id}</td>
                <td style={td}>{c.convidado}</td>
                <td style={td}>{c.whatsapp}</td>
                <td style={td}>{traduzStatus(c.status)}</td>
                <td style={td}>{c.qtde_0_6}</td>
                <td style={td}>{c.qtde_7_12}</td>
                <td style={td}>{c.qtde_13_mais}</td>
                <td style={td}>
                  {c.data_resposta
                    ? new Date(
                        c.data_resposta
                      ).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Card({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: string | number;
  cor: string;
}) {
  return (
    <div
      style={{
        background: cor,
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3>{titulo}</h3>

      <div
        style={{
          fontSize: "42px",
          fontWeight: "bold",
        }}
      >
        {valor}
      </div>
    </div>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #d1d5db",
};

const td = {
  padding: "10px",
  border: "1px solid #e5e7eb",
} as const;