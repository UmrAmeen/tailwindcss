import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import NavBar from './navBar';
import SideBar from './sidebar';

export default async function DashbordLayout({
  children,
}:any) {
  const cookieStore = await cookies();
  const loggedIn = cookieStore.get('loggedIn');

  if (!loggedIn || loggedIn.value !== 'true') {
    return redirect('/');
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-700 text-white">
          <SideBar />
        </div>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
