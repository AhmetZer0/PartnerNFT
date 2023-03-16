import { AnchorProvider, BN, Program , utils} from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import IDL from "./idl.json";
const utf8 = utils.bytes.utf8;

const PROGRAM_ID = new PublicKey("3p4ky79o4j6BBbmWAezZUCCm1tnsvTakZDgwyVvMPtoU");
// How to fetch our Program
export const getProgram = (connection, wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

export const getRoom = async () => {
  return (
    await PublicKey.findProgramAddress([utils.bytes.utf8.encode("room")], PROGRAM_ID)
  )[0];
};

export const getRoomInfo = async (id) => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("room_info"), new BN(id).toArrayLike(Buffer, "le", 4)],
      PROGRAM_ID
    )
  )[0];
};

export const getPartner = async (room_id, id) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("nft_seed"),
        room_id.toBuffer(),
        new BN(id).toArrayLike(Buffer, "le", 4),
      ],
      PROGRAM_ID
    )
  )[0];
};
