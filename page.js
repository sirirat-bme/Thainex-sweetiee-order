import Link from 'next/link';

export default function Home() {
  return (
    <main className="home">
      <h1>Thainexsweetie</h1>
      <p>ระบบสั่งอาหารร้านขนมหวาน</p>
      <nav>
        <Link href="/generate-qr">สร้าง QR โต๊ะ</Link>
        <Link href="/kitchen">หน้าครัว</Link>
      </nav>
    </main>
  );
}
