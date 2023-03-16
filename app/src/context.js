import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { BN } from "@project-serum/anchor";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

import {
    getRoom,
    getRoomInfo,
    getProgram,
    getPartner,
  } from "./program";

const AppContext = createContext();

export const useUser = () => {

    const context = useContext(AppContext);
    if (!context){
        throw new Error("Error");
    }
    return context;
}

export const AppProvider = ({ childeren }) => {
    const confirmTx = async (txHash, connection) => {
        const blockhashInfo = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          blockhash: blockhashInfo.blockhash,
          lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
          signature: txHash,
        });
      };

    const [roomAddress, setRoomAddress] = useState();
    const [roomInfoAddress, setRoomInfoAddress] = useState();
    const [roomInfo, setRoomInfo] = useState();
    const [error, setError ] = useState();
    const [roomInfoId, setRoomInfoId] = useState();
    const [initialized, setIntialized] = useState(false);


    const emptyWallet = () =>{ return {} };

    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const program = useMemo(() => {
        if(connection){
            return getProgram( connection, wallet ?? emptyWallet );
        }
    },[connection, wallet ]);

    
    useEffect(() => {
        updateState();
    }, [program]);


    const updateState = async () => {
        if (!program) return;
    
        try {
          if (!roomAddress) {
            const roomAddress = await getRoom();
            setRoomAddress(roomAddress);
          }
          const room = await program.account.roomAccount.fetch(
            roomAddress ?? (await getRoom())
          );
          setIntialized(true)
          setRoomInfoId(room.lastroomId);
          const roomInfoAddress = await getRoomInfo(room.lastroomId);
          setRoomInfoAddress(roomInfoAddress);
          const roomInfo = await program.account.roomInfo.fetch(roomInfoAddress);
          setRoomInfo(roomInfo);
          }
        catch(err){
            console.log(err.message);
        }};

        const initRoom = async () => {
            
            try {
              const txHash = await program.methods
                .initialize()
                .accounts({
                  roomAccount: roomAddress,
                  creator: wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                })
                .rpc();
              await confirmTx(txHash, connection);
        
              updateState();
            } catch (err) {
              console.log(err.message);
            }
          };



        const createRoom = async (collection_name, collection_floor) => { 
            try {
              const roomInfoAddress = await getRoomInfo(roomInfoId + 1);
              const txHash = await program.methods
                .createRoom(Buffer.from(collection_name),new BN(collection_floor))
                .accounts({
                  roomInfo: roomInfoAddress,
                  roomAccount: roomAddress,
                  creator: wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                })
                .rpc();
              await confirmTx(txHash, connection);
        
              updateState();
            } catch (err) {
                console.log(err.message);
            }
          };



        const buyNFT = async () => {
            try {
              const txHash = await program.methods
                .buyNft(roomInfoId)
                .accounts({
                  roomInfo: roomInfoAddress,
                  partner: await getPartner(
                    roomInfoAddress,
                    roomInfo.lastTicketId + 1
                  ),
                  buyer: wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                })
                .rpc();
              await confirmTx(txHash, connection);
              updateState();
            } catch (err) {
              setError(err.message);
            }
          };



        const sellNFT = async () => {
            try {
              const txHash = await program.methods
                .sellNft(roomInfoId)
                .accounts({
                  roomInfo: roomInfoAddress,
                  seller: wallet.publicKey,
                  systemProgram: SystemProgram.programId,
                })
                .rpc();
              await confirmTx(txHash, connection);
              updateState();
            } catch (err) {
              setError(err.message);
            }
          };
        
    

    return (

        <AppContext.Provider
            value={{

                ///initialized,
                connected: wallet?.publicKey ? true : false,
                ///initRoom,
                ///createRoom,
                ///buyNFT,
                ///sellNFT,

            }}
        >
            {childeren}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(AppContext);
  };