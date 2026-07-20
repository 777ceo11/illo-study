export const metadata = {
  title: 'ILLO STUDY - Speed Networking',
  description: 'English Conversation Questions for Speed Networking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" as="style" crossOrigin="true" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
      </head>
      <body style={{ fontFamily: 'Pretendard, sans-serif', backgroundColor: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}