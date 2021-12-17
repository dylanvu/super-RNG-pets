import { ChakraProvider, Divider } from "@chakra-ui/react"

const Help = () => {

    return(
        <div>
            <ChakraProvider>
                <h1 className="header">RNG Rules</h1>
                <Divider/>
                <div className="rules">
                    <ul>
                        <li>
                            You can choose positioning and when to combine
                        </li>
                        <li>
                            If you roll a shop purchase and your bench is full, roll RNG again
                            <ul>
                                <li>
                                    If you can combine the shop pet with a pet, you must combine. 
                                </li>
                            </ul>
                        </li>
                        <li>
                            You choose who to sell if you roll 'sell'
                        </li>
                        <li>
                            If you have a pill in shop and have 1 gold, you must roll until you reroll or buy the pill
                        </li>
                        <li>
                            Do your best to use up all your gold and implement as many decisions
                            <ul>
                                <li>
                                    Don't wait for time to run out to avoid carrying out RNG
                                </li>
                            </ul>
                        </li>
                        
                    </ul>
                </div>

                <h1 className="header">Shop Slots</h1>
                <Divider/>
                <p>Leftmost pet slot is slot 1.</p>
            </ChakraProvider>
        </div>
    )
}

export default Help