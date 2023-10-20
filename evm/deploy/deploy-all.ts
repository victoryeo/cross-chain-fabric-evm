import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    let args: any[] = []
    const { deploy } = deployments
    const { deployer, recipient } = await getNamedAccounts()
    console.log("deploy from account", deployer)
    console.log("htlc recipient", recipient)

    args[0] = "Bond_NAME"
    args[1] = "Bond_SYMBOL"
    const ttoken = await deploy("BondToken", {
        from: deployer,
        args: args,
        log: true,
    })
}

export default func

func.tags = ["All"]
