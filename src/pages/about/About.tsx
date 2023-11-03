import {FC} from 'react';
import './about.scss';
import {useTitle} from "../../hooks";

const About: FC = () => {
    useTitle('About')
    return (
        <div className={'aboutWrapper'}>
            <div className={'about'}>
                <h1>About</h1>
                <div className={'aboutInfo'}>
                    <p>This is a blog about cyber security</p>
                </div>
            </div>
        </div>
    );
};

export default About;