import {AiOutlineGithub} from 'react-icons/ai';
import { Divider } from '@chakra-ui/react';

const Credits = () => {
    return(
        <div >
            <h1 className="header">Credits</h1>
            <Divider/>
            <div className="credits">
                <ul>
                    <li>
                        This Super RNG Pets Application was developed by Dylan
                    </li>
                    <li>
                        Sloth Artwork/Icon from Super Auto Pets (Developed by Team Wood Games)
                    </li>
                </ul>
            </div>
            <h1 className='header'>Super RNG Pets' Code</h1>
            <Divider/>
            <div>
                <a href="https://github.com/vu-dylan/super-rng-pets" target="_blank">
                    <AiOutlineGithub className="github" size="5rem"/>
                </a>
                
            </div>
        </div>
    );
}

export default Credits