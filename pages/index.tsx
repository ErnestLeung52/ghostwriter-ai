import Image from 'next/image';
import HeroImage from '../public/hero-background.jpg';
import { Logo } from '../components/Logo';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import Link from 'next/link';

type Props = {};

const Home = (props: Props) => {
	const [text, count] = useTypewriter({
		words: ['Writing Companion', 'Content Creator', 'Cover Letter Builder'],
		loop: true,
		delaySpeed: 2000,
	});

	return (
		<div>
			<div className='w-screen h-screen overflow-hidden flex justify-center items-center relative'>
				<Image src={HeroImage} alt='Hero' fill className='absolute opacity-80' />
				<div className='relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm opacity-90'>
					<Logo />
					<div className='text-xl text-[#c9affd]'>
						Your smart <span className='bold'>{text}.</span>
						<Cursor cursorColor='#c9affd' />
					</div>
					<p className='font-light text-sm py-4'>
						Experience effortless content creation as GhostWriter AI leverages Open AI technology to
						transform your ideas into engaging, high-quality written content.
					</p>

					<Link href='/post/new' className='btn '>
						Begin
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
