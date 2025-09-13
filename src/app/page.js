'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
	const router = useRouter();
	return (
		<section className='relative text-center py-32 bg-gradient-to-r from-black via-gray-900 to-black text-white w-full h-full'>
			<div className='inline-block font-bold px-4 py-3 mb-6 text-sm  bg-gray-700/50 rounded-full border border-purple-400'>
				Meet Clario 1.0
			</div>

			<h1 className='text-5xl md:text-6xl font-bold leading-tight'>
				Workspace That Remembers <br /> All Your Work
			</h1>

			<p className='mt-6   text-lg text-gray-300'>
				All your tasks, messages, and docs in one place. Instantly searchable,
				perfectly synced, and always up to date.
			</p>

			<div className='mt-10 flex justify-center gap-4'>
				<button
					onClick={() => {
						router.push('/signup');
					}}
					className='px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-lg'>
					Get Started
				</button>
				<button
					onClick={() => {
						router.push('/signup');
					}}
					className='px-6 py-3 rounded-lg bg-transparent border border-purple-400 hover:bg-purple-500 hover:text-white text-purple-200 font-medium'>
					Book a Demo
				</button>
			</div>
		</section>
	);
}
