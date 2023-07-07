import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {};

export const Logo = (props: Props) => {
	return (
		<div className='text-3xl text-center py-4 font-heading'>
			GhostWriter
			<FontAwesomeIcon icon={faBrain} className='text-2xl text-slate-400' />
		</div>
	);
};
