import { BigNumber, Contract } from 'ethers';
import { multicallv2 } from 'fourdim-web3-hooks';
import { truncation } from "@/utils/truncation";
import { NFT_BNX_INFO } from "@/constants/abi";

const ADDRESS = {
  WarriorAddress: '0x22F3E436dF132791140571FC985Eb17Ab1846494',
  RobberAddress: '0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3',
  MageAddress: '0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44',
  RangerAddress: '0xF31913a9C8EFE7cE7F08A1c08757C166b572a937',
};

const ROLE_NAME = {
  Warrior: '战士',
  Rogue: '盗贼',
  Mage: '法师',
  Ranger: '游侠',
  Katrina: '卡特莉娜',
  Druid: '德鲁伊',
  Knight: '骑士',
  Cleric: '牧师',
};

const getRole = (address: string) => {
  const item = address.toLowerCase();
  if (item === ADDRESS.WarriorAddress.toLowerCase()) {
    return ROLE_NAME.Warrior;
  }

  if (item === ADDRESS.RobberAddress.toLowerCase()) {
    return ROLE_NAME.Rogue;
  }

  if (item === ADDRESS.MageAddress.toLowerCase()) {
    return ROLE_NAME.Mage;
  }

  if (item === ADDRESS.RangerAddress.toLowerCase()) {
    return ROLE_NAME.Ranger;
  }
  // if (item === ADDRESS.KatrinaAddress.toLowerCase()) {
  //     return ROLE_NAME.Katrina;
  // }
  // if (item === ADDRESS.hero6Address.toLowerCase()) {
  //     return ROLE_NAME.Druid;
  // }
  // if (item === ADDRESS.hero8Address.toLowerCase()) {
  //     return ROLE_NAME.Knight;
  // }
  // if (item === ADDRESS.hero7Address.toLowerCase()) {
  //     return ROLE_NAME.Cleric;
  // }
};

const getProp = (item: BigNumber[]) => {
  return {
    Power: Number(item[0]).toFixed(0),
    Agile: Number(item[1]).toFixed(0),
    Constitution: Number(item[2]).toFixed(0),
    Willpower: Number(item[3]).toFixed(0),
    Intelligence: Number(item[4]).toFixed(0),
    charm: Number(item[5]).toFixed(0),
  };
};

const getMainProp = (props: any, role: any) => {
  let result = 0;
  switch (role) {
    case ROLE_NAME.Rogue:
      result = Math.floor(props.Agile);
      break;
    case ROLE_NAME.Katrina:
    case ROLE_NAME.Warrior:
      result = Math.floor(props.Power);
      break;
    case ROLE_NAME.Mage:
      result = Math.floor(props.Intelligence);
      break;
    case ROLE_NAME.Ranger:
      result = Math.floor(props.Power);
      break;
    case ROLE_NAME.Druid:
      result = Math.floor(props.Intelligence);
      break;
    case ROLE_NAME.Cleric:
      result = Math.floor(props.Intelligence);
      break;
    case ROLE_NAME.Knight:
      result = Math.floor(props.Constitution);
      break;
    default:
      break;
  }
  return result;
};

const getAllProps = (props: any) => {
  let result = 0;
  Object.keys(props).forEach((key) => {
    result += Number(props[key]);
  });
  return result;
};

function getTokenRole(info: any) {
  const formatInfo = [...info.cardInfo, info.tokenId, info.careerAddr];

  const tokenId = String(formatInfo[7]);
  const role = getRole(formatInfo[8]);
  const prop = getProp(formatInfo);

  return {
    tokenId: tokenId,
    role,
    // isCrystal: isCrystal(info.careerAddr),
    level: Number(formatInfo[6]),
    prop,
    allProp: getAllProps(prop),
    mainProp: getMainProp(prop, role),
    careerAddr: info.careerAddr,
  };
}

const getBnxNftInfos = async (tokenIds: string[], contract: Contract) => {
  const calls = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calls.push({
      address: '0x726D42b7f211d75D2b53D568C52B3F794a786E83',
      name: 'getPlayerInfoBySet',
      params: [tokenIds[i]],
    });
  }

  const infosResult = await multicallv2(NFT_BNX_INFO, calls, contract.signer);
  const infos = infosResult.map((info: any, index: number) => ({
    tokenId: tokenIds[index],
    cardInfo: info[0],
    careerAddr: contract.address,
  }));
  return infos.map((info: any) => getTokenRole(info));
};

export default {
  nftAddresses: [
    '0x22F3E436dF132791140571FC985Eb17Ab1846494',
    '0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3',
    '0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44',
    '0xF31913a9C8EFE7cE7F08A1c08757C166b572a937',
  ],
  getTokenInfosFns: [
    getBnxNftInfos,
    getBnxNftInfos,
    getBnxNftInfos,
    getBnxNftInfos,
  ],
  networkId: 56,
  tableColumns: [
    {
      id: 'tokenId',
      label: 'Token ID',
      render: (value: any) => truncation(value),
      minWidth: 100,
    },
    {
      id: 'role',
      label: '职业',
      minWidth: 70,
    },
    {
      id: 'level',
      label: '等级',
      minWidth: 70,
    },
    {
      id: 'allProp',
      label: '总属性',
      minWidth: 100,
    },
    {
      id: 'mainProp',
      label: '主属性',
      minWidth: 100,
    },
    {
      id: 'prop',
      label: '属性',
      render: (value: any) => (
          <div>
            <span>力量：{value.Power} |</span>
            <span>敏捷：{value.Agile} |</span>
            <span>体质：{value.Constitution} |</span>
            <span>意志：{value.Willpower} |</span>
            <span>智力：{value.Intelligence} |</span>
            <span>精神：{value.charm}</span>
          </div>
        ),
      minWidth: 500,
    }
  ],
};