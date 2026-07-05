import Image from "next/image";

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
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Image
          src="/confirmacao_sonic.jpeg"
          alt="Aniversário do Gael"
          width={900}
          height={1400}
          priority
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25)",
          }}
        />

        <div
          style={{
            marginTop: "18px",
            background: "white",
            borderRadius: "20px",
            padding: "18px",
            textAlign: "center",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >

            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#0f62fe",
                marginBottom: "20px",
              }}
        >
              ⏳ Faltam {dias} dias para a festa!
            </div>


          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "nowrap",
              marginTop: "30px",
            }}
          >
            <a
              href="/rsvp"
              style={{
                background: "#0f62fe",
                color: "white",
                textDecoration: "none",
                padding: "15px 25px",
                borderRadius: "12px",
                fontWeight: "bold",
              }}
            >
              ✍️ Confirmar Presença
            </a>
            <a
              href="https://maps.google.com/?q=Rua+do+Acre+229+Mooca+Sao+Paulo+SP"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#16a34a",
                color: "white",
                textDecoration: "none",
                padding: "15px 25px",
                borderRadius: "12px",
                fontWeight: "bold",
              }}
            >
              📍 Ver no Google Maps
            </a>


          </div>

          <div
            style={{
              marginTop: "25px",
              color: "#059669",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ✅ Confirme sua presença até 12/08/2026
          </div>
        </div>
      </div>
    </main>
  );
}