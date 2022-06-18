import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, getChainId } = hre
    const { deploy, execute } = deployments
    const { deployer } = await getNamedAccounts()

    await deploy("Multicall2", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    })
}

export default func
func.tags = ["Multicall2"]
