import './homepage.styles.scss';

import Directory from '../../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';
import React from 'react';

const HomePage = () => (
	<HomePageContainer>
		<Directory />
	</HomePageContainer>
);

export default HomePage;
