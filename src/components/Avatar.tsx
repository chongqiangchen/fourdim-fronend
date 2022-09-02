import Jazzicon from "react-jazzicon";
import { DEFAULT_ADDRESS } from "src/constants/common";
import { useAccount } from "wagmi";

interface AvatarProps {
    address?: string;
    diameter?: number;
}

const Avatar = (props: AvatarProps) => {
    const { address, diameter = 40 } = props;
    const { address: accountAddress } = useAccount();

    const newAddress = address || accountAddress || DEFAULT_ADDRESS;
    const seed = parseInt(newAddress.slice(2, 10), 16);

    return (
        <Jazzicon diameter={diameter} seed={seed} />
    )
}

export default Avatar;