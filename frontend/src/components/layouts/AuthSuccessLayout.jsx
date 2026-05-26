// src/components/layouts/AuthSuccessLayout.jsx
import React from 'react';

/**
 * AuthSuccessLayout — Layout centralizado para telas de sucesso/feedback.
 * 
 * @param {string} icon      - Nome do ícone Material Symbols
 * @param {string} title     - Título principal da página
 * @param {string} message   - Mensagem de descrição
 * @param {ReactNode} children - Botões ou links de ação adicionais
 * @param {boolean} isError  - Se deve usar cores de erro (vermelho)
 */
export default function AuthSuccessLayout({ 
  icon, 
  title, 
  message, 
  children, 
  isError = false 
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low text-on-surface overflow-hidden">
      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-margin-desktop py-10 relative">
        <section
          className="
            relative z-10
            w-full max-w-[480px]
            bg-surface-container-lowest
            border border-outline-variant/30
            rounded-xl
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            overflow-hidden
          "
        >
          <div className="px-8 py-10 md:px-10 flex flex-col items-center text-center">
            
            <div className="relative mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 border ${
                isError 
                  ? 'bg-error-container border-error/20' 
                  : 'bg-surface-container border-outline-variant/20 shadow-sm'
              }`}>
                <span 
                  className={`material-symbols-outlined ${isError ? 'text-error' : 'text-primary-container'}`} 
                  style={{ fontSize: 32, fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
              </div>
              {!isError && <div className="absolute inset-0 bg-primary-container/20 blur-xl rounded-full" />}
            </div>

            <h1 className="text-headline-lg md:text-headline-lg text-on-surface tracking-tight mb-4">
              {title}
            </h1>
            
            <p className="text-body-md text-on-surface-variant max-w-[360px] mb-8 leading-relaxed">
              {message}
            </p>

            <div className="w-full flex flex-col gap-4">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
