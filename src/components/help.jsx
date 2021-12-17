import { ChakraProvider, Divider } from "@chakra-ui/react"
import { BsChevronDoubleRight } from "react-icons/bs";
import labeled from '../images/labeled.png';

const Help = () => {
    console.log(labeled)
    return(
        <div>
            <ChakraProvider>
                <h1 className="first-header">RNG Rules</h1>
                <Divider/>
                <div className="rules">
                    <ul>
                        <li>
                            You choose positioning
                        </li>
                        <li>
                            If you roll a shop purchase and your bench is full, roll RNG again
                            <ul>
                                <li>
                                    If you can combine the shop pet with a benched pet, you must combine
                                </li>
                                <li>
                                    If you're playing two duplicate pets, you don't have to combine them to make room
                                </li>
                                <li>
                                    If you're playing two duplicate pets, you can combine then buy.
                                </li>
                            </ul>
                        </li>
                        <li>
                            You choose who to sell, but not when
                        </li>
                        <li>
                            Keep rolling until you use all your gold
                        </li>
                        <li>
                            Don't wait for time to avoid implementing a bad RNG roll
                        </li>
                        <li>(Freeze Mode) After rolling a freeze/unfreeze, roll until you get a pet/food slot</li>
                    </ul>
                </div>

                <h1 className="header">Shop Slots</h1>
                <Divider/>
                <img className="help-shop" src={labeled} alt="Labeled Shop"/>
            </ChakraProvider>
        </div>
    )
}

export default Help