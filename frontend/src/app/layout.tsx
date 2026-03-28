import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edson Lavanderia | Sua Lavanderia de Portugal para o Mundo',
  description: 'Serviço premium de lavanderia, limpeza a seco, tapetes, impermeabilização e tinturaria. B2B e B2C em Portugal.',
  keywords: 'lavanderia, limpeza a seco, tapetes, impermeabilização, tinturaria, Portugal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=IBM+Plex+Mono:wght@400;700&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
