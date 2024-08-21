import { BlockchainTokens, BlockchainNftPoolConfig } from '../types'
import { ChainId } from '../chain-specific/'
import { Hex } from 'viem'

// Represents the index of the staking pool starting from 1
export enum PoolId {
  POOL1 = 1,
  POOL2 = 2,
  POOL3 = 3,
  POOL4 = 4,
  POOL5 = 5,
  POOL6 = 6,
  POOL7 = 7,
  // Add more pool IDs as necessary
}

export const poolNum = Object.keys(PoolId).length / 2

export const DEFAULT_ADMIN_ROLE: Hex  = "0x0000000000000000000000000000000000000000000000000000000000000000"


// Pool Configuration Object
export const POOL_CONFIG: BlockchainNftPoolConfig = {
  [ChainId.SHIBARIUM]: {
    [PoolId.POOL1]: {
      pid: 1,
      name: 'PixelPalz for FAT',
      contractType: 'thirdweb',
      address: '0x22F2fAb476BF5CcDf5bffb0517b12c4d306B2ee7',
      market1:
        'https://app.withmantra.com/market/collection/0x28054d6f7ea92c320de64a21c970f9206247fb98?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0x28054D6F7Ea92C320de64A21c970f9206247fb98',
      nftMaxSupply: 10000,
      nftSymbol: 'PPALZ',
      nftName: 'PixelPalz',
      nftUri: 'https://chewy.build/nft/pixelpalz/pixelpalz/',
      nftExt: '.png',
      rewardSymbol: 'FAT',
      rewardName: 'FAT Token',
      rewardLogo:
        'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0xA253fB19cEa0d3cDe270aB85D1ac9c309FbF8771',
      rewardPair: '0x1e8D0A96AcEe2900EC4c3690Cf91386f10471719',
      rewardDecimals: 18,
      rewardDecimalPlaces: 0,
      rewardPriceDecimalPlaces: 5,
      aboutTitle1: 'What is PixelPalz?',
      aboutContent1:
        'Support the Shibarium L2 blockchain and 8 on-chain projects by owning a part of an investment fund that is generated from the sale of these NFTs.',
      aboutTitle2: 'Stake your PixelPalz for FAT Rewards',
      aboutContent2: `Staking pool for PixelPalz with Fat Token rewards.`
    },
    [PoolId.POOL2]: {
      pid: 2,
      name: 'BlueChipShiba for FAT',
      contractType: 'thirdweb',
      address: '0xf189CCc4C204DCa9223601C9234A91C55E325850',
      market1:
        'https://app.withmantra.com/market/collection/0x194b2d893f2e4d4e63dcfa05413bb75fbea07adf?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0x194b2D893f2E4d4e63dcFa05413bB75FbEa07aDF',
      nftMaxSupply: 5000,
      nftSymbol: 'BCS',
      nftName: 'BlueChipShiba',
      nftUri: 'https://chewy.build/nft/pixelpalz/bluechipshiba/',
      nftExt: '.png',
      rewardSymbol: 'FAT',
      rewardName: 'FAT Token',
      rewardLogo:
        'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0xA253fB19cEa0d3cDe270aB85D1ac9c309FbF8771',
      rewardPair: '0x1e8D0A96AcEe2900EC4c3690Cf91386f10471719',
      rewardDecimals: 18,
      rewardDecimalPlaces: 0,
      rewardPriceDecimalPlaces: 5,
      aboutTitle1: 'What is BlueChipShiba?',
      aboutContent1:
        'A 5,000 piece commemorative NFT collection to celebrate PixelPalz, the first ETF NFT Collection on Shibarium that invests in on-chain $Tokens for the benefit of the projects and PixelPalz holders.',
      aboutTitle2: 'Stake your BlueChipShiba for FAT Rewards',
      aboutContent2: `Staking pool for BlueChipShiba with Fat Token rewards.`
    },
    [PoolId.POOL3]: {
      pid: 3,
      name: 'Fatboshi for FAT',
      contractType: 'thirdweb',
      address: '0xBEf289F4Ecf7546Ff4e2dedb87a705e9A41C463b',
      market1:
        'https://app.withmantra.com/market/collection/0xfd8c2594d8999b589f0bd54af0e2ad976c0c6907?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0xfD8c2594d8999b589f0bd54Af0e2Ad976C0C6907',
      nftMaxSupply: 4040,
      nftSymbol: 'Fatboshi',
      nftName: 'Fatboshi',
      nftUri: 'https://chewy.build/nft/pixelpalz/fatboshi/',
      nftExt: '.png',
      rewardSymbol: 'FAT',
      rewardName: 'FAT Token',
      rewardLogo: 'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0xA253fB19cEa0d3cDe270aB85D1ac9c309FbF8771',
      rewardPair: '0x1e8D0A96AcEe2900EC4c3690Cf91386f10471719',
      rewardDecimals: 18,
      rewardDecimalPlaces: 0,
      rewardPriceDecimalPlaces: 5,
      aboutTitle1: 'What is Fatboshi?',
      aboutContent1: `Fatboshi is an Ambassador for the Shibarium Chain, whereon Fatboshi exists as a DN404 token. On Shibarium, you will be able to stake your Fatboshi's and earn $FAT tokens in rewards.`,
      aboutTitle2: 'Stake your Fatboshi for FAT Rewards',
      aboutContent2: 'Staking pool for Fatboshi with FAT token rewards.',
    },
    [PoolId.POOL4]: {
      pid: 4,
      name: 'PixelPalz for Fatboshi (OLD)',
      imgFolder: '1',
      address: '0x89075A2Cd5cD0e435E3c5036a5d78Ed44d4CeDec',
      market1:
        'https://app.withmantra.com/market/collection/0x28054d6f7ea92c320de64a21c970f9206247fb98?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0x28054D6F7Ea92C320de64A21c970f9206247fb98',
      nftMaxSupply: 10000,
      nftSymbol: 'PPALZ',
      nftName: 'PixelPalz',
      nftUri: 'https://chewy.build/nft/pixelpalz/pixelpalz/',
      nftExt: '.png',
      rewardSymbol: 'Fatboshi',
      rewardName: 'Fatboshi',
      rewardLogo: 'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0x06d3625CF994808988a2800aDBb2cAAe69C0aA02',
      rewardPair: '0x21710b7FD86b5EE76377330eA65c31E18ABbac67',
      rewardDecimals: 18,
      rewardDecimalPlaces: 5,
      rewardPriceDecimalPlaces: 2,
      aboutTitle1: 'What is PixelPalz?',
      aboutContent1:
        'Support the Shibarium L2 blockchain and 8 on-chain projects by owning a part of an investment fund that is generated from the sale of these NFTs.',
      aboutTitle2: 'Old Pool, Unstake and restake in new pools!',
      aboutContent2: `Old Pool, Unstake and restake in new pools!`
    },
    [PoolId.POOL5]: {
      pid: 5,
      name: 'BlueChipShiba for Fatboshi (OLD)',
      imgFolder: '2',
      address: '0x38E5C5aBc1558839c7Ed3556D607b8B93fb3C332',
      market1:
        'https://app.withmantra.com/market/collection/0x194b2d893f2e4d4e63dcfa05413bb75fbea07adf?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0x194b2D893f2E4d4e63dcFa05413bB75FbEa07aDF',
      nftMaxSupply: 5000,
      nftSymbol: 'BCS',
      nftName: 'BlueChipShiba',
      nftUri: 'https://chewy.build/nft/pixelpalz/bluechipshiba/',
      nftExt: '.png',
      rewardSymbol: 'Fatboshi',
      rewardName: 'Fatboshi',
      rewardLogo: 'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0x06d3625CF994808988a2800aDBb2cAAe69C0aA02',
      rewardPair: '0x21710b7FD86b5EE76377330eA65c31E18ABbac67',
      rewardDecimals: 18,
      rewardDecimalPlaces: 5,
      rewardPriceDecimalPlaces: 2,
      aboutTitle1: 'What is BlueChipShiba?',
      aboutContent1:
        'A 5,000 piece commemorative NFT collection to celebrate PixelPalz, the first ETF NFT Collection on Shibarium that invests in on-chain $Tokens for the benefit of the projects and PixelPalz holders.',
      aboutTitle2: 'Old Pool, Unstake and restake in new pools!',
      aboutContent2: `Old Pool, Unstake and restake in new pools!`
    },
    [PoolId.POOL6]: {
      pid: 6,
      name: 'CollabXShib for Fatboshi (OLD)',
      imgFolder: '3',
      address: '0x37FC3364D04A82BC5E9167594215285E098a6c6b',
      market1: 'https://app.withmantra.com/market/collection/0x2eb43ca84244e35052d976e650334bd8b7ba68ab?chain_id=109&auctionType=fixed&sort=2&statuses=created',
      marketplaces: [
        {
          name: 'Mantra',
          url: 'http://app.withmantra.com/market/collection/0x3d789d7a5049982ea174362d718b999bf921dbe0?chain_id=109&auctionType=fixed&sort=2&statuses=created'
        },
        {
          name: 'ChewySwap',
          url: 'https://chewyswap.dog/swap/?chain=shibarium&outputCurrency=0x06d3625CF994808988a2800aDBb2cAAe69C0aA02'
        }
      ],
      nftAddress: '0x2Eb43CA84244E35052d976e650334BD8b7Ba68AB',
      nftMaxSupply: 10000,
      nftSymbol: 'CXS',
      nftName: 'CollabXShib',
      nftUri: 'https://chewy.build/nft/pixelpalz/collabxshib/',
      nftExt: '.png',
      rewardSymbol: 'Fatboshi',
      rewardName: 'Fatboshi',
      rewardLogo: 'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/fatboshi.png?raw=true',
      rewardAddress: '0x06d3625CF994808988a2800aDBb2cAAe69C0aA02',
      rewardPair: '0x21710b7FD86b5EE76377330eA65c31E18ABbac67',
      rewardDecimals: 18,
      rewardDecimalPlaces: 5,
      rewardPriceDecimalPlaces: 2,
      aboutTitle1: 'What is CollabXShib?',
      aboutContent1:
        `A limited time 'FREE-To-Mint' 10,000 piece commemorative NFT collection to celebrate the historic moment when the SHIBARIUM network was integrated into Collab.Land. This provides new technological and economic opportunities for every community. Projects on SHIBARIUM can now build and manage pro-social communities with Collab.Land's expansive tools. 9,995 pieces are the same but 5 are Ultra-Rare and will be revealed after the mint.`,
      aboutTitle2: 'Old Pool, Unstake and restake in new pools!',
      aboutContent2: `Old Pool, Unstake and restake in new pools!`
    },
  }
  // Repeat for other ChainId values as necessary
}
