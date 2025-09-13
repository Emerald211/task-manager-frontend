'use client';

import { useAuth } from '@/context/Authcontext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
	const { user, logout } = useAuth();
	const pathname = usePathname();
	const router = useRouter();

	const isActive = (href) =>
		pathname === href
			? 'px-3 py-1 rounded-lg bg-purple-600 text-white'
			: 'hover:text-purple-300';

	return (
		<nav className='bg-gradient-to-r from-black via-gray-900 to-black text-white py-4'>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-6'>
				<div className='flex items-center gap-2'>
					<span className='w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center'>
						✔
					</span>
					<span onClick={() => {
									router.push('/');
								
								}} className='text-xl cursor-pointer font-bold'>Clario</span>
				</div>

				<div className='flex items-center gap-6 bg-purple-700/30 px-6 py-2 rounded-2xl border border-purple-500/50'>
					{user ? (
						<div className='flex gap-4 items-center font-bold'>
							<Link href='/tasks' className={isActive('/tasks')}>
								Tasks
							</Link>
							<Link href='/tasks/new' className={isActive('/tasks/new')}>
								New Task
							</Link>
							<Link href='/profile' className={isActive('/profile')}>
								Profile
							</Link>
						</div>
					) : (
						<div className='flex gap-4 items-center font-bold'>
							<Link href='/' className={isActive('/')}>
								Home
							</Link>
							<Link href='/about' className={isActive('/about')}>
								About Us
							</Link>
							<Link href='/testimonials' className={isActive('/testimonials')}>
								Testimonials
							</Link>
							<Link href='/pricing' className={isActive('/pricing')}>
								Pricing
							</Link>
						</div>
					)}
				</div>

				<div className='flex font-bold gap-4 items-center'>
					{user ? (
						<div className='flex items-center gap-3'>
							<span className='text-sm'>{user.name}</span>
							<button
								onClick={() => {
									router.push('/');
									logout();
								}}
								className='px-4 py-2 rounded-lg border border-purple-400 hover:bg-purple-600 transition'>
								Logout
							</button>
						</div>
					) : (
						<>
							<Link href='/login' className={isActive('/login')}>
								Login
							</Link>
							<Link href='/signup' className={isActive('/signup')}>
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
