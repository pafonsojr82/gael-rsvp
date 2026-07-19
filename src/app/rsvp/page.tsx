"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [convidado, setConvidado] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState("");

  const [querLembrete, setQuerLembrete] = useState("Não");
  const [diasLembrete, setDiasLembrete] = useState("");

  const [qtde06, setQtde06] = useState(0);
  const [qtde712, setQtde712] = useState(0);
  const [qtde13, setQtde13] = useState(0);

  const [observacoes, setObservacoes] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function salvarResposta() {
    if (!convidado.trim()) {
      setMensagem("❌ Informe o nome do convidado.");
      return;
    }

    if (!whatsapp.trim()) {
      setMensagem("❌ Informe o WhatsApp.");
      return;
    }

    if (!status) {
      setMensagem("❌ Selecione uma resposta.");
      return;
    }

    try {
      setSalvando(true);
      setMensagem("");

      const { error } = await supabase
        .from("convidados")
        .insert({
          convidado,
          whatsapp,
          status,

          qtde_0_6: qtde06,
          qtde_7_12: qtde712,
          qtde_13_mais: qtde13,

          quer_lembrete:
            status === "ainda_nao_sei" &&
            querLembrete === "Sim",

          dias_lembrete:
            status === "ainda_nao_sei" &&
            querLembrete === "Sim"
              ? Number(diasLembrete)
              : null,

          observacoes,

          data_resposta:
            new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      setSucesso(true);
    } catch (erro) {
      console.error(erro);

      setMensagem(
        "❌ Ocorreu um erro ao registrar sua resposta."
      );
    } finally {
      setSalvando(false);
    }
  }

  if (sucesso) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f4f8ff",
          padding: "40px",
          fontFamily: "Arial",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            width: "100%",
            background: "white",
            padding: "50px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h1>🎉 Obrigado!</h1>

          <h2>✅ Sua resposta foi registrada.</h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Recebemos sua confirmação para o
            aniversário do Gael.
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Estamos muito felizes por participar
            deste momento especial com você.
          </p>

          <div
            style={{
              fontSize: "50px",
              marginTop: "30px",
            }}
          >
            🦔⚡🎂
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f8ff",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1>✅ Confirmação de Presença</h1>

        <p
          style={{
            background: "#eff6ff",
            padding: "15px",
            borderRadius: "10px",
            lineHeight: "1.6",
          }}
        >
          Para nos ajudar na organização da festa,
          pedimos que preencha as informações abaixo.
          Sua resposta leva menos de 1 minuto.
        </p>

        <hr />

        <h3>Convidado</h3>

        <input
          value={convidado}
          onChange={(e) =>
            setConvidado(e.target.value)
          }
          placeholder="Nome do convidado"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <h3>WhatsApp</h3>

        <input
          value={whatsapp}
          onChange={(e) =>
            setWhatsapp(e.target.value)
          }
          placeholder="(11) 99999-9999"
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <h3>Como deseja responder ao convite?</h3>

        {[
          {
            valor: "confirmado",
            texto: "✅ Confirmo presença",
            cor: "#22c55e",
            fundo: "#f0fdf4",
          },
          {
            valor: "nao_compareceu",
            texto: "❌ Não poderei comparecer",
            cor: "#ef4444",
            fundo: "#fef2f2",
          },
          {
            valor: "ainda_nao_sei",
            texto: "❓ Ainda não sei",
            cor: "#f59e0b",
            fundo: "#fffbeb",
          },
        ].map((opcao) => (
          <div
            key={opcao.valor}
            style={{
              border: `2px solid ${opcao.cor}`,
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "10px",
              background: opcao.fundo,
            }}
          >
            <label
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <input
                type="radio"
                name="status"
                value={opcao.valor}
                checked={status === opcao.valor}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              />
              {" "}
              {opcao.texto}
            </label>
          </div>
        ))}

        {status === "ainda_nao_sei" && (
          <>
            <h3>
              Deseja que enviemos um lembrete
              para responder mais tarde?
            </h3>

            <select
              value={querLembrete}
              onChange={(e) =>
                setQuerLembrete(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <option>Não</option>
              <option>Sim</option>
            </select>

            {querLembrete === "Sim" && (
              <>
                <h3>Lembrar em quantos dias?</h3>

                <input
                  type="number"
                  min="1"
                  max="30"
                  value={diasLembrete}
                  onChange={(e) =>
                    setDiasLembrete(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />

                <div
                  style={{
                    marginTop: "12px",
                    marginBottom: "20px",
                    padding: "12px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  ℹ️ As confirmações serão
                  aceitas até
                  <strong> 12/08/2026</strong>.
                </div>
              </>
            )}
          </>
        )}

        <h3 style={{ marginTop: "30px" }}>
          👥 Para nos ajudar na organização da
          festa, informe a <strong>quantidade</strong> de
          participantes por faixa etária:

        </h3>

        <h3 style={{ marginTop: "20px" }}></h3>
          Crianças de 0 a 6 anos
        </h3>

        <select
          value={qtde06}
          onChange={(e) =>
            setQtde06(Number(e.target.value))
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {[0,1,2,3,4,5,6,7,8,9].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <h3>Crianças de 7 a 12 anos</h3>

        <select
          value={qtde712}
          onChange={(e) =>
            setQtde712(Number(e.target.value))
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {[0,1,2,3,4,5,6,7,8,9].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <h3>Pessoas com 13 anos ou mais</h3>

        <select
          value={qtde13}
          onChange={(e) =>
            setQtde13(Number(e.target.value))
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {[0,1,2,3,4,5,6,7,8,9].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            background: "#f9fafb",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          ℹ️ Considere todas as pessoas que
          comparecerão à festa, incluindo você.
        </div>

        <h3 style={{ marginTop: "25px" }}>
          Observações
        </h3>

        <textarea
          rows={5}
          value={observacoes}
          onChange={(e) =>
            setObservacoes(
              e.target.value
            )
          }
          placeholder="Restrições alimentares, alergias ou outras informações importantes."
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
          }}
        />

        {mensagem && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              background: "#f8fafc",
            }}
          >
            {mensagem}
          </div>
        )}

        <br />
        <br />

        <button
          onClick={salvarResposta}
          disabled={salvando}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "15px 20px",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          {salvando
            ? "Salvando..."
            : "Confirmar Resposta"}
        </button>
      </div>
    </main>
  );
}