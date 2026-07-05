export default function Home() {
  const dataFesta = new Date("2026-08-22T13:00:00");

  const agora = new Date();

  const diferenca = dataFesta.getTime() - agora.getTime();

  const dias = Math.max(
    0,
    Math.floor(diferenca / (1000 * 60 * 60 * 24))
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #0f62fe, #87cefa)",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0f62fe",
          }}
        >
          🦔⚡ Aniversário do Gael ⚡🦔
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#f59e0b",
          }}
        >
          Tema Sonic
        </h2>

        <hr />

        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          O aniversário do Gael está chegando e queremos
          muito comemorar esse dia especial com você!
        </p>

        <div
          style={{
            background: "#fff7d6",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2>⏳ Contagem Regressiva</h2>

          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {dias} dias
          </p>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3>📅 Data</h3>

          <p>22/08/2026 às 13h</p>

          <h3>📍 Local</h3>

          <p>
            Rua do Acre, 229
            <br />
            Mooca - São Paulo/SP
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://maps.google.com/?q=Rua+do+Acre+229+Mooca+Sao+Paulo+SP"
            target="_blank"
            style={{
              background: "#16a34a",
              color: "white",
              padding: "15px 20px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            📍 Ver no Google Maps
          </a>

          <button
            style={{
              background: "#2563eb",
              color: "white",
              padding: "15px 20px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✅ Confirmar Presença
          </button>
        </div>

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#666",
          }}
        >
          Em breve o formulário de confirmação estará
          disponível.
        </div>
      </div>
    </main>
  );
}