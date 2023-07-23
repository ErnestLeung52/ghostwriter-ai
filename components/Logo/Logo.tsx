import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppLogo from '../../public/appLogo.png';
import React from 'react';
import Image from 'next/image';

type Props = {};

export const Logo = (props: Props) => {
	return (
		<div className='flex flex-row text-3xl text-center py-4 items-end font-heading justify-center'>
			<div className='tracking-wider font-bold'>GhostWriter AI</div>
			<Image src={AppLogo} alt='AppLogo' width={40} className='ml-2' />
		</div>
	);
};
