import { GmxWrapper } from "./core"

const main = async () => {
    //core helpers class

    console.log("***********BOT STARTED***********")
    await GmxWrapper.streamEvents()

}

main()