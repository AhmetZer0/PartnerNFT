use anchor_lang::{
    prelude::*,
    solana_program::{program::invoke, system_instruction::transfer},
};
use std::ops::Mul;

declare_id!("EaWjKSxRQLL5EvzD1BXDDdcvM9rPRFnEJQxiZetnJkRo");

#[error_code]
pub enum RoomErrors {
    #[msg("This room is full !")]
    FullRoom,
    #[msg("Room is not full !")]
    RoomIsNotFull,
    #[msg("You are not in this room!")]
    NotInRoom,
}

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(_ctx: Context<InitializeRoom>) -> Result<()> {
        Ok(())
    }

    pub fn create_room(
        ctx: Context<CreateRoom>,
        collection_name: String,
        collection_floor: u64,
    ) -> Result<()> {
        let room_account = &mut ctx.accounts.room_account;
        let room_info = &mut ctx.accounts.room_info;

        room_account.lastroom_id += 1;

        room_info.id = room_account.lastroom_id;
        room_info.authority = ctx.accounts.creator.key();
        room_info.collection_name = collection_name;
        room_info.collection_floor = collection_floor;

        Ok(())
    }

    pub fn buy_nft(ctx: Context<BuyNFT>, room_id: u32) -> Result<()> {
        let room_info = &mut ctx.accounts.room_info;
        let partner = &mut ctx.accounts.partner;
        let buyer = &ctx.accounts.buyer;

        if room_info.count == 2 {
            return err!(RoomErrors::FullRoom);
        }

        invoke(
            &transfer(
                &buyer.key(),
                &room_info.key(),
                room_info.collection_floor * 10u64.pow(9) / 2,
            ),
            &[
                buyer.to_account_info(),
                room_info.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        room_info.last_room_id += 1;

        partner.id = room_info.last_room_id;
        partner.room_info_id = room_id;
        partner.buyer = buyer.key();
        room_info.count += 1;
        room_info.balance += room_info.collection_floor / 2;
        room_info.partners.push(buyer.key());

        Ok(())
    }
    pub fn sell_nft(ctx: Context<SellNFT>, _room_id: u32) -> Result<()> {
        let room_info = &mut ctx.accounts.room_info;
        let seller = &ctx.accounts.seller;

        if room_info.count == 0 || room_info.count == 1 {
            return err!(RoomErrors::RoomIsNotFull);
        }
        if !room_info.partners.contains(&seller.key()){
            return err!(RoomErrors::NotInRoom);
        }

        for partner in &room_info.partners {
            **room_info.to_account_info().try_borrow_mut_lamports()? -=
                room_info.balance * 10u64.pow(9) / 2;
            **seller.to_account_info().try_borrow_mut_lamports()? +=
                room_info.balance * 10u64.pow(9) / 2;
        }

        room_info.balance -= room_info.collection_floor / 2;
        room_info.count -= 1;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitializeRoom<'info> {
    #[account(
        init,
        payer=creator,
        space=8 + 4,
        seeds=["room".as_bytes()],
        bump,
    )]
    room_account: Account<'info, RoomAccount>,

    #[account(mut)]
    creator: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateRoom<'info> {
    #[account(
        init,
        payer=creator,
        space= 8 + 4 + 32 + 204 + 8 + 4 + 4 + 4 + 32 * 2 +  8,
        seeds = ["room_info".as_bytes(),&(room_account.lastroom_id + 1).to_le_bytes()],
        bump,
    )]
    room_info: Account<'info, RoomInfo>,
    #[account(
        mut,
        seeds = ["room".as_bytes()],
        bump
    )]
    room_account: Account<'info, RoomAccount>,

    #[account(mut)]
    creator: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(room_id:u32)]
pub struct BuyNFT<'info> {
    #[account(
        mut,
        seeds = ["room_info".as_bytes(),&room_id.to_le_bytes()],
        bump
    )]
    room_info: Account<'info, RoomInfo>,

    #[account(
        init,
        payer=buyer,
        space= 8 + 4 + 4 + 32,
        seeds=["nft_seed".as_bytes(),room_info.key().as_ref(),&(room_info.last_room_id + 1).to_le_bytes()],
        bump,
    )]
    partner: Account<'info, Partner>,
    #[account(mut)]
    buyer: Signer<'info>,
    system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(room_id:u32)]
pub struct SellNFT<'info> {
    #[account(
        mut,
        seeds = ["room_info".as_bytes(),&room_id.to_le_bytes()],
        bump
    )]
    room_info: Account<'info, RoomInfo>,

    #[account(mut)]
    seller: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct RoomAccount {
    lastroom_id: u32,
}

#[account]
pub struct RoomInfo {
    pub id: u32,
    pub authority: Pubkey,
    pub collection_name: String,
    pub collection_floor: u64,
    pub last_room_id: u32,
    pub balance: u64,
    pub count: u32,
    pub partners: Vec<Pubkey>,
}

#[account]
pub struct Partner {
    pub id: u32,
    pub room_info_id: u32,
    pub buyer: Pubkey,
}