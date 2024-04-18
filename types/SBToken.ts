import { HexString } from '@/types/basic';

export type University = {
    uni_name: string;
    uni_address: string;
    uni_owner: HexString; // Ethereum address of the university
}