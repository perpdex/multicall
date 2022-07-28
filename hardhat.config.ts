import "@nomiclabs/hardhat-ethers"
import { config as dotenvConfig } from "dotenv"
import "hardhat-deploy"
import "@matterlabs/hardhat-zksync-solc"
import { HardhatUserConfig } from "hardhat/config"
import { resolve } from "path"

dotenvConfig({ path: resolve(__dirname, "./.env") })

const config: HardhatUserConfig = {
    paths: {
        sources: "./src"
    },
    solidity: {
        version: "0.8.12",
        settings: {
            optimizer: { enabled: true, runs: 200 },
        },
    },
    zksolc: {
        version: "0.1.0",
        compilerSource: "docker",
        settings: {
            optimizer: {
                enabled: true,
            },
            experimental: {
                dockerImage: "matterlabs/zksolc",
            },
        },
    },
    namedAccounts: {
        deployer: 0,
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
            initialBaseFeePerGas: 0, // https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
        },
    },
}

if (config.networks && process.env.TESTNET_PRIVATE_KEY) {
    if (process.env.INFURA_PROJECT_ID) {
        config.networks.rinkeby = {
            url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
            accounts: [process.env.TESTNET_PRIVATE_KEY],
            gasMultiplier: 2,
        }
    }

    config.networks.mumbai = {
        url: "https://rpc-mumbai.maticvigil.com",
        accounts: [process.env.TESTNET_PRIVATE_KEY],
        gasMultiplier: 2,
    }

    config.networks.fuji = {
        url: "https://api.avax-test.network/ext/bc/C/rpc",
        accounts: [process.env.TESTNET_PRIVATE_KEY],
        gasMultiplier: 2,
    }

    config.networks.shibuya = {
        url: "https://evm.shibuya.astar.network",
        chainId: 81,
        accounts: [process.env.TESTNET_PRIVATE_KEY],
        gasMultiplier: 2,
        verify: {
            etherscan: {
                apiUrl: "https://blockscout.com/shibuya",
            },
        },
    }

    config.networks.zksync2_testnet = {
        url: "https://zksync2-testnet.zksync.dev",
        chainId: 280,
        accounts: [process.env.TESTNET_PRIVATE_KEY],
        gasMultiplier: 2,
        verify: {
            etherscan: {
                apiUrl: "https://zksync2-testnet.zkscan.io/",
            },
        },
        zksync: true,
    }

    config.networks.arbitrum_rinkeby = {
        url: "https://rinkeby.arbitrum.io/rpc",
        accounts: [process.env.TESTNET_PRIVATE_KEY],
    }
}

export default config
