import logo from "../../assets/mestria-logo.png";

/**
 * AuthLayout — layout de duas colunas para páginas de autenticação.
 *
 * Coluna esquerda: formulário (slot `children`)
 * Coluna direita:  painel visual configurável via props
 *
 * @param {string}          imageSrc          — URL ou import da imagem de fundo do painel direito
 * @param {string}          imageAlt          — texto alternativo da imagem
 * @param {React.ReactNode} panelCard         — conteúdo do card flutuante (glassmorphism)
 * @param {string}          panelBg           — classe Tailwind para o bg do painel (default: "bg-surface-container-low")
 */
function AuthLayout({
  children,
  imageSrc,
  imageAlt = "Visual decorativo",
  panelCard,
  panelBg = "bg-surface-container-low",
}) {
  return (
    <div className="min-h-screen flex font-sans text-body-md text-on-surface antialiased bg-background">
      {/* ── Coluna esquerda: conteúdo / formulário ─────────────────────── */}
      <main className="w-full lg:w-[42%] flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 bg-surface z-10 shadow-[4px_0_40px_rgba(38,24,18,0.03)] overflow-y-auto">
        <div className="w-full max-w-[380px] mx-auto py-8">
          {/* Logo alinhada à esquerda */}
          <div className="mb-8">
            <img 
              src={logo} 
              alt="Logo Mestria" 
              className="h-14 w-auto block"
            />
          </div>
          {children}
        </div>
      </main>

      {/* ── Coluna direita: painel visual (apenas desktop) ─────────────── */}
      <aside
        className={[
          "hidden lg:flex lg:w-[58%] relative p-5 xl:p-6 items-stretch justify-center",
          panelBg,
        ].join(" ")}
      >
        <div className="w-full h-full relative rounded-2xl overflow-hidden bg-surface shadow-sm border border-outline-variant/20">
          {/* Imagem de fundo */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover object-center opacity-90 mix-blend-multiply"
            />
          )}

          {/* Card flutuante */}
          {panelCard && (
            <div className="absolute bottom-12 left-10 right-10 xl:right-auto xl:w-[440px]">
              {panelCard}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export { AuthLayout };
export default AuthLayout;
