import { ChakraProvider, Divider } from "@chakra-ui/react"
import { BsChevronDoubleRight } from "react-icons/bs";
import labeled from '../images/labeled.png';

const Help = () => {
    console.log(labeled)
    return(
        <div>
            <ChakraProvider>
                <h1 className="header">Shop Slots</h1>
                <Divider/>
                <img className="help-shop" src={labeled} alt="Labeled Shop"/>
                <h1 className="first-header">RNG Rules</h1>
                <Divider/>
                <div className="rules">
                    <ul>
                        <li>
                            You choose positioning
                        </li>
                        <li>
                            Recommended: Sell a pet only if your bench is full
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
                <h1 className="header">FAQs/Scenarios</h1>
                <Divider/>
                <div className="rules">
                    <ul>
                        <li>
                            The app is always on top! I can't minimize it!
                            <ul>
                                <li>
                                    <b>Answer: </b> I did this on purpose to keep the RNG on the screen during gameplay
                                </li>
                            </ul>
                        </li>
                        <li>
                            Reroll invalid moves. Examples:
                            <ul>
                                <li>
                                    Buying food without any pets
                                </li>
                                <li>
                                    Buying a pet with a full bench (see below)
                                </li>
                                <li>
                                    Selling without a full bench (see below)
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                    Selling without a full bench can really grief you, so it's advised to sell only with a full bench. Roll again if it's not full.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </ChakraProvider>
        </div>
    )
}

export default Help