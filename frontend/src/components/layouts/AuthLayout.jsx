import logo from "../../assets/mestria-logo.png";

/**
 * AuthLayout — layout de duas colunas para páginas de autenticação.
 */
function AuthLayout({
  children,
  imageSrc,
  imageAlt = "Visual decorativo",
  panelCard,
  panelBg = "bg-surface-container-low",
}) {
  return (
    <div className="h-screen flex font-sans text-body-md text-on-surface antialiased bg-background overflow-hidden">
      {/* ── Coluna esquerda: conteúdo / formulário ─────────────────────── */}
      <main className="w-full lg:w-[42%] flex flex-col bg-surface z-10 shadow-[4px_0_40px_rgba(38,24,18,0.03)] overflow-y-auto">
        <div className="w-full max-w-[380px] mx-auto my-auto py-8 px-6 sm:px-0">
          {/* Logo alinhada à esquerda */}
          <div className="mb-8">
            <img 
              src={logo} 
              alt="Logo Mestria" 
              className="h-10 w-auto block"
            />
          </div>
          {children}
        </div>
      </main>

      {/* ── Coluna direita: painel visual (apenas desktop) ─────────────── */}
      <aside
        className={[
          "hidden lg:flex lg:w-[58%] relative p-6 xl:p-6 items-stretch justify-center",
          panelBg,
        ].join(" ")}
      >
        <div className="w-full h-full relative rounded-2xl overflow-hidden bg-surface shadow-sm border border-outline-variant/20 flex flex-col">
          {/* Imagem de fundo */}
          {imageSrc && (
            <div className="flex-1 flex items-end justify-center px-8 pt-8 min-h-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-full max-h-full object-contain"
            />
            </div>
          )}

          {/* Card flutuante */}
          {panelCard && (
            <div className="absolute bottom-12 left-8 z-10">
               <div className="max-w-[440px]">
                {panelCard}
               </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export { AuthLayout };
export default AuthLayout;
